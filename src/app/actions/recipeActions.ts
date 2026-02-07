import { supabase } from "@/lib/supabase";
import { safeAction } from "@/lib/security";

export interface Recipe {
    id: string;
    slug: string;
    title: string;
    summary: string;
    content: string;
    category: string;
    complexity: 'Basic' | 'Advanced' | 'Expert';
    estimated_time: string;
    image_url?: string;
    is_active: boolean;
    metadata: any;
}

export async function getRecipes(): Promise<Recipe[]> {
    if (!supabase) return [];
    const { data } = await supabase
        .from('recipes')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
    return data || [];
}

export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
    if (!supabase) return null;
    const { data } = await supabase
        .from('recipes')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single();
    return data;
}

export async function createRecipe(recipe: Omit<Recipe, 'id'>): Promise<Recipe | null> {
    const result = await safeAction(async () => {
        if (!supabase) return null;
        const { data, error } = await supabase
            .from('recipes')
            .insert([recipe])
            .select()
            .single();
        if (error) throw error;
        return data;
    }, "Error al crear la receta de ingeniería.");
    return result.data;
}

export async function deleteRecipe(id: string): Promise<void> {
    await safeAction(async () => {
        if (!supabase) return;
        const { error } = await supabase
            .from('recipes')
            .delete()
            .eq('id', id);
        if (error) throw error;
    }, "Error al eliminar la receta.");
}
