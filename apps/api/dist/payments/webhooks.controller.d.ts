import { PaymentsService } from './payments.service';
import { OrdersService } from '../orders/orders.service';
import type { FastifyRequest } from 'fastify';
export declare class StripeWebhooksController {
    private readonly paymentsService;
    private readonly ordersService;
    constructor(paymentsService: PaymentsService, ordersService: OrdersService);
    handleWebhook(sig: string, req: FastifyRequest): Promise<{
        received: boolean;
    }>;
}
