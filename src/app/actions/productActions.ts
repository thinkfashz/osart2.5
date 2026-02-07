import { supabase } from "@/lib/supabase";
import { Product } from "@/types";
import { safeAction } from "@/lib/security";

export async function getProducts(): Promise<Product[]> {
    const { data, error } = await safeAction(async () => {
        const { data, error } = await supabase
            .from('products')
            .select('*, variants:product_variants(*)')
            .order('id', { ascending: true });
        if (error) throw error;
        return data;
    }, "Error al obtener catálogo de productos.");

    return (data as Product[]) || [];
}

export async function createProduct(product: Omit<Product, 'id'>): Promise<Product | null> {
    const { data, error } = await safeAction(async () => {
        const { data, error } = await supabase
            .from('products')
            .insert([product])
            .select()
            .single();
        if (error) throw error;
        return data;
    }, "Error al registrar nuevo producto. Verifique los datos inyectados.");

    return data as Product;
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    const { data, error } = await safeAction(async () => {
        const { data, error } = await supabase
            .from('products')
            .update(updates)
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;
        return data;
    }, "Error al actualizar configuración de producto.");

    return data as Product;
}

export async function deleteProduct(id: string): Promise<void> {
    await safeAction(async () => {
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);
        if (error) throw error;
    }, "Error al eliminar módulo de producto. Acceso restringido o fallo de red.");
}

/**
 * Operaciones Masivas (Bulk Edits)
 */
export async function bulkUpdateProducts(ids: string[], updates: Partial<Product>): Promise<void> {
    await safeAction(async () => {
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
    const { data, error } = await supabase
        .from('product_variants')
        .select('*')
        .eq('product_id', productId);
    return data || [];
}

export async function createVariant(variant: any) {
    const { data, error } = await supabase
        .from('product_variants')
        .insert([variant])
        .select()
        .single();
    return data;
}

