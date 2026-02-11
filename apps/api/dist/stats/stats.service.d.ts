import { PrismaService } from '../prisma/prisma.service';
export declare class StatsService {
    private prisma;
    constructor(prisma: PrismaService);
    getAdminDashboardStats(): Promise<{
        totalSales: number;
        activeUsers: number;
        totalInventory: number;
        pendingOrders: number;
    }>;
}
