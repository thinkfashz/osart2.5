"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { dummyOrders } from "@/data/dummyOrders";
import { formatCurrency } from "@/lib/utils";
import {
    ShoppingBag,
    Search,
    Filter,
    ChevronRight,
    Clock,
    CheckCircle2,
    Truck,
    XCircle,
    Eye,
    MoreHorizontal,
    RefreshCw,
    Activity,
    PackageCheck,
    Navigation,
    ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { sanitizeString, safeAction } from "@/lib/security";
import { ordersApi } from "@/lib/api-client";
import Pagination from "@/components/ui/Pagination";

const STATUS_CONFIG = {
    pending: { label: "PENDIENTE_AUTH", color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20", icon: Clock },
    paid: { label: "TRANSFERENCIA_OK", color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20", icon: ShieldCheck },
    shipped: { label: "EN_DESPLIEGUE", color: "text-gold", bg: "bg-gold/10", border: "border-gold/20", icon: Truck },
    delivered: { label: "NODO_ALCANZADO", color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/20", icon: CheckCircle2 },
    cancelled: { label: "OPERACIÓN_ABORTO", color: "text-cyber-red", bg: "bg-cyber-red/10", border: "border-cyber-red/20", icon: XCircle },
};

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        const { data, error } = await safeAction(async () => {
            return await ordersApi.list();
        }, "Error al sincronizar con el protocolo de logística.");

        if (!error && data) {
            setOrders(data);
        } else {
            setError(error);
        }
        setLoading(false);
    };

    const displayOrders = orders.length > 0 ? orders : (loading ? [] : dummyOrders);

    const filteredOrders = displayOrders.filter(order => {
        const matchesStatus = filter === "all" || order.status === filter;
        const matchesSearch = String(order.id).toLowerCase().includes(searchQuery.toLowerCase()) ||
            String(order.user_id || "").toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    const paginatedOrders = filteredOrders.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Reset to page 1 on search or filter
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, filter]);

    return (
        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-12 duration-500">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 border-b border-white/5 pb-10">
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <Navigation size={18} className="text-cyber-red" />
                        <span className="text-[10px] uppercase tracking-[0.8em] font-black text-white/30 italic">Protocolo_Logística // Despliegues_Globales</span>
                    </div>
                    <h1 className="text-7xl font-black tracking-tighter uppercase italic leading-[0.8]">Órdenes <br /> <span className="text-white/10 text-8xl">Logistics.</span></h1>
                </div>

                <div className="flex flex-wrap gap-6">
                    <div className="relative group max-w-sm w-full lg:w-80">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold transition-colors" size={20} />
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(sanitizeString(e.target.value))}
                            placeholder="LOCALIZAR ID_ORDEN"
                            className="w-full bg-white/[0.02] border border-white/5 h-16 rounded-2xl pl-16 pr-8 text-[11px] font-black tracking-widest uppercase focus:bg-white/5 focus:border-gold/30 outline-none liquid-hover shadow-inner placeholder:text-white/5"
                        />
                    </div>
                    <button
                        onClick={fetchOrders}
                        className="bg-white/5 border border-white/10 w-16 h-16 rounded-2xl flex items-center justify-center hover:bg-white/10 hover:border-white/30 liquid-hover transition-all group"
                    >
                        <RefreshCw className={cn("text-white/30 group-hover:text-white transition-colors", loading && "animate-spin")} size={22} />
                    </button>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-col space-y-6">
                <div className="flex items-center gap-4">
                    <Filter size={16} className="text-gold" />
                    <span className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20 italic">Filtros_de_Red</span>
                </div>
                <div className="flex items-center gap-4 overflow-x-auto pb-6 no-scrollbar">
                    {["all", "pending", "paid", "shipped", "delivered", "cancelled"].map((s) => (
                        <button
                            key={s}
                            onClick={() => setFilter(s)}
                            className={cn(
                                "px-8 py-3.5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] liquid-hover border transition-all truncate min-w-[160px]",
                                filter === s
                                    ? "bg-white text-black border-white shadow-paradox scale-105 italic"
                                    : "bg-white/5 text-white/30 border-white/5 hover:border-white/20 hover:text-white"
                            )}
                        >
                            {s === "all" ? "Todos los Despliegues" : STATUS_CONFIG[s as keyof typeof STATUS_CONFIG].label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Orders Table Area */}
            <div className="glass-morph rounded-[4rem] border border-white/5 overflow-hidden shadow-paradox">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/[0.03] border-b border-white/5">
                                <th className="px-10 py-8 text-[10px] uppercase tracking-[0.5em] font-black text-white/20 italic">ID_Despliegue</th>
                                <th className="px-10 py-8 text-[10px] uppercase tracking-[0.5em] font-black text-white/20 italic">Estado_Operativo</th>
                                <th className="px-10 py-8 text-[10px] uppercase tracking-[0.5em] font-black text-white/20 italic">Cronómetro_UTC</th>
                                <th className="px-10 py-8 text-[10px] uppercase tracking-[0.5em] font-black text-white/20 italic text-right">Inversión_Neto</th>
                                <th className="px-10 py-8 text-[10px] uppercase tracking-[0.5em] font-black text-white/20 italic text-center">Acciones_Terminal</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            <AnimatePresence mode="popLayout">
                                {paginatedOrders.map((order, idx) => {
                                    const Status = STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.pending;
                                    return (
                                        <motion.tr
                                            key={order.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, scale: 0.98 }}
                                            transition={{ duration: 0.6, delay: idx * 0.03, ease: [0.16, 1, 0.3, 1] }}
                                            className="group hover:bg-white/[0.02] liquid-hover border-b border-white/5 last:border-0"
                                        >
                                            <td className="px-10 py-10">
                                                <div className="flex flex-col">
                                                    <span className="text-xl font-black text-white tracking-tighter italic leading-none mb-2 group-hover:text-gold transition-colors">
                                                        #{order.id.toString().substring(0, 8).toUpperCase()}
                                                    </span>
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                                                        <span className="text-[9px] uppercase font-black text-white/20 tracking-widest italic">{order.user_id || 'CLIENTE_EXTERNO'}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-10">
                                                <div className={cn(
                                                    "inline-flex items-center gap-3 px-6 py-2.5 rounded-2xl border text-[9px] font-black uppercase tracking-[0.2em] italic shadow-inner",
                                                    Status.bg, Status.color, Status.border
                                                )}>
                                                    <Status.icon size={14} strokeWidth={3} className={Status.color.includes('gold') || Status.color.includes('cyber') ? "animate-pulse" : ""} />
                                                    {Status.label}
                                                </div>
                                            </td>
                                            <td className="px-10 py-10">
                                                <div className="flex flex-col">
                                                    <span className="text-[12px] font-black text-white italic tracking-tighter">
                                                        {new Date(order.created_at).toLocaleDateString('es-ES', {
                                                            day: '2-digit',
                                                            month: 'short',
                                                            year: 'numeric'
                                                        }).toUpperCase()}
                                                    </span>
                                                    <span className="text-[9px] text-white/20 font-black uppercase tracking-widest mt-1">SINC_ALPHA_TIME</span>
                                                </div>
                                            </td>
                                            <td className="px-10 py-10 text-right">
                                                <div className="flex flex-col items-end">
                                                    <span className="text-3xl font-black text-white tracking-tighter italic group-hover:cyber-glow transition-all">
                                                        {formatCurrency(order.total)}
                                                    </span>
                                                    <span className="text-[8px] font-black text-gold uppercase tracking-[0.4em] italic gold-shimmer">Paradox_Surcharge_OK</span>
                                                </div>
                                            </td>
                                            <td className="px-10 py-10">
                                                <div className="flex items-center justify-center gap-4">
                                                    <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white/20 hover:bg-white hover:text-black hover:border-white liquid-hover group-hover:shadow-paradox">
                                                        <Eye size={22} strokeWidth={1.5} />
                                                    </button>
                                                    <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white/20 hover:bg-gold hover:text-black hover:border-gold liquid-hover">
                                                        <MoreHorizontal size={22} strokeWidth={1.5} />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    );
                                })}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    className="border-t border-white/5"
                />

                {filteredOrders.length === 0 && (
                    <div className="py-40 flex flex-col items-center justify-center text-center space-y-10 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-white/5 rounded-full blur-3xl animate-pulse" />
                            <div className="relative w-24 h-24 rounded-[2rem] bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/5 group-hover:text-white/20 transition-colors">
                                <ShoppingBag size={48} strokeWidth={1} />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-3xl font-black uppercase tracking-tighter opacity-20 italic">Protocolo_Vacío.</h3>
                            <p className="text-[10px] uppercase font-black tracking-[0.4em] text-white/10 italic">No se han detectado despliegues con los parámetros de búsqueda actuales.</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-10">
                <div className="lg:col-span-8 p-12 rounded-[4rem] bg-obsidian border border-white/5 relative overflow-hidden group shadow-paradox">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 blur-[120px] animate-pulse -mr-32 -mt-32" />
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-gold/10 flex items-center justify-center text-gold">
                                    <Activity size={20} />
                                </div>
                                <span className="text-[10px] uppercase tracking-[0.5em] font-black text-gold italic">Monitorización_En_Vivo</span>
                            </div>
                            <h4 className="text-4xl font-black italic uppercase tracking-tighter text-white">Telemetría de despliegues <br /> coincidente con el nodo SSR.</h4>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-[9px] font-black uppercase tracking-[0.8em] text-white/10 italic mb-4">Estado // Nominal</span>
                            <div className="w-48 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <div className="w-[85%] h-full bg-gold shadow-gold-glow" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 p-12 rounded-[4rem] bg-white/[0.02] border border-white/5 flex flex-col justify-between group liquid-hover relative overflow-hidden">
                    <div className="relative z-10 space-y-2">
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 italic">Carga_Total_Periodo</span>
                        <div className="text-5xl font-black italic tracking-tighter text-white">{formatCurrency(displayOrders.reduce((a, c) => a + c.total, 0))}</div>
                    </div>
                    <div className="relative z-10 pt-8 mt-8 border-t border-white/5">
                        <button className="text-[10px] font-black uppercase tracking-[0.3em] text-gold hover:text-white transition-colors italic flex items-center gap-3">
                            Ver_Reporte_Anual <ChevronRight size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
