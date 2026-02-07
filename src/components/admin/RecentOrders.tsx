"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Clock, TrendingUp } from 'lucide-react';
import { Order } from '@/types/order';
import { getRecentOrders } from '@/app/actions/orderActions';
import { formatCurrency } from '@/lib/utils';
import OrderStatusBadge from './OrderStatusBadge';
import { supabase } from '@/lib/supabase';

export default function RecentOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadOrders();
        subscribeToOrders();
    }, []);

    const loadOrders = async () => {
        setLoading(true);
        const result = await getRecentOrders(5);
        if (result.success && result.orders) {
            setOrders(result.orders);
        }
        setLoading(false);
    };

    const subscribeToOrders = () => {
        const channel = supabase
            .channel('orders_changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'orders'
                },
                () => {
                    loadOrders();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    };

    if (loading) {
        return (
            <div className="bg-white rounded-3xl p-8 shadow-subtle border border-graphite/10">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-electric-blue"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {orders.length === 0 ? (
                <div className="text-center py-16 bg-zinc-950 border border-zinc-900">
                    <Package size={32} className="mx-auto text-zinc-800 mb-4" />
                    <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-600">ZERO_DATA_QUEUE</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-[2px] bg-zinc-800 border border-zinc-800">
                    {/* Table Header Fragment */}
                    <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-zinc-950 text-[9px] font-mono font-black text-zinc-500 uppercase tracking-[0.2em]">
                        <div className="col-span-2">ID_REGISTRO</div>
                        <div className="col-span-4">NÚMERO_ORDEN</div>
                        <div className="col-span-2">ESTADO</div>
                        <div className="col-span-2">TIMESTAMP</div>
                        <div className="col-span-2 text-right">VALOR_TOTAL</div>
                    </div>

                    {orders.map((order, index) => (
                        <div
                            key={order.id}
                            className="grid grid-cols-1 md:grid-cols-12 items-center gap-4 px-6 py-5 bg-zinc-900 hover:bg-zinc-800 transition-colors group cursor-pointer"
                        >
                            <div className="col-span-2 flex items-center gap-3">
                                <div className="w-8 h-8 bg-zinc-950 border border-zinc-800 flex items-center justify-center text-[10px] font-mono font-black text-cyan-400">
                                    {order.order_number.split('-').pop()?.substring(0, 4)}
                                </div>
                                <span className="md:hidden text-[10px] font-mono text-zinc-500">ID_REG</span>
                            </div>

                            <div className="col-span-4">
                                <p className="text-xs font-mono font-black text-zinc-100 group-hover:text-cyan-400 transition-colors">
                                    {order.order_number}
                                </p>
                                <p className="text-[9px] font-mono text-zinc-600 uppercase mt-1">NUCLEO_REF: {order.id.substring(0, 8)}</p>
                            </div>

                            <div className="col-span-2">
                                <OrderStatusBadge status={order.status} className="rounded-none border-zinc-800 px-2 py-0.5 text-[9px]" />
                            </div>

                            <div className="col-span-2 text-[10px] font-mono text-zinc-400 uppercase">
                                {new Date(order.created_at).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                <span className="block text-[8px] text-zinc-600 mt-1">
                                    {new Date(order.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }).toUpperCase()}
                                </span>
                            </div>

                            <div className="col-span-2 text-right">
                                <div className="text-lg font-mono font-black tracking-tighter text-zinc-100 italic">
                                    {formatCurrency(order.total)}
                                </div>
                                <div className="text-[9px] font-mono text-zinc-600 uppercase">UNIT_TOTAL</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
