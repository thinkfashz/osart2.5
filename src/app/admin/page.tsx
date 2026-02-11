"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
    TrendingUp,
    Users,
    Package,
    ShoppingBag,
    ShieldCheck,
    Settings,
    Activity,
    Database,
    Zap,
    ArrowUpRight,
    Clock,
    Terminal
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { statsApi } from "@/lib/api-client";
import { formatCurrency } from "@/lib/utils";
import RecentOrders from "@/components/admin/RecentOrders";
import SupabaseConnectionPanel from "@/components/admin/SupabaseConnectionPanel";
import SecurityAuditor from "@/components/admin/SecurityAuditor";
import SystemConfig from "@/components/admin/SystemConfig";
import EventTerminal from "@/components/admin/EventTerminal";
import PaymentProvidersPanel from "@/components/admin/PaymentProvidersPanel";

export default function AdminDashboard() {
    const { data: statsData, isLoading } = useQuery({
        queryKey: ["admin-stats"],
        queryFn: () => statsApi.getDashboardStats(),
        refetchInterval: 30000, // Refresh every 30s
    });

    const metrics = [
        {
            label: "VENTAS_TOTALES",
            value: statsData ? formatCurrency(statsData.totalSales) : "---",
            increase: "REAL_TIME",
            icon: TrendingUp,
            color: "text-cyan-400"
        },
        {
            label: "USUARIOS_ACTIVOS",
            value: statsData ? statsData.activeUsers.toLocaleString() : "---",
            increase: "LIVE_DATA",
            icon: Users,
            color: "text-zinc-100"
        },
        {
            label: "INVENTARIO_SKU",
            value: statsData ? statsData.totalInventory.toLocaleString() : "---",
            increase: "SYST_STOCK",
            icon: Package,
            color: "text-orange-500"
        },
        {
            label: "PEDIDOS_COLA",
            value: statsData ? statsData.pendingOrders.toString() : "---",
            increase: "CRITICAL",
            icon: ShoppingBag,
            color: "text-cyber-red"
        },
    ];

    return (
        <div className="space-y-12 pb-20">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
                {metrics.map((stat, i) => (
                    <div
                        key={i}
                        className={cn(
                            "bg-zinc-900 border border-zinc-800 p-8 hover:bg-zinc-800 transition-colors group relative overflow-hidden",
                            isLoading && "animate-pulse"
                        )}
                    >
                        {isLoading && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                        )}
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-[10px] font-mono font-black tracking-[0.3em] text-zinc-500 uppercase">{stat.label}</span>
                            <stat.icon size={16} className={cn("transition-colors", stat.color)} />
                        </div>
                        <div className="flex items-end justify-between">
                            <div>
                                <div className={cn("text-4xl font-mono font-black tracking-tighter italic tabular-nums leading-none", stat.color)}>
                                    {stat.value}
                                </div>
                                <div className="mt-2 text-[10px] font-mono text-zinc-600 uppercase font-black tracking-widest">
                                    ESTADO: <span className="text-zinc-400">{stat.increase}</span>
                                </div>
                            </div>
                            <div className="w-10 h-[2px] bg-zinc-800 group-hover:bg-cyan-400 transition-colors" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                {/* Main section: Orders & Sales */}
                <div className="xl:col-span-8 space-y-10">
                    <div className="bg-zinc-900 border border-zinc-800 p-8 shadow-industrial">
                        <div className="flex items-center justify-between mb-10 pb-6 border-b border-zinc-800">
                            <div className="flex items-center gap-3">
                                <Zap size={20} className="text-orange-500" />
                                <h3 className="text-xl font-black uppercase italic tracking-tighter text-zinc-100 flex items-center gap-2">
                                    TRANSACCIONES_RECIENTES
                                    <span className="text-[10px] font-mono text-zinc-700 ml-4 font-normal tracking-normal uppercase italic">SYS_HEALTH: OK</span>
                                </h3>
                            </div>
                            <Link href="/admin/orders" className="industrial-button py-2 text-[10px]">VER_REGISTROS</Link>
                        </div>
                        <RecentOrders />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="industrial-panel p-8 group">
                            <div className="flex items-center gap-4 mb-8 border-b border-zinc-800 pb-4">
                                <div className="p-3 bg-zinc-950 border border-zinc-800 text-cyan-400">
                                    <ShieldCheck size={20} />
                                </div>
                                <h4 className="text-lg font-black uppercase italic tracking-tighter text-zinc-100">AUDITORÍA_SEGURIDAD</h4>
                            </div>
                            <SecurityAuditor />
                        </div>
                        <div className="industrial-panel p-8 group">
                            <div className="flex items-center gap-4 mb-8 border-b border-zinc-800 pb-4">
                                <div className="p-3 bg-zinc-950 border border-zinc-800 text-orange-500">
                                    <Settings size={20} />
                                </div>
                                <h4 className="text-lg font-black uppercase italic tracking-tighter text-zinc-100">CONFIG_NÚCLEO</h4>
                            </div>
                            <SystemConfig />
                        </div>
                    </div>
                </div>

                {/* Sidebar area: Infrastructure & Logs */}
                <div className="xl:col-span-4 space-y-10">
                    <SupabaseConnectionPanel />

                    <div className="bg-zinc-900 border border-zinc-800 p-8">
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800">
                            <div className="flex items-center gap-2">
                                <Terminal size={16} className="text-zinc-500" />
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 italic">OUTPUT_TERMINAL_V4</h3>
                            </div>
                            <div className="w-2 h-2 rounded-full bg-cyber-red animate-pulse" />
                        </div>
                        <EventTerminal />
                    </div>

                    <PaymentProvidersPanel />
                </div>
            </div>
        </div>
    );
}
