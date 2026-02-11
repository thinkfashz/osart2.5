const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export interface Product {
    id: string;
    title: string;
    description: string | null;
    price: number;
    stock: number;
    category: string | null;
    imageUrl: string | null;
    specs: any;
    createdAt: string;
}

export interface ProductsResponse {
    data: Product[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export interface Order {
    id: string;
    userId: string;
    total: number;
    status: string;
    items: any;
    trackingNumber: string | null;
    shippingDate: string | null;
    deliveryDate: string | null;
    createdAt: string;
}

export interface DashboardStats {
    totalSales: number;
    activeUsers: number;
    totalInventory: number;
    pendingOrders: number;
}

export interface UserProfile {
    id: string;
    email: string | null;
    fullName: string | null;
    role: string;
    knowledgePoints: number;
    avatarUrl: string | null;
    createdAt: string;
    orders?: Order[];
}

export interface ProfileStats {
    points: number;
    totalOrders: number;
    totalSpent: number;
}

// Helper to get auth token from Supabase
async function getAuthToken(): Promise<string | null> {
    if (typeof window === 'undefined') return null;

    const { supabase } = await import('@/lib/supabase');
    const { data: { session } } = await supabase.auth.getSession();

    return session?.access_token || null;
}

// Products API
export const productsApi = {
    list: async (params?: {
        category?: string;
        search?: string;
        minPrice?: number;
        maxPrice?: number;
        page?: number;
        limit?: number;
    }): Promise<ProductsResponse> => {
        const queryParams = new URLSearchParams();
        if (params?.category) queryParams.append('category', params.category);
        if (params?.search) queryParams.append('search', params.search);
        if (params?.minPrice !== undefined) queryParams.append('minPrice', params.minPrice.toString());
        if (params?.maxPrice !== undefined) queryParams.append('maxPrice', params.maxPrice.toString());
        if (params?.page) queryParams.append('page', params.page.toString());
        if (params?.limit) queryParams.append('limit', params.limit.toString());

        const res = await fetch(`${API_URL}/products?${queryParams}`);
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
    },

    getById: async (id: string): Promise<Product> => {
        const res = await fetch(`${API_URL}/products/${id}`);
        if (!res.ok) throw new Error('Failed to fetch product');
        return res.json();
    },

    create: async (data: Partial<Product>): Promise<Product> => {
        const token = await getAuthToken();
        const res = await fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to create product');
        return res.json();
    },

    update: async (id: string, data: Partial<Product>): Promise<Product> => {
        const token = await getAuthToken();
        const res = await fetch(`${API_URL}/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to update product');
        return res.json();
    },

    delete: async (id: string): Promise<void> => {
        const token = await getAuthToken();
        const res = await fetch(`${API_URL}/products/${id}`, {
            method: 'DELETE',
            headers: {
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        });
        if (!res.ok) throw new Error('Failed to delete product');
    },
};

// Orders API
export const ordersApi = {
    list: async (): Promise<Order[]> => {
        const token = await getAuthToken();
        const res = await fetch(`${API_URL}/orders`, {
            headers: {
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        });
        if (!res.ok) throw new Error('Failed to fetch orders');
        return res.json();
    },

    getById: async (id: string): Promise<Order> => {
        const token = await getAuthToken();
        const res = await fetch(`${API_URL}/orders/${id}`, {
            headers: {
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        });
        if (!res.ok) throw new Error('Failed to fetch order');
        return res.json();
    },

    create: async (data: { total: number; items: any }): Promise<Order> => {
        const token = await getAuthToken();
        const res = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to create order');
        return res.json();
    },

    updateStatus: async (id: string, status: string): Promise<Order> => {
        const token = await getAuthToken();
        const res = await fetch(`${API_URL}/orders/${id}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify({ status }),
        });
        if (!res.ok) throw new Error('Failed to update order status');
        return res.json();
    },
};

// Payments API
export const paymentsApi = {
    createIntent: async (data: { amount: number; orderId: string }): Promise<{ clientSecret: string; id: string }> => {
        const token = await getAuthToken();
        const res = await fetch(`${API_URL}/payments/create-intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to create payment intent');
        return res.json();
    },
};

// Stats API
export const statsApi = {
    getDashboardStats: async (): Promise<DashboardStats> => {
        const token = await getAuthToken();
        const res = await fetch(`${API_URL}/admin/stats`, {
            headers: {
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        });
        if (!res.ok) throw new Error('Failed to fetch dashboard stats');
        return res.json();
    },
};

// Profiles API
export const profilesApi = {
    getMe: async (): Promise<UserProfile> => {
        const token = await getAuthToken();
        const res = await fetch(`${API_URL}/profiles/me`, {
            headers: {
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        });
        if (!res.ok) throw new Error('Failed to fetch profile');
        return res.json();
    },

    getStats: async (): Promise<ProfileStats> => {
        const token = await getAuthToken();
        const res = await fetch(`${API_URL}/profiles/me/stats`, {
            headers: {
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        });
        if (!res.ok) throw new Error('Failed to fetch profile stats');
        return res.json();
    },

    update: async (data: { fullName?: string; avatarUrl?: string }): Promise<UserProfile> => {
        const token = await getAuthToken();
        const res = await fetch(`${API_URL}/profiles/me`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to update profile');
        return res.json();
    },

    list: async (): Promise<UserProfile[]> => {
        const token = await getAuthToken();
        const res = await fetch(`${API_URL}/profiles`, {
            headers: {
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        });
        if (!res.ok) throw new Error('Failed to fetch profiles');
        return res.json();
    },
};
