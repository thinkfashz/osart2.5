import { StatsService } from './stats.service';
export declare class StatsController {
    private readonly statsService;
    constructor(statsService: StatsService);
    getAdminStats(): Promise<{
        totalSales: number;
        activeUsers: number;
        totalInventory: number;
        pendingOrders: number;
    }>;
}
