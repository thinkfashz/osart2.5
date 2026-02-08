"use server";

import { supabase } from "@/lib/supabase";
import { getStripeClient } from "@/lib/stripe";
import {
    Order,
    OrderItem,
    OrderStatus,
    OrderStatusHistory,
    CreateOrderInput,
    OrderStats
} from "@/types/order";

// Generar número de orden único
function generateOrderNumber(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 99999).toString().padStart(5, '0');
    return `ORD-${year}${month}${day}-${random}`;
}

// Crear una nueva orden
export async function createOrder(input: CreateOrderInput) {
    if (!supabase) return { success: false, error: "Servidor de base de datos no disponible" };
    try {
        // VALIDACIÓN DE STOCK: Verificar disponibilidad antes de crear la orden
        for (const item of input.items) {
            const { data: product, error: productError } = await supabase
                .from('products')
                .select('stock, title')
                .eq('id', item.product_id)
                .single();

            if (productError) {
                console.error('Error fetching product:', productError);
                return {
                    success: false,
                    error: `Error al verificar disponibilidad de ${item.product_name}`
                };
            }

            if (!product) {
                return {
                    success: false,
                    error: `Producto ${item.product_name} no encontrado`
                };
            }

            if (product.stock < item.quantity) {
                return {
                    success: false,
                    error: `Stock insuficiente para ${product.title}. Disponible: ${product.stock}, Solicitado: ${item.quantity}`
                };
            }
        }

        const orderNumber = generateOrderNumber();

        // Crear la orden
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert({
                order_number: orderNumber,
                status: 'payment_pending',
                payment_status: 'pending',
                payment_method: input.payment_method,
                subtotal: input.subtotal,
                shipping_cost: input.shipping_cost,
                total: input.total,
                shipping_address: input.shipping_address,
                user_id: null, // Por ahora sin autenticación
            })
            .select()
            .single();

        if (orderError) {
            console.error('Error creating order:', orderError);
            return { success: false, error: 'Error al crear la orden' };
        }

        // Crear los items de la orden
        const orderItems = input.items.map(item => ({
            order_id: order.id,
            product_id: item.product_id,
            product_name: item.product_name,
            product_image: item.product_image,
            quantity: item.quantity,
            unit_price: item.unit_price,
            subtotal: item.unit_price * item.quantity,
        }));

        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems);

        if (itemsError) {
            console.error('Error creating order items:', itemsError);
            return { success: false, error: 'Error al crear los items de la orden' };
        }

        // Registrar en historial
        await supabase
            .from('order_status_history')
            .insert({
                order_id: order.id,
                old_status: null,
                new_status: 'payment_pending',
                notes: 'Orden creada, esperando confirmación de pago',
            });

        return {
            success: true,
            order: { ...order, items: orderItems } as Order
        };
    } catch (error) {
        console.error('Unexpected error creating order:', error);
        return { success: false, error: 'Error inesperado al crear la orden' };
    }
}

// Crear PaymentIntent de Stripe
export async function createPaymentIntent(orderId: string) {
    if (!supabase) return { success: false, error: "Servidor de base de datos no disponible" };
    try {
        const stripeClient = getStripeClient();
        if (!stripeClient) {
            return { success: false, error: "Stripe no está configurado" };
        }

        // Obtener orden con items
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .select('*, items:order_items(*)')
            .eq('id', orderId)
            .single();

        if (orderError || !order) {
            console.error('Error fetching order:', orderError);
            return { success: false, error: 'Orden no encontrada' };
        }

        // Crear PaymentIntent en Stripe
        const paymentIntent = await stripeClient.paymentIntents.create({
            amount: Math.round(order.total * 100), // Convertir a centavos
            currency: 'usd',
            metadata: {
                orderId: order.id,
                orderNumber: order.order_number,
            },
            automatic_payment_methods: {
                enabled: true,
            },
        });

        // Guardar payment_intent_id en la orden
        await supabase
            .from('orders')
            .update({ payment_intent_id: paymentIntent.id })
            .eq('id', orderId);

        return {
            success: true,
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
        };
    } catch (error) {
        console.error('Error creating payment intent:', error);
        return { success: false, error: 'Error al crear intención de pago' };
    }
}

// Verificar pago con Stripe API
export async function verifyPayment(orderId: string, paymentIntentId?: string) {
    if (!supabase) return { success: false, error: "Servidor de base de datos no disponible" };
    try {
        const stripeClient = getStripeClient();
        if (!stripeClient) {
            return { success: false, error: "Stripe no está configurado" };
        }

        let paymentIntent;

        // Si no se proporciona paymentIntentId, obtenerlo de la orden
        if (!paymentIntentId) {
            const { data: order } = await supabase
                .from('orders')
                .select('payment_intent_id')
                .eq('id', orderId)
                .single();

            if (!order?.payment_intent_id) {
                return { success: false, error: 'No se encontró PaymentIntent para esta orden' };
            }

            paymentIntentId = order.payment_intent_id;
        }

        // Verificar estado del PaymentIntent en Stripe
        if (!paymentIntentId) {
            return { success: false, error: 'No se pudo determinar el ID de pago' };
        }
        paymentIntent = await stripeClient.paymentIntents.retrieve(paymentIntentId);

        const isSuccess = paymentIntent.status === 'succeeded';
        const newPaymentStatus = isSuccess ? 'confirmed' :
            paymentIntent.status === 'processing' ? 'pending' : 'failed';
        const newStatus = isSuccess ? 'processing' :
            paymentIntent.status === 'processing' ? 'payment_pending' : 'payment_failed';

        // Actualizar orden
        const updateData: any = {
            payment_status: newPaymentStatus,
            status: newStatus,
            updated_at: new Date().toISOString(),
        };

        if (isSuccess) {
            updateData.payment_confirmed_at = new Date().toISOString();
        }

        const { data: order, error: updateError } = await supabase
            .from('orders')
            .update(updateData)
            .eq('id', orderId)
            .select()
            .single();

        if (updateError) {
            console.error('Error updating order payment status:', updateError);
            return { success: false, error: 'Error al verificar el pago' };
        }

        // Registrar en historial
        await supabase
            .from('order_status_history')
            .insert({
                order_id: orderId,
                old_status: 'payment_pending',
                new_status: newStatus,
                notes: isSuccess
                    ? `Pago confirmado exitosamente (Stripe: ${paymentIntentId})`
                    : `Pago ${paymentIntent.status} (Stripe: ${paymentIntentId})`,
            });

        return {
            success: true,
            paymentConfirmed: isSuccess,
            paymentStatus: paymentIntent.status,
            order
        };
    } catch (error) {
        console.error('Unexpected error verifying payment:', error);
        return { success: false, error: 'Error inesperado al verificar el pago' };
    }
}

// Obtener órdenes recientes
export async function getRecentOrders(limit: number = 10) {
    if (!supabase) return { success: false, orders: [] };
    try {
        const { data: orders, error } = await supabase
            .from('orders')
            .select(`
        *,
        items:order_items(*)
      `)
            .order('created_at', { ascending: false })
            .limit(limit);

        if (error) {
            console.error('Error fetching recent orders:', error);
            return { success: false, error: 'Error al obtener órdenes recientes' };
        }

        return { success: true, orders: orders as Order[] };
    } catch (error) {
        console.error('Unexpected error fetching orders:', error);
        return { success: false, error: 'Error inesperado al obtener órdenes' };
    }
}

// Obtener estadísticas de órdenes
export async function getOrderStats(): Promise<{ success: boolean; stats?: OrderStats; error?: string }> {
    if (!supabase) return { success: false, error: "Servidor de base de datos no disponible" };
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayISO = today.toISOString();

        // Total de ventas del día
        const { data: todayOrders, error: todayError } = await supabase
            .from('orders')
            .select('total')
            .gte('created_at', todayISO)
            .eq('payment_status', 'confirmed');

        if (todayError) {
            console.error('Error fetching today orders:', todayError);
            return { success: false, error: 'Error al obtener estadísticas' };
        }

        const todaySales = todayOrders?.reduce((sum: number, order: any) => sum + (order.total || 0), 0) || 0;

        // Órdenes pendientes
        const { count: pendingCount, error: pendingError } = await supabase
            .from('orders')
            .select('*', { count: 'exact', head: true })
            .in('status', ['pending', 'payment_pending']);

        if (pendingError) {
            console.error('Error fetching pending orders:', pendingError);
        }

        // Órdenes confirmadas (procesando, enviadas, entregadas)
        const { count: confirmedCount, error: confirmedError } = await supabase
            .from('orders')
            .select('*', { count: 'exact', head: true })
            .in('status', ['processing', 'shipped', 'delivered']);

        if (confirmedError) {
            console.error('Error fetching confirmed orders:', confirmedError);
        }

        // Total de órdenes
        const { count: totalCount, error: totalError } = await supabase
            .from('orders')
            .select('*', { count: 'exact', head: true });

        if (totalError) {
            console.error('Error fetching total orders:', totalError);
        }

        return {
            success: true,
            stats: {
                todaySales,
                pendingOrders: pendingCount || 0,
                confirmedOrders: confirmedCount || 0,
                totalOrders: totalCount || 0,
            }
        };
    } catch (error) {
        console.error('Unexpected error fetching order stats:', error);
        return { success: false, error: 'Error inesperado al obtener estadísticas' };
    }
}
