import { PrismaService } from '../prisma/prisma.service';
export declare class ProfilesService {
    private prisma;
    constructor(prisma: PrismaService);
    findOne(id: string): Promise<{
        orders: {
            id: string;
            createdAt: Date;
            userId: string | null;
            total: number;
            status: string;
            items: string;
            trackingNumber: string | null;
            shippingDate: Date | null;
            deliveryDate: Date | null;
            orderNumber: string;
            paymentStatus: string;
            paymentMethod: string;
            subtotal: number;
            shippingCost: number;
            shippingAddress: string | null;
            updatedAt: Date;
            paymentConfirmedAt: Date | null;
            cancelledAt: Date | null;
            paymentIntentId: string | null;
        }[];
    } & {
        id: string;
        email: string | null;
        fullName: string | null;
        role: string;
        knowledgePoints: number;
        avatarUrl: string | null;
        createdAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        email: string | null;
        fullName: string | null;
        role: string;
        knowledgePoints: number;
        avatarUrl: string | null;
        createdAt: Date;
    }[]>;
    update(id: string, data: {
        fullName?: string;
        avatarUrl?: string;
    }): Promise<{
        id: string;
        email: string | null;
        fullName: string | null;
        role: string;
        knowledgePoints: number;
        avatarUrl: string | null;
        createdAt: Date;
    }>;
    getStats(id: string): Promise<{
        points: number;
        totalOrders: number;
        totalSpent: number;
    }>;
}
