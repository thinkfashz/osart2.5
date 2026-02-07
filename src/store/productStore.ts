import { create } from 'zustand';
import { Product } from '@/types';
import {
    getProducts,
    createProduct as apiCreateProduct,
    updateProduct as apiUpdateProduct,
    deleteProduct as apiDeleteProduct
} from '@/app/actions/productActions';

interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
    fetchProducts: () => Promise<void>;
    addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
    updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
}

export const useProductStore = create<ProductState>((set, get) => ({
    products: [],
    loading: false,
    error: null,

    fetchProducts: async () => {
        set({ loading: true, error: null });
        try {
            const products = await getProducts();
            set({ products, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    addProduct: async (productData) => {
        set({ loading: true, error: null });
        try {
            const newProduct = await apiCreateProduct(productData);
            if (newProduct) {
                set({
                    products: [...get().products, newProduct],
                    loading: false
                });
            } else {
                set({ loading: false, error: 'Failed to create product' });
            }
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    updateProduct: async (id, updates) => {
        set({ loading: true, error: null });
        try {
            const updatedProduct = await apiUpdateProduct(id, updates);
            if (updatedProduct) {
                set({
                    products: get().products.map(p => p.id === id ? updatedProduct : p),
                    loading: false
                });
            } else {
                set({ loading: false, error: 'Failed to update product' });
            }
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    deleteProduct: async (id) => {
        set({ loading: true, error: null });
        try {
            await apiDeleteProduct(id);
            set({
                products: get().products.filter(p => p.id !== id),
                loading: false
            });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    }
}));
