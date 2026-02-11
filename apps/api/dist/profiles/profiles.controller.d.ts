import { ProfilesService } from './profiles.service';
export declare class ProfilesController {
    private readonly profilesService;
    constructor(profilesService: ProfilesService);
    getProfile(req: any): Promise<{
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
    getProfiles(): Promise<{
        id: string;
        email: string | null;
        fullName: string | null;
        role: string;
        knowledgePoints: number;
        avatarUrl: string | null;
        createdAt: Date;
    }[]>;
    getStats(req: any): Promise<{
        points: number;
        totalOrders: number;
        totalSpent: number;
    }>;
    updateProfile(req: any, data: {
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
}
