export type OrderStatus =
    | 'pending'
    | 'payment_pending'
    | 'payment_confirmed'
    | 'payment_failed'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'cancelled';

export type PaymentStatus =
    | 'pending'
    | 'confirmed'
    | 'failed'
    | 'refunded';

export interface ShippingAddress {
    fullName: string;
    street: string;
    houseNumber: string;
    city: string;
    state: string;
    postalCode: string;
    phone: string;
}

export interface OrderItem {
    id: string;
    order_id: string;
    product_id: string;
    product_name: string;
    product_image: string;
    quantity: number;
    unit_price: number;
    subtotal: number;
    created_at?: string;
}

export interface Order {
    id: string;
    user_id: string | null;
    order_number: string;
    status: OrderStatus;
    payment_status: PaymentStatus;
    payment_method: string;
    subtotal: number;
    shipping_cost: number;
    total: number;
    shipping_address: ShippingAddress;
    created_at: string;
    updated_at: string;
    payment_confirmed_at?: string | null;
    cancelled_at?: string | null;
    items?: OrderItem[];
}

export interface OrderStatusHistory {
    id: string;
    order_id: string;
    old_status: string | null;
    new_status: string;
    notes?: string | null;
    created_by?: string | null;
    created_at: string;
}

export interface OrderStats {
    todaySales: number;
    pendingOrders: number;
    confirmedOrders: number;
    totalOrders: number;
}

export interface CreateOrderInput {
    items: {
        product_id: string;
        product_name: string;
        product_image: string;
        quantity: number;
        unit_price: number;
    }[];
    shipping_address: ShippingAddress;
    payment_method: string;
    subtotal: number;
    shipping_cost: number;
    total: number;
}
