import { supabase } from "@/lib/supabase";
import { safeAction } from "@/lib/security";

export interface Category {
    id: string;
    name: string;
    slug: string;
    parent_id: string | null;
    description: string;
    image_url?: string;
    created_at: string;
}

export async function getCategories(): Promise<Category[]> {
    const { data } = await supabase
        .from('categories')
        .select('*')
        .order('name', { ascending: true });
    return data || [];
}

export async function getCategoryTree() {
    const categories = await getCategories();
    const map = new Map();
    const roots: any[] = [];

    categories.forEach(cat => {
        map.set(cat.id, { ...cat, children: [] });
    });

    categories.forEach(cat => {
        if (cat.parent_id && map.has(cat.parent_id)) {
            map.get(cat.parent_id).children.push(map.get(cat.id));
        } else {
            roots.push(map.get(cat.id));
        }
    });

    return roots;
}

export async function createCategory(category: Omit<Category, 'id' | 'created_at'>) {
    return await safeAction(async () => {
        const { data, error } = await supabase
            .from('categories')
            .insert([category])
            .select()
            .single();
        if (error) throw error;
        return data as Category;
    }, "Error al crear la categoría taxonomica.");
}

export async function updateCategory(id: string, updates: Partial<Category>) {
    return await safeAction(async () => {
        const { data, error } = await supabase
            .from('categories')
            .update(updates)
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;
        return data as Category;
    }, "Error al actualizar la categoría.");
}

export async function deleteCategory(id: string) {
    return await safeAction(async () => {
        const { error } = await supabase
            .from('categories')
            .delete()
            .eq('id', id);
        if (error) throw error;
    }, "Error al eliminar la categoría. Asegúrese de que no tenga subcategorías o productos vinculados.");
}
