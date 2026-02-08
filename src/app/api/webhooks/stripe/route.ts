import { getStripeClient } from '@/lib/stripe';
import { headers } from 'next/headers';
import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.text();
        const signature = (await headers()).get('stripe-signature');
        const stripeClient = getStripeClient();
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

        if (!signature) {
            return NextResponse.json(
                { error: 'No signature provided' },
                { status: 400 }
            );
        }

        if (!stripeClient || !webhookSecret) {
            return NextResponse.json(
                { error: 'Stripe no está configurado' },
                { status: 500 }
            );
        }

        // Verificar firma del webhook
        const event = stripeClient.webhooks.constructEvent(
            body,
            signature,
            webhookSecret
        );

        // Manejar diferentes tipos de eventos
        switch (event.type) {
            case 'payment_intent.succeeded':
                await handlePaymentSuccess(event.data.object);
                break;

            case 'payment_intent.payment_failed':
                await handlePaymentFailed(event.data.object);
                break;

            case 'payment_intent.processing':
                await handlePaymentProcessing(event.data.object);
                break;

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        return NextResponse.json({ received: true });
    } catch (error: any) {
        console.error('Webhook error:', error);
        return NextResponse.json(
            { error: `Webhook error: ${error.message}` },
            { status: 400 }
        );
    }
}

async function handlePaymentSuccess(paymentIntent: any) {
    if (!supabase) return;
    const orderId = paymentIntent.metadata.orderId;

    if (!orderId) {
        console.error('No orderId in payment intent metadata');
        return;
    }

    // Actualizar orden
    const { error } = await supabase
        .from('orders')
        .update({
            payment_status: 'confirmed',
            status: 'processing',
            payment_confirmed_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        })
        .eq('id', orderId);

    if (error) {
        console.error('Error updating order:', error);
        return;
    }

    // Registrar en historial
    await supabase
        .from('order_status_history')
        .insert({
            order_id: orderId,
            old_status: 'payment_pending',
            new_status: 'processing',
            notes: `Pago confirmado vía webhook (Stripe: ${paymentIntent.id})`,
        });

    console.log(`Payment succeeded for order ${orderId}`);
}

async function handlePaymentFailed(paymentIntent: any) {
    if (!supabase) return;
    const orderId = paymentIntent.metadata.orderId;

    if (!orderId) {
        console.error('No orderId in payment intent metadata');
        return;
    }

    // Actualizar orden
    const { error } = await supabase
        .from('orders')
        .update({
            payment_status: 'failed',
            status: 'payment_failed',
            updated_at: new Date().toISOString(),
        })
        .eq('id', orderId);

    if (error) {
        console.error('Error updating order:', error);
        return;
    }

    // Registrar en historial
    await supabase
        .from('order_status_history')
        .insert({
            order_id: orderId,
            old_status: 'payment_pending',
            new_status: 'payment_failed',
            notes: `Pago fallido vía webhook (Stripe: ${paymentIntent.id})`,
        });

    console.log(`Payment failed for order ${orderId}`);
}

async function handlePaymentProcessing(paymentIntent: any) {
    if (!supabase) return;
    const orderId = paymentIntent.metadata.orderId;

    if (!orderId) {
        console.error('No orderId in payment intent metadata');
        return;
    }

    // Registrar en historial
    await supabase
        .from('order_status_history')
        .insert({
            order_id: orderId,
            old_status: 'payment_pending',
            new_status: 'payment_pending',
            notes: `Pago en procesamiento (Stripe: ${paymentIntent.id})`,
        });

    console.log(`Payment processing for order ${orderId}`);
}
