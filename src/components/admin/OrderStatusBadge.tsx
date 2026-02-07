import React from 'react';
import { OrderStatus } from '@/types/order';
import { cn } from '@/lib/utils';

interface OrderStatusBadgeProps {
    status: OrderStatus;
    className?: string;
}

const statusConfig: Record<OrderStatus, { label: string; color: string; bgColor: string; borderColor: string }> = {
    pending: {
        label: 'Pendiente',
        color: 'text-slate-deep/60',
        bgColor: 'bg-graphite/10',
        borderColor: 'border-graphite/20'
    },
    payment_pending: {
        label: 'Esperando Pago',
        color: 'text-electric-blue',
        bgColor: 'bg-electric-blue/10',
        borderColor: 'border-electric-blue/20'
    },
    payment_confirmed: {
        label: 'Pago Confirmado',
        color: 'text-tech-green',
        bgColor: 'bg-tech-green/10',
        borderColor: 'border-tech-green/20'
    },
    payment_failed: {
        label: 'Pago Fallido',
        color: 'text-red-500',
        bgColor: 'bg-red-500/10',
        borderColor: 'border-red-500/20'
    },
    processing: {
        label: 'Procesando',
        color: 'text-electric-blue',
        bgColor: 'bg-electric-blue/10',
        borderColor: 'border-electric-blue/20'
    },
    shipped: {
        label: 'Enviado',
        color: 'text-tech-green',
        bgColor: 'bg-tech-green/10',
        borderColor: 'border-tech-green/20'
    },
    delivered: {
        label: 'Entregado',
        color: 'text-tech-green',
        bgColor: 'bg-tech-green/10',
        borderColor: 'border-tech-green/20'
    },
    cancelled: {
        label: 'Cancelado',
        color: 'text-red-500',
        bgColor: 'bg-red-500/10',
        borderColor: 'border-red-500/20'
    }
};

export default function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
    const config = statusConfig[status];

    return (
        <span
            className={cn(
                'inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border',
                config.color,
                config.bgColor,
                config.borderColor,
                className
            )}
        >
            {config.label}
        </span>
    );
}
