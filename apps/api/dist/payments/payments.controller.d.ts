import { PaymentsService } from './payments.service';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    createIntent(amount: number, orderId: string, req: any): Promise<{
        clientSecret: string | null;
        id: string;
    }>;
}
