/**
 * Secure Stripe Architecture — Frontend Service Layer
 * 
 * This module is the ONLY interface between the booking form
 * and the payment backend. It never receives or sends prices.
 */

const API_BASE = import.meta.env.VITE_API_BASE || '';

/**
 * Initiates a secure Stripe Checkout session.
 * 
 * The server will:
 * 1. Recalculate the price server-side
 * 2. Create a Stripe session
 * 3. Return the redirect URL
 * 
 * The frontend price is NEVER sent — the server is the single
 * source of truth for all financial calculations.
 * 
 * @param {Object} bookingData - Raw booking form data (no price fields)
 * @returns {Promise<{url: string, booking_id: string}>}
 */
export async function initiateCheckout(bookingData) {
    const response = await fetch(`${API_BASE}/api/create-checkout-session`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            bookingData: {
                // Send ONLY the data the server needs to recalculate
                mainService: bookingData.mainService,
                subService: bookingData.subService,
                sqft: bookingData.sqft,
                beds: bookingData.beds,
                baths: bookingData.baths,
                frequency: bookingData.frequency,
                levels: bookingData.levels,
                selectedAddons: bookingData.strAddons || bookingData.extras || [],
                distance: bookingData.distance,
                address: bookingData.address,
                name: bookingData.name,
                email: bookingData.email,
                phone: bookingData.phone,
                date: bookingData.date,
                time: bookingData.time
                // NOTE: No price, no deposit, no total.
                // The server calculates everything.
            }
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Could not initiate payment. Please try again.');
    }

    return response.json(); // { url, booking_id }
}
