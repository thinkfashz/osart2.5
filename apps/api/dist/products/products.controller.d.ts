import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(category?: string, search?: string, minPrice?: string, maxPrice?: string, page?: string, limit?: string): Promise<{
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
    create(createProductDto: any): Promise<{
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
    update(id: string, updateProductDto: any): Promise<{
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
