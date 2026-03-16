/**
 * Stripe Webhook Handler
 * POST /api/stripe-webhook
 *
 * Security model:
 * - Signature verification via Stripe SDK (rejects any tampered payload)
 * - Secure HMAC hash verification (rejects price manipulations)
 * - Booking only confirmed by this endpoint — NEVER by frontend
 */

import Stripe from 'stripe';
import crypto from 'crypto';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// ─── Secure Hash Verifier ──────────────────────────────────────────────────────
function verifySecureHash(bookingId, depositAmount, receivedHash) {
    const expectedHash = crypto
        .createHmac('sha256', endpointSecret)
        .update(`${bookingId}:${depositAmount}`)
        .digest('hex');
    return crypto.timingSafeEqual(
        Buffer.from(expectedHash, 'hex'),
        Buffer.from(receivedHash, 'hex')
    );
}

// ─── Email Confirmation (via FormSubmit or your email provider) ────────────────
async function sendConfirmationEmail(sessionData) {
    const { client_name, client_email, service_type, service_date, booking_id, deposit_amount, final_price } = sessionData;

    try {
        await fetch('https://formsubmit.co/ajax/contact@cleanshinepro.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                _subject: `✅ DEPOSIT CONFIRMED — ${client_name} | ${booking_id}`,
                _cc: client_email,
                client_name,
                booking_id,
                service_type,
                service_date,
                deposit_paid: `$${deposit_amount}`,
                remaining_balance: `$${final_price - deposit_amount}`,
                message: `Deposit of $${deposit_amount} has been confirmed via Stripe. Remaining balance: $${final_price - deposit_amount} due after service.`,
                _template: 'table'
            })
        });
    } catch (err) {
        console.error('[EMAIL_ERROR]', err.message);
        // Don't throw — email failure should not block booking confirmation
    }
}

// ─── Webhook Handler ──────────────────────────────────────────────────────────
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const sig = req.headers['stripe-signature'];

    if (!sig || !endpointSecret) {
        console.error('[WEBHOOK] Missing signature or endpoint secret');
        return res.status(400).json({ error: 'Webhook configuration error' });
    }

    let event;
    try {
        // Raw body required for signature verification
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error(`[WEBHOOK_SIG_FAIL] ${err.message}`);
        return res.status(400).json({ error: `Webhook signature verification failed` });
    }

    // Log all events for audit trail
    console.log(JSON.stringify({
        event: event.type,
        id: event.id,
        timestamp: new Date().toISOString()
    }));

    // ─── Handle checkout.session.completed ──────────────────────────────────
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const metadata = session.metadata;

        const bookingId = metadata?.booking_id;
        const depositAmount = parseInt(metadata?.deposit_amount);
        const finalPrice = parseInt(metadata?.final_price);
        const receivedHash = metadata?.secure_hash;

        // 1. Verify booking ID and hash exist
        if (!bookingId || !depositAmount || !receivedHash) {
            console.error('[WEBHOOK] Missing required metadata', { bookingId, depositAmount });
            return res.status(400).json({ error: 'Invalid session metadata' });
        }

        // 2. SECURITY: Verify secure hash to prevent price manipulation
        let hashValid;
        try {
            hashValid = verifySecureHash(bookingId, depositAmount, receivedHash);
        } catch (err) {
            hashValid = false;
        }

        if (!hashValid) {
            console.error('[SECURITY_ALERT] Hash mismatch detected!', {
                bookingId,
                depositAmount,
                ip: req.headers['x-forwarded-for'],
                timestamp: new Date().toISOString()
            });
            // Return 200 to Stripe (so it stops retrying), but log the fraud attempt
            return res.status(200).json({ received: true, warning: 'Security hash mismatch — booking flagged' });
        }

        // 3. Confirm payment intent ID for records
        const paymentIntentId = session.payment_intent;

        console.log(JSON.stringify({
            event: 'booking_confirmed',
            booking_id: bookingId,
            payment_intent: paymentIntentId,
            client: metadata.client_name,
            email: metadata.client_email,
            deposit: depositAmount,
            final_price: finalPrice,
            timestamp: new Date().toISOString()
        }));

        // 4. Store customer ID in Stripe for future balance charge
        if (session.customer) {
            try {
                await stripe.customers.update(session.customer, {
                    metadata: { booking_id: bookingId }
                });
            } catch (err) {
                console.error('[STRIPE_CUSTOMER_UPDATE]', err.message);
            }
        }

        // 5. Send confirmation emails (client + admin)
        await sendConfirmationEmail({
            client_name: metadata.client_name,
            client_email: metadata.client_email,
            service_type: metadata.service_type,
            service_date: metadata.service_date,
            booking_id: bookingId,
            deposit_amount: depositAmount,
            final_price: finalPrice
        });

        // NOTE: When you add Supabase, update booking here:
        // await supabase.from('bookings').update({
        //   status: 'deposit_paid',
        //   stripe_payment_intent_id: paymentIntentId,
        //   stripe_customer_id: session.customer,
        //   confirmed_at: new Date().toISOString()
        // }).eq('booking_id', bookingId);
    }

    // Always return 200 to acknowledge receipt
    res.status(200).json({ received: true });
}

// ─── Required: Disable body parsing for raw body access ───────────────────────
export const config = {
    api: {
        bodyParser: false
    }
};
