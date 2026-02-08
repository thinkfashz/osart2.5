import Stripe from 'stripe';

let stripeClient: Stripe | null = null;

export function getStripeClient() {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
        return null;
    }

    if (!stripeClient) {
        stripeClient = new Stripe(secretKey, {
            apiVersion: '2026-01-28.clover',
            typescript: true,
        });
    }

    return stripeClient;
}
