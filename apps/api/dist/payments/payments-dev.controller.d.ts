import { OrdersService } from '../orders/orders.service';
export declare class PaymentsDevController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    simulateSuccess(orderId: string): Promise<{
        success: boolean;
        message: string;
        timestamp: string;
    }>;
}
