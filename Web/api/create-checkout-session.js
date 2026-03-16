/**
 * Secure Stripe Checkout Session Creator
 * POST /api/create-checkout-session
 *
 * Architecture:
 * - Frontend sends booking_data (NOT price)
 * - Server recalculates price using the same STR/Residential logic
 * - Creates Stripe session with server-calculated price
 * - Stores snapshot in Stripe metadata with secure hash
 * - Frontend NEVER controls the price
 */

import Stripe from 'stripe';
import crypto from 'crypto';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const DOMAIN = process.env.DOMAIN || 'https://cleanshinepro.com';
const RATE_LIMIT_MAP = new Map(); // In-memory rate limiter (per Vercel instance)

// ─── Rate Limiter ──────────────────────────────────────────────────────────────
function checkRateLimit(ip) {
    const now = Date.now();
    const windowMs = 60 * 60 * 1000; // 1 hour
    const MAX_ATTEMPTS = 5;

    const record = RATE_LIMIT_MAP.get(ip) || { count: 0, resetAt: now + windowMs };

    if (now > record.resetAt) {
        record.count = 0;
        record.resetAt = now + windowMs;
    }

    record.count++;
    RATE_LIMIT_MAP.set(ip, record);

    return record.count <= MAX_ATTEMPTS;
}

// ─── Server-Side Price Engine ──────────────────────────────────────────────────
// CRITICAL: This mirrors the client engine but runs server-side.
// The client price is NEVER trusted.
function calculateServerPrice(bookingData) {
    const {
        mainService,
        subService,
        sqft,
        beds,
        baths,
        frequency,
        levels = 1,
        selectedAddons = [],
        distance = 0,
        address
    } = bookingData;

    const sqftNum = parseInt(sqft) || 0;
    const bedCount = parseInt(beds) || 0;
    const bathCount = parseFloat(baths) || 0;
    const isRecurring = frequency !== 'one-time';
    const BASE_WAGE = 19;
    const REAL_HOURLY_COST = BASE_WAGE * 1.12;
    const OVERHEAD_RATE = 0.15;

    let laborHours, materialsPercent, margin, fixedFees = 0;

    if (mainService === 'residential') {
        const addOnLaborMap = {
            oven: 0.6, fridge: 0.5, cabinets: 0.8,
            blinds: 1.2, windows: 1.5, pet_light: 0.3,
            pet_heavy: 0.8, laundry: 0.7, organizing: 0.5, sofa: 0.8
        };
        let prod = subService === 'deep' ? 140 : subService === 'move_out' ? 145 : isRecurring ? 220 : 190;
        const addonHours = selectedAddons.reduce((s, id) => s + (addOnLaborMap[id] || 0), 0);
        const baseH = sqftNum / prod;
        let totalH = baseH + (bedCount * 0.10) + (bathCount * 0.30) + addonHours;
        if (subService === 'finished') totalH *= 1.05;
        laborHours = totalH;
        materialsPercent = 0.08;
        margin = isRecurring ? 0.28 : 0.25;
    } else if (mainService === 'commercial') {
        const prod = subService === 'medical' ? 250 : subService === 'retail' ? 300 : subService === 'construction' ? 120 : 350;
        const mats = subService === 'medical' ? 0.12 : subService === 'retail' ? 0.08 : subService === 'construction' ? 0.15 : 0.07;
        laborHours = sqftNum / prod;
        materialsPercent = mats;
        margin = isRecurring ? 0.30 : 0.25;
    } else if (mainService === 'short_term') {
        // STR Engine
        const crewSize = 2;
        const base_hours = sqftNum / (crewSize * 300);
        const laundry_eff = 0.40 * 0.6;
        const level_adjustment = levels > 1 ? 0.25 * (levels - 1) : 0;
        const ADDON_HOURS = {
            str_fridge: 0.50, str_oven: 0.60, str_pet: 0.80,
            str_windows: 0.70, str_patio: 0.40, str_cabinets: 0.80
        };
        const addon_hours = selectedAddons.reduce((s, id) => s + (ADDON_HOURS[id] || 0), 0);
        const duration = base_hours + laundry_eff + level_adjustment + 0.30 + 0.20 + addon_hours;
        laborHours = duration * crewSize;
        materialsPercent = 0.10;
        margin = isRecurring ? 0.30 : 0.22;
        fixedFees = 12;
    } else {
        throw new Error('Invalid service type');
    }

    // Transport
    const dist = parseFloat(distance) || 0;
    const transportFee = address ? (dist <= 10 ? 0 : dist <= 20 ? 25 : 40) : 0;

    // Cost model
    const laborCost = laborHours * REAL_HOURLY_COST;
    const materials = laborCost * materialsPercent;
    const overhead = laborCost * OVERHEAD_RATE;
    const operatingCost = laborCost + materials + overhead + fixedFees;
    const finalPrice = operatingCost / (1 - margin) + transportFee;

    return {
        final_price: Math.ceil(finalPrice),
        deposit_amount: Math.ceil(finalPrice * 0.35)
    };
}

// ─── Secure Hash ───────────────────────────────────────────────────────────────
function createSecureHash(bookingId, depositAmount) {
    return crypto
        .createHmac('sha256', process.env.STRIPE_WEBHOOK_SECRET)
        .update(`${bookingId}:${depositAmount}`)
        .digest('hex');
}

// ─── Handler ───────────────────────────────────────────────────────────────────
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // 1. Rate limiting
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;
    if (!checkRateLimit(ip)) {
        console.warn(`[RATE_LIMIT] IP: ${ip} blocked`);
        return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }

    // 2. Log request for fraud tracking
    console.log(JSON.stringify({
        event: 'checkout_session_requested',
        ip,
        userAgent: req.headers['user-agent'],
        timestamp: new Date().toISOString()
    }));

    try {
        const { bookingData } = req.body;

        if (!bookingData || !bookingData.mainService || !bookingData.email) {
            return res.status(400).json({ error: 'Invalid booking data' });
        }

        // 3. Recalculate price server-side — frontend price is IGNORED
        const { final_price, deposit_amount } = calculateServerPrice(bookingData);

        if (deposit_amount < 1) {
            return res.status(400).json({ error: 'Invalid deposit amount' });
        }

        // 4. Generate booking ID and secure hash
        const bookingId = `CSP-${Date.now().toString().slice(-8)}`;
        const secureHash = createSecureHash(bookingId, deposit_amount);

        // 5. Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            customer_email: bookingData.email,
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: `CleanShine Pro — ${bookingData.mainService === 'short_term' ? 'Airbnb Turnover' : 'Cleaning Service'} Deposit`,
                        description: `Service Date: ${bookingData.date} | Deposit: 35% of $${final_price} total`
                    },
                    unit_amount: deposit_amount * 100 // Stripe uses cents
                },
                quantity: 1
            }],
            payment_intent_data: {
                setup_future_usage: 'off_session', // Save card for final balance charge
                metadata: {
                    booking_id: bookingId,
                    final_price: String(final_price),
                    deposit_amount: String(deposit_amount)
                }
            },
            success_url: `${DOMAIN}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${DOMAIN}/book`,
            metadata: {
                booking_id: bookingId,
                secure_hash: secureHash,
                client_name: bookingData.name,
                client_email: bookingData.email,
                client_phone: bookingData.phone || '',
                service_type: bookingData.mainService,
                sub_service: bookingData.subService,
                service_date: bookingData.date,
                service_time: bookingData.time,
                address: bookingData.address,
                final_price: String(final_price),
                deposit_amount: String(deposit_amount),
                is_recurring: bookingData.frequency !== 'one-time' ? 'true' : 'false'
            }
        });

        // 6. Return ONLY the session URL, never the price calculation
        res.status(200).json({
            url: session.url,
            booking_id: bookingId
        });

    } catch (error) {
        console.error('[CHECKOUT_ERROR]', error.message);
        res.status(500).json({ error: 'Could not create checkout session. Please try again.' });
    }
}
