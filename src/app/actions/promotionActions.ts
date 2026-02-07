import { supabase } from "@/lib/supabase";
import { Promotion } from "@/types";
import { safeAction } from "@/lib/security";

export async function getPromotions(): Promise<Promotion[]> {
    const { data } = await supabase
        .from('promotions')
        .select('*')
        .order('created_at', { ascending: false });
    return data || [];
}

export async function createPromotion(promotion: Omit<Promotion, 'id' | 'created_at'>, targets: { target_type: 'product' | 'category', target_id: string }[]): Promise<Promotion | null> {
    const result = await safeAction(async () => {
        // 1. Insert promotion
        const { data: newPromo, error: promoError } = await supabase
            .from('promotions')
            .insert([promotion])
            .select()
            .single();

        if (promoError) throw promoError;

        // 2. Insert targets
        if (targets.length > 0) {
            const targetsWithPromoId = targets.map(t => ({
                promotion_id: newPromo.id,
                ...t
            }));
            const { error: targetError } = await supabase
                .from('promotion_targets')
                .insert(targetsWithPromoId);

            if (targetError) throw targetError;
        }

        return newPromo;
    }, "Error al crear promoción.");

    return result.data;
}

export async function togglePromotionStatus(id: string, is_active: boolean): Promise<void> {
    await safeAction(async () => {
        const { error } = await supabase
            .from('promotions')
            .update({ is_active })
            .eq('id', id);
        if (error) throw error;
    }, "Error al actualizar estado de la promoción.");
}

export async function deletePromotion(id: string): Promise<void> {
    await safeAction(async () => {
        const { error } = await supabase
            .from('promotions')
            .delete()
            .eq('id', id);
        if (error) throw error;
    }, "Error al eliminar promoción.");
}
