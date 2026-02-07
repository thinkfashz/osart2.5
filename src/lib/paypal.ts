import paypal from '@paypal/checkout-server-sdk';

let paypalClient: any = null;

export function initializePayPal(clientId?: string, clientSecret?: string) {
    const id = clientId || process.env.PAYPAL_CLIENT_ID;
    const secret = clientSecret || process.env.PAYPAL_CLIENT_SECRET;

    if (!id || !secret) {
        console.warn('PayPal credentials not configured');
        return null;
    }

    try {
        // Usar sandbox para desarrollo, live para producción
        const environment = process.env.NODE_ENV === 'production'
            ? new paypal.core.LiveEnvironment(id, secret)
            : new paypal.core.SandboxEnvironment(id, secret);

        paypalClient = new paypal.core.PayPalHttpClient(environment);
        return paypalClient;
    } catch (error) {
        console.error('Error initializing PayPal:', error);
        return null;
    }
}

export function getPayPalClient() {
    if (!paypalClient) {
        paypalClient = initializePayPal();
    }
    return paypalClient;
}

export { paypal };
