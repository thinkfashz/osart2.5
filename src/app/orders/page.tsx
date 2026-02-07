"use client";

import { useEffect, useState } from "react";
import { Order } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Package, Truck, CheckCircle, Clock, Calendar, MoveLeft, Hash } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function MyOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    // Mock data for demonstration - in real app would fetch from Supabase
    useEffect(() => {
        const timer = setTimeout(() => {
            setOrders([
                {
                    id: "ORD-992384",
                    user_id: "user123",
                    total: 125900,
                    status: "delivered",
                    items: [],
                    tracking_number: "EC-TRK-7721",
                    shipping_date: "2026-01-20T10:00:00Z",
                    delivery_date: "2026-01-22T14:30:00Z",
                    created_at: "2026-01-19T18:45:00Z"
                },
                {
                    id: "ORD-994512",
                    user_id: "user123",
                    total: 45000,
                    status: "shipped",
                    items: [],
                    tracking_number: "EC-TRK-8810",
                    shipping_date: "2026-01-27T09:15:00Z",
                    created_at: "2026-01-26T11:20:00Z"
                }
            ]);
            setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-transparent flex flex-col items-center justify-center pt-20">
                <div className="animate-pulse flex flex-col items-center gap-4">
                    <div className="h-12 w-48 bg-charcoal/5 rounded-full shadow-premium" />
                    <div className="text-[10px] uppercase tracking-widest font-bold text-gold italic">Consultando Registros...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-transparent text-charcoal min-h-screen pt-32 pb-24 selection:bg-gold/30">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                    <div className="space-y-4">
                        <Link href="/" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-charcoal/40 hover:text-gold transition-colors italic">
                            <MoveLeft size={16} /> Conexión_Base
                        </Link>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic text-charcoal leading-none">Mi Registro <br /> <span className="text-charcoal/10">Industrial.</span></h1>
                        <p className="text-charcoal/40 font-black uppercase tracking-widest text-[10px] italic">Resumen de suministros y seguimiento de envíos técnicos OSORT.</p>
                    </div>
                </div>

                <div className="space-y-8">
                    {orders.length === 0 ? (
                        <div className="bg-charcoal/5 p-16 rounded-[4rem] shadow-premium border border-charcoal/5 text-center space-y-8">
                            <p className="text-charcoal/40 font-black uppercase tracking-widest select-none italic">No se registran suministros industriales activos.</p>
                            <Link href="/catalog" className="inline-block px-12 py-4 bg-charcoal text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-gold hover:text-black transition-all shadow-premium">Explorar Catálogo</Link>
                        </div>
                    ) : (
                        orders.map((order) => (
                            <div key={order.id} className="bg-transparent rounded-[4rem] shadow-premium border border-charcoal/5 overflow-hidden group hover:border-gold/30 transition-all duration-700">
                                <div className="p-8 md:p-12">
                                    <div className="flex flex-col md:flex-row justify-between gap-8 border-b border-charcoal/5 pb-10 mb-10">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 text-gold">
                                                <Hash size={18} />
                                                <span className="text-lg font-black tracking-tight">{order.id}</span>
                                            </div>
                                            <div className="flex items-center gap-6 text-[10px]">
                                                <div className="flex items-center gap-2 text-charcoal/40 font-black uppercase tracking-widest italic">
                                                    <Calendar size={14} />
                                                    {new Date(order.created_at).toLocaleDateString()}
                                                </div>
                                                <div className={cn(
                                                    "px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest italic shadow-premium border",
                                                    order.status === 'delivered' ? "bg-green-500/5 text-green-500 border-green-500/20" :
                                                        order.status === 'shipped' ? "bg-gold/5 text-gold border-gold/20" :
                                                            "bg-charcoal/5 text-charcoal/40 border-charcoal/10"
                                                )}>
                                                    {order.status === 'delivered' ? 'Entregado_Final' : order.status === 'shipped' ? 'En_Tránsito' : 'Procesando_Nodal'}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-center md:text-right">
                                            <p className="text-[9px] uppercase tracking-[0.4em] font-black text-charcoal/20 mb-2 italic">Inversión Certificada</p>
                                            <p className="text-4xl md:text-6xl font-black tracking-tighter text-charcoal italic">{formatCurrency(order.total)}</p>
                                        </div>
                                    </div>

                                    {/* Tracking Timeline */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                                        <div className="relative pl-10 border-l-2 border-charcoal/5 space-y-2">
                                            <div className="absolute -left-[11px] top-0 h-5 w-5 rounded-full bg-gold border-4 border-white shadow-premium" />
                                            <p className="text-[9px] font-black uppercase tracking-widest text-charcoal/40 italic">Solicitud_Sistema</p>
                                            <p className="text-sm font-black text-charcoal italic">{new Date(order.created_at).toLocaleDateString()} - {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                        </div>

                                        <div className={cn(
                                            "relative pl-10 border-l-2 space-y-2",
                                            order.shipping_date ? "border-gold" : "border-charcoal/5"
                                        )}>
                                            <div className={cn(
                                                "absolute -left-[11px] top-0 h-5 w-5 rounded-full border-4 border-white shadow-premium",
                                                order.shipping_date ? "bg-gold" : "bg-charcoal/10"
                                            )} />
                                            <p className="text-[9px] font-black uppercase tracking-widest text-charcoal/40 italic">Despacho_Industrial</p>
                                            {order.shipping_date ? (
                                                <p className="text-sm font-black text-charcoal italic">{new Date(order.shipping_date).toLocaleDateString()} - {new Date(order.shipping_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                            ) : (
                                                <p className="text-sm font-bold text-charcoal/20 uppercase tracking-tighter italic">Pendiente_Logística</p>
                                            )}
                                        </div>

                                        <div className={cn(
                                            "relative pl-10 border-l-2 space-y-2",
                                            order.delivery_date ? "border-gold" : "border-charcoal/5"
                                        )}>
                                            <div className={cn(
                                                "absolute -left-[11px] top-0 h-5 w-5 rounded-full border-4 border-white shadow-premium",
                                                order.delivery_date ? "bg-gold" : "bg-charcoal/10"
                                            )} />
                                            <p className="text-[9px] font-black uppercase tracking-widest text-charcoal/40 italic">Entrega_Certificada</p>
                                            {order.delivery_date ? (
                                                <p className="text-sm font-black text-charcoal italic">{new Date(order.delivery_date).toLocaleDateString()} - ENTREGADO</p>
                                            ) : (
                                                <p className="text-sm font-bold text-charcoal/20 uppercase tracking-tighter italic">Programado_Entrega</p>
                                            )}
                                        </div>
                                    </div>

                                    {order.tracking_number && (
                                        <div className="mt-12 p-8 bg-charcoal/5 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center gap-8 shadow-premium border border-charcoal/5">
                                            <div className="flex items-center gap-5">
                                                <div className="h-14 w-14 flex items-center justify-center rounded-2xl bg-white shadow-luxury text-gold">
                                                    <Truck size={24} strokeWidth={1.5} />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[9px] font-black uppercase tracking-widest text-charcoal/40 italic">Identificador_Logístico</p>
                                                    <p className="text-lg font-black text-charcoal tracking-tighter italic font-mono uppercase">{order.tracking_number}</p>
                                                </div>
                                            </div>
                                            <button className="px-10 py-4 bg-charcoal text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-gold hover:text-black transition-all shadow-premium">
                                                Rastrear Coordenadas
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
