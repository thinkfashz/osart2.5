import { PrismaService } from '../prisma/prisma.service';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(filters: {
        category?: string;
        search?: string;
        minPrice?: number;
        maxPrice?: number;
        page: number;
        limit: number;
    }): Promise<{
        data: {
            id: string;
            title: string;
            description: string | null;
            price: number;
            stock: number;
            category: string | null;
            imageUrl: string | null;
            specs: string | null;
            createdAt: Date;
            categoryId: string | null;
            isActive: boolean;
            basePrice: number | null;
            metadata: string | null;
            userId: string | null;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        id: string;
        title: string;
        description: string | null;
        price: number;
        stock: number;
        category: string | null;
        imageUrl: string | null;
        specs: string | null;
        createdAt: Date;
        categoryId: string | null;
        isActive: boolean;
        basePrice: number | null;
        metadata: string | null;
        userId: string | null;
    }>;
    create(data: any): Promise<{
        id: string;
        title: string;
        description: string | null;
        price: number;
        stock: number;
        category: string | null;
        imageUrl: string | null;
        specs: string | null;
        createdAt: Date;
        categoryId: string | null;
        isActive: boolean;
        basePrice: number | null;
        metadata: string | null;
        userId: string | null;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        title: string;
        description: string | null;
        price: number;
        stock: number;
        category: string | null;
        imageUrl: string | null;
        specs: string | null;
        createdAt: Date;
        categoryId: string | null;
        isActive: boolean;
        basePrice: number | null;
        metadata: string | null;
        userId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        title: string;
        description: string | null;
        price: number;
        stock: number;
        category: string | null;
        imageUrl: string | null;
        specs: string | null;
        createdAt: Date;
        categoryId: string | null;
        isActive: boolean;
        basePrice: number | null;
        metadata: string | null;
        userId: string | null;
    }>;
}
