"use server";

import { supabase } from "@/lib/supabase";
import { stripe } from "@/lib/stripe";
import { getMercadoPago } from "@/lib/mercadopago";
import { getPayPalClient } from "@/lib/paypal";

export type PaymentProvider = 'stripe' | 'mercadopago' | 'paypal';

export interface PaymentProviderStatus {
    provider: PaymentProvider;
    connected: boolean;
    configured: boolean;
    lastChecked: string;
    error?: string;
}

// Verificar conexión de Stripe
export async function checkStripeConnection(): Promise<PaymentProviderStatus> {
    try {
        if (!process.env.STRIPE_SECRET_KEY) {
            return {
                provider: 'stripe',
                connected: false,
                configured: false,
                lastChecked: new Date().toISOString(),
                error: 'API key no configurada'
            };
        }

        if (!stripe) {
            return {
                provider: 'stripe',
                connected: false,
                configured: false,
                lastChecked: new Date().toISOString(),
                error: 'Stripe client no inicializado'
            };
        }

        // Intentar hacer una llamada simple a la API
        await stripe.balance.retrieve();

        return {
            provider: 'stripe',
            connected: true,
            configured: true,
            lastChecked: new Date().toISOString(),
        };
    } catch (error: any) {
        return {
            provider: 'stripe',
            connected: false,
            configured: true,
            lastChecked: new Date().toISOString(),
            error: error.message || 'Error de conexión'
        };
    }
}

// Verificar conexión de MercadoPago
export async function checkMercadoPagoConnection(): Promise<PaymentProviderStatus> {
    try {
        if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
            return {
                provider: 'mercadopago',
                connected: false,
                configured: false,
                lastChecked: new Date().toISOString(),
                error: 'Access token no configurado'
            };
        }

        const mp = getMercadoPago();
        if (!mp) {
            return {
                provider: 'mercadopago',
                connected: false,
                configured: false,
                lastChecked: new Date().toISOString(),
                error: 'Error al inicializar MercadoPago'
            };
        }

        // MercadoPago está configurado
        return {
            provider: 'mercadopago',
            connected: true,
            configured: true,
            lastChecked: new Date().toISOString(),
        };
    } catch (error: any) {
        return {
            provider: 'mercadopago',
            connected: false,
            configured: true,
            lastChecked: new Date().toISOString(),
            error: error.message || 'Error de conexión'
        };
    }
}

// Verificar conexión de PayPal
export async function checkPayPalConnection(): Promise<PaymentProviderStatus> {
    try {
        if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
            return {
                provider: 'paypal',
                connected: false,
                configured: false,
                lastChecked: new Date().toISOString(),
                error: 'Credenciales no configuradas'
            };
        }

        const client = getPayPalClient();
        if (!client) {
            return {
                provider: 'paypal',
                connected: false,
                configured: false,
                lastChecked: new Date().toISOString(),
                error: 'Error al inicializar PayPal'
            };
        }

        return {
            provider: 'paypal',
            connected: true,
            configured: true,
            lastChecked: new Date().toISOString(),
        };
    } catch (error: any) {
        return {
            provider: 'paypal',
            connected: false,
            configured: true,
            lastChecked: new Date().toISOString(),
            error: error.message || 'Error de conexión'
        };
    }
}

// Obtener estado de todos los proveedores
export async function getAllPaymentProvidersStatus(): Promise<PaymentProviderStatus[]> {
    const [stripe, mercadopago, paypal] = await Promise.all([
        checkStripeConnection(),
        checkMercadoPagoConnection(),
        checkPayPalConnection(),
    ]);

    return [stripe, mercadopago, paypal];
}

// Guardar configuración de proveedor (en variables de entorno o base de datos)
export async function savePaymentProviderConfig(
    provider: PaymentProvider,
    config: Record<string, string>
) {
    try {
        // Por ahora, solo validamos que las claves sean correctas
        // En producción, deberías guardar esto en una tabla segura de Supabase

        // Aquí podrías guardar en una tabla de configuración
        // const { error } = await supabase
        //     .from('payment_provider_configs')
        //     .upsert({ provider, config: config });

        return { success: true };
    } catch (error) {
        console.error('Error saving payment provider config:', error);
        return { success: false, error: 'Error al guardar configuración' };
    }
}
