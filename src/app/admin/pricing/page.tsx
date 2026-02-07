"use client";

import { useEffect, useState, useCallback } from "react";
import {
    Plus,
    Settings2,
    Zap,
    TrendingDown,
    TrendingUp,
    ListFilter,
    Save,
    Trash2,
    CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getPricingRules, togglePricingRule, deletePricingRule } from "@/app/actions/pricingActions";
import { PricingRule } from "@/types";
import Pagination from "@/components/ui/Pagination";
export default function AdminPricingPage() {
    const [rules, setRules] = useState<PricingRule[]>([]);
    const [loading, setLoading] = useState(true);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const loadRules = useCallback(async () => {
        setLoading(true);
        const data = await getPricingRules();
        setRules(data);
        setLoading(false);
    }, []);

    useEffect(() => {
        loadRules();
    }, [loadRules]);

    const handleToggle = async (id: string, currentStatus: boolean) => {
        await togglePricingRule(id, !currentStatus);
        setRules(prev => prev.map(r => r.id === id ? { ...r, is_active: !currentStatus } : r));
    };

    const handleDelete = async (id: string) => {
        if (confirm("¿Eliminar esta regla de precios? Esto puede afectar el cálculo de precios en tiempo real.")) {
            await deletePricingRule(id);
            setRules(prev => prev.filter(r => r.id !== id));
        }
    };

    const totalPages = Math.ceil(rules.length / itemsPerPage);
    const paginatedRules = rules.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-6xl font-black tracking-tighter uppercase italic text-white text-glow-accent">Motor de Precios</h1>
                    <p className="text-slate-deep/40 font-bold text-sm uppercase tracking-[0.3em] mt-2">Configuración de Lógica Dinámica / Algoritmos de Venta</p>
                </div>
                <button className="arobix-button bg-electric-blue text-white border-electric-blue flex items-center gap-3">
                    <Plus size={20} strokeWidth={3} />
                    NUEVA REGLA
                </button>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {loading ? (
                    <div className="p-20 text-center font-black uppercase tracking-widest text-white/40 animate-pulse bg-white/5 rounded-[3rem] border border-white/10">Sincronizando Motor de Precios...</div>
                ) : rules.length === 0 ? (
                    <div className="p-20 text-center font-black uppercase tracking-widest text-white/40 bg-white/5 rounded-[3rem] border border-white/10 flex flex-col items-center gap-4">
                        <Settings2 size={48} className="text-white/10" />
                        No hay reglas de precios configuradas. El sistema usará precios base.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {paginatedRules.map((rule) => (
                            <div key={rule.id} className={cn(
                                "group bg-white/5 border border-white/10 rounded-[2.5rem] p-8 luxury-transition flex items-center justify-between",
                                !rule.is_active && "opacity-60 grayscale"
                            )}>
                                <div className="flex items-center gap-8">
                                    <div className={cn(
                                        "w-16 h-16 rounded-3xl flex items-center justify-center border luxury-transition",
                                        rule.rule_type === 'discount' ? "border-red-500/30 text-red-500 bg-red-500/10" :
                                            rule.rule_type === 'bulk' ? "border-electric-blue/30 text-electric-blue bg-electric-blue/10" :
                                                "border-tech-green/30 text-tech-green bg-tech-green/10"
                                    )}>
                                        {rule.rule_type === 'discount' ? <TrendingDown size={28} /> :
                                            rule.rule_type === 'bulk' ? <Zap size={28} /> :
                                                <TrendingUp size={28} />}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">{rule.name}</h3>
                                            <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-white/10 rounded tracking-widest">Prio: {rule.priority}</span>
                                        </div>
                                        <div className="text-xs text-slate-deep/60 font-medium mt-1 flex items-center gap-4">
                                            <span className="uppercase tracking-widest font-black text-electric-blue">{rule.rule_type}</span>
                                            <div className="w-1 h-1 rounded-full bg-white/10" />
                                            <span>Config: {JSON.stringify(rule.configuration)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <div className={cn(
                                            "w-2 h-2 rounded-full",
                                            rule.is_active ? "bg-tech-green shadow-[0_0_10px_rgba(34,197,94,0.5)]" : "bg-white/20"
                                        )} />
                                        <span className="text-[10px] uppercase font-black tracking-widest text-slate-deep/40">{rule.is_active ? 'Activo' : 'Inactivo'}</span>
                                    </div>

                                    <div className="h-10 w-[1px] bg-white/10 mx-2" />

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleToggle(rule.id, rule.is_active)}
                                            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 luxury-transition text-white"
                                        >
                                            <Settings2 size={20} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(rule.id)}
                                            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-red-500/10 text-red-500 luxury-transition"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    className="pt-8"
                />
            )}

            {/* Quick Stats / Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-electric-blue/5 border border-electric-blue/20 rounded-[2rem] p-6 space-y-2">
                    <div className="text-[10px] font-black uppercase tracking-widest text-electric-blue">Lógica de Cascada</div>
                    <p className="text-[10px] text-slate-deep/40 leading-relaxed font-bold">Las reglas se aplican en orden de prioridad. Las promociones se aplican después de las reglas de motor.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 space-y-2">
                    <div className="text-[10px] font-black uppercase tracking-widest text-white">Reglas Bulk</div>
                    <p className="text-[10px] text-slate-deep/40 leading-relaxed font-bold">Ideales para mayoristas. Configura descuentos automáticos basados en la cantidad del carrito.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 space-y-2">
                    <div className="text-[10px] font-black uppercase tracking-widest text-white">Seguridad de Margen</div>
                    <p className="text-[10px] text-slate-deep/40 leading-relaxed font-bold">El motor de precios previene que el precio final caiga por debajo de cero, pero verifique sus reglas.</p>
                </div>
            </div>
        </div>
    );
}
