import { PaymentsService } from '../payments/payments.service';
import { OrdersService } from '../orders/orders.service';
import type { FastifyRequest } from 'fastify';
export declare class WebhooksController {
    private readonly paymentsService;
    private readonly ordersService;
    constructor(paymentsService: PaymentsService, ordersService: OrdersService);
    handleStripeWebhook(signature: string, request: FastifyRequest): Promise<{
        received: boolean;
    }>;
}
