import { productsApi } from "@/lib/api-client";
import { Product } from "@/types";
import { safeAction } from "@/lib/security";
import { supabase } from "@/lib/supabase";

export async function getProducts(): Promise<Product[]> {
    const { data, error } = await safeAction(async () => {
        const response = await productsApi.list({ limit: 100 });
        return response.data.map(p => ({
            ...p,
            description: p.description || '',
            category: p.category || '',
            image_url: p.imageUrl || '',
            created_at: p.createdAt,
            user_id: p.userId
        }));
    }, "Error al obtener catálogo de productos.");

    return (data as Product[]) || [];
}

export async function createProduct(product: Omit<Product, 'id'>): Promise<Product | null> {
    const { data, error } = await safeAction(async () => {
        const result = await productsApi.create(product);
        return {
            ...result,
            description: result.description || '',
            category: result.category || '',
            image_url: result.imageUrl || '',
            created_at: result.createdAt,
            user_id: result.userId
        };
    }, "Error al registrar nuevo producto. Verifique los datos inyectados.");

    return data as Product;
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    const { data, error } = await safeAction(async () => {
        const result = await productsApi.update(id, updates);
        return {
            ...result,
            description: result.description || '',
            category: result.category || '',
            image_url: result.imageUrl || '',
            created_at: result.createdAt,
            user_id: result.userId
        };
    }, "Error al actualizar configuración de producto.");

    return data as Product;
}

export async function deleteProduct(id: string): Promise<void> {
    await safeAction(async () => {
        await productsApi.delete(id);
    }, "Error al eliminar módulo de producto. Acceso restringido o fallo de red.");
}

/**
 * Operaciones Masivas (Bulk Edits)
 */
export async function bulkUpdateProducts(ids: string[], updates: Partial<Product>): Promise<void> {
    await safeAction(async () => {
        if (!supabase) return;
        const { error } = await supabase
            .from('products')
            .update(updates)
            .in('id', ids);
        if (error) throw error;
    }, "Error al realizar actualización masiva de productos.");
}

/**
 * Gestión de Variantes
 */
export async function getProductVariants(productId: string) {
    if (!supabase) return [];
    const { data, error } = await supabase
        .from('product_variants')
        .select('*')
        .eq('product_id', productId);
    return data || [];
}

export async function createVariant(variant: any) {
    if (!supabase) return null;
    const { data, error } = await supabase
        .from('product_variants')
        .insert([variant])
        .select()
        .single();
    return data;
}

