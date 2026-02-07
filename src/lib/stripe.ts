import Stripe from 'stripe';

function getStripeClient(): Stripe | null {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
        console.warn('STRIPE_SECRET_KEY no está configurado en las variables de entorno');
        return null;
    }
    return new Stripe(key, {
        typescript: true,
    });
}

export const stripe = getStripeClient();
