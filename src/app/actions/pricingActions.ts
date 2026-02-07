import { supabase } from "@/lib/supabase";
import { PricingRule, Promotion } from "@/types";
import { safeAction } from "@/lib/security";

/**
 * Motor de Precios: Calcula el precio final de un producto considerando reglas y promociones activas.
 */
export async function calculateFinalPrice(
    productId: string,
    variantId?: string,
    quantity: number = 1
): Promise<{ originalPrice: number; finalPrice: number; discountsApplied: any[] }> {
    const result = await safeAction(async () => {
        // 1. Obtener datos del producto y su variante
        const { data: product, error: prodError } = await supabase
            .from('products')
            .select('*, product_variants(*)')
            .eq('id', productId)
            .single();

        if (prodError || !product) throw new Error("Producto no encontrado");

        let basePrice = product.base_price || product.price || 0;
        if (variantId) {
            const variant = product.product_variants.find((v: any) => v.id === variantId);
            if (variant && variant.price_override) {
                basePrice = variant.price_override;
            }
        }

        let finalPrice = basePrice;
        const discountsApplied = [];

        // 2. Aplicar Reglas de Precios (Ej. Descuentos por volumen)
        const { data: rules } = await supabase
            .from('pricing_rules')
            .select('*')
            .eq('is_active', true)
            .order('priority', { ascending: false });

        if (rules) {
            for (const rule of rules) {
                if (rule.rule_type === 'bulk') {
                    const { min_quantity, discount_percentage } = rule.configuration;
                    if (quantity >= min_quantity) {
                        const discount = (finalPrice * discount_percentage) / 100;
                        finalPrice -= discount;
                        discountsApplied.push({ name: rule.name, amount: discount, type: 'rule' });
                    }
                }
            }
        }

        // 3. Aplicar Promociones Activas
        const now = new Date().toISOString();
        const { data: promotions } = await supabase
            .from('promotions')
            .select(`
                *,
                promotion_targets!inner(target_type, target_id)
            `)
            .eq('is_active', true)
            .lte('start_date', now)
            .gte('end_date', now);

        if (promotions) {
            for (const promo of promotions) {
                const appliesToProduct = promo.promotion_targets.some(
                    (t: any) => (t.target_type === 'product' && t.target_id === productId) ||
                        (t.target_type === 'category' && t.target_id === product.category_id)
                );

                if (appliesToProduct) {
                    let discount = 0;
                    if (promo.type === 'percentage') {
                        discount = (finalPrice * promo.value) / 100;
                    } else if (promo.type === 'fixed_amount') {
                        discount = promo.value;
                    }
                    finalPrice -= discount;
                    discountsApplied.push({ name: promo.name, amount: discount, type: 'promotion' });
                }
            }
        }

        return {
            originalPrice: basePrice,
            finalPrice: Math.max(0, finalPrice),
            discountsApplied
        };
    }, "Error al calcular precio final.");

    if (result.error || !result.data) {
        throw new Error(result.error || "Fallo en el cálculo de precio.");
    }

    return result.data;
}

export async function getPricingRules(): Promise<PricingRule[]> {
    const { data } = await supabase
        .from('pricing_rules')
        .select('*')
        .order('priority', { ascending: false });
    return data || [];
}

export async function getActivePromotions(): Promise<Promotion[]> {
    const now = new Date().toISOString();
    const { data } = await supabase
        .from('promotions')
        .select('*')
        .eq('is_active', true)
        .lte('start_date', now)
        .gte('end_date', now);
    return data || [];
}

export async function createPricingRule(rule: Omit<PricingRule, 'id' | 'created_at'>): Promise<PricingRule | null> {
    const result = await safeAction(async () => {
        const { data, error } = await supabase
            .from('pricing_rules')
            .insert([rule])
            .select()
            .single();
        if (error) throw error;
        return data;
    }, "Error al crear regla de precios.");
    return result.data;
}

export async function togglePricingRule(id: string, is_active: boolean): Promise<void> {
    await safeAction(async () => {
        const { error } = await supabase
            .from('pricing_rules')
            .update({ is_active })
            .eq('id', id);
        if (error) throw error;
    }, "Error al actualizar estado de la regla.");
}

export async function deletePricingRule(id: string): Promise<void> {
    await safeAction(async () => {
        const { error } = await supabase
            .from('pricing_rules')
            .delete()
            .eq('id', id);
        if (error) throw error;
    }, "Error al eliminar regla de precios.");
}
