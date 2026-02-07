"use client";

import { useState, useEffect } from 'react';
import { calculateFinalPrice } from '@/app/actions/pricingActions';

export function useProductPrice(productId: string, variantId?: string, quantity: number = 1) {
    const [priceData, setPriceData] = useState<{
        originalPrice: number;
        finalPrice: number;
        discountsApplied: any[];
        loading: boolean;
    }>({
        originalPrice: 0,
        finalPrice: 0,
        discountsApplied: [],
        loading: true
    });

    useEffect(() => {
        let isMounted = true;

        async function getPrice() {
            setPriceData(prev => ({ ...prev, loading: true }));
            try {
                const data = await calculateFinalPrice(productId, variantId, quantity);
                if (isMounted) {
                    setPriceData({
                        ...data,
                        loading: false
                    });
                }
            } catch (error) {
                console.error("Error calculating price:", error);
                if (isMounted) {
                    setPriceData(prev => ({ ...prev, loading: false }));
                }
            }
        }

        if (productId) getPrice();

        return () => { isMounted = false; };
    }, [productId, variantId, quantity]);

    return priceData;
}
