export interface ShippingZone {
    enabled: boolean;
    delivery_time_min: number;
    delivery_time_max: number;
    regions: string[];
}

export interface ShippingData {
    national?: ShippingZone;
    international?: ShippingZone;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    parent_id?: string;
    description?: string;
    image_url?: string;
    created_at: string;
}

export interface ProductVariant {
    id: string;
    product_id: string;
    name: string;
    sku?: string;
    price_override?: number;
    stock: number;
    attributes: Record<string, any>;
    image_url?: string;
    created_at: string;
}

export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    base_price?: number;
    stock: number;
    category: string;
    category_id?: string;
    image_url: string;
    specs: Record<string, any>;
    bonus?: string;
    bonus_points?: number;
    is_active?: boolean;
    metadata?: Record<string, any>;
    variants?: ProductVariant[];
}

export interface Promotion {
    id: string;
    name: string;
    description?: string;
    type: 'percentage' | 'fixed_amount';
    value: number;
    start_date?: string;
    end_date?: string;
    is_active: boolean;
    code?: string;
    created_at: string;
}

export interface PricingRule {
    id: string;
    name: string;
    rule_type: 'markup' | 'discount' | 'bulk';
    configuration: Record<string, any>;
    priority: number;
    is_active: boolean;
    created_at: string;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface Profile {
    id: string;
    email: string;
    role: 'user' | 'admin';
    knowledge_points: number;
}

export interface Order {
    id: string;
    user_id: string;
    total: number;
    status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
    items: CartItem[];
    tracking_number?: string;
    shipping_date?: string;
    delivery_date?: string;
    created_at: string;
}
