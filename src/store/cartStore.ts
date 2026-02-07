import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '@/types';

interface CartState {
    items: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    total: number;
    calculateTotal: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            total: 0,

            addItem: (product: Product) => {
                const currentItems = get().items;
                const existingItem = currentItems.find(item => item.id === product.id);

                if (existingItem) {
                    set({
                        items: currentItems.map(item =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        )
                    });
                } else {
                    set({ items: [...currentItems, { ...product, quantity: 1 }] });
                }
                get().calculateTotal();
            },

            removeItem: (productId: string) => {
                set({ items: get().items.filter(item => item.id !== productId) });
                get().calculateTotal();
            },

            updateQuantity: (productId: string, quantity: number) => {
                const currentItems = get().items;
                if (quantity <= 0) {
                    set({ items: currentItems.filter(item => item.id !== productId) });
                } else {
                    set({
                        items: currentItems.map(item =>
                            item.id === productId ? { ...item, quantity } : item
                        )
                    });
                }
                get().calculateTotal();
            },

            clearCart: () => set({ items: [], total: 0 }),

            calculateTotal: () => {
                const total = get().items.reduce(
                    (sum, item) => sum + (item.price * item.quantity),
                    0
                );
                set({ total });
            }
        }),
        {
            name: 'electro-cart-storage',
        }
    )
);
