import Stripe from 'stripe';
export declare class PaymentsService {
    private stripe;
    constructor();
    createPaymentIntent(amount: number, orderId: string, email: string): Promise<{
        clientSecret: string | null;
        id: string;
    }>;
    constructEvent(payload: Buffer, signature: string, secret: string): Promise<Stripe.Event>;
}
