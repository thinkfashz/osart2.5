import MercadoPagoConfig, { Payment, Preference } from 'mercadopago';

let mercadopago: MercadoPagoConfig | null = null;

export function initializeMercadoPago(accessToken?: string) {
    const token = accessToken || process.env.MERCADOPAGO_ACCESS_TOKEN;

    if (!token) {
        console.warn('MercadoPago access token not configured');
        return null;
    }

    try {
        mercadopago = new MercadoPagoConfig({
            accessToken: token,
            options: {
                timeout: 5000,
            }
        });
        return mercadopago;
    } catch (error) {
        console.error('Error initializing MercadoPago:', error);
        return null;
    }
}

export function getMercadoPago() {
    if (!mercadopago) {
        mercadopago = initializeMercadoPago();
    }
    return mercadopago;
}

export const payment = mercadopago ? new Payment(mercadopago) : null;
export const preference = mercadopago ? new Preference(mercadopago) : null;
