"use client";

import { useEffect, useState, useCallback } from "react";
import {
    Plus,
    Calendar,
    Tag,
    Trash2,
    Power,
    Percent,
    DollarSign,
    CheckCircle2,
    Clock
} from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { getPromotions, togglePromotionStatus, deletePromotion } from "@/app/actions/promotionActions";
import { Promotion } from "@/types";
import Pagination from "@/components/ui/Pagination";
export default function AdminPromotionsPage() {
    const [promotions, setPromotions] = useState<Promotion[]>([]);
    const [loading, setLoading] = useState(true);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const loadPromotions = useCallback(async () => {
        setLoading(true);
        const data = await getPromotions();
        setPromotions(data);
        setLoading(false);
    }, []);

    useEffect(() => {
        loadPromotions();
    }, [loadPromotions]);

    const handleToggle = async (id: string, currentStatus: boolean) => {
        await togglePromotionStatus(id, !currentStatus);
        setPromotions(prev => prev.map(p => p.id === id ? { ...p, is_active: !currentStatus } : p));
    };

    const handleDelete = async (id: string) => {
        if (confirm("¿Eliminar esta promoción permanentemente?")) {
            await deletePromotion(id);
            setPromotions(prev => prev.filter(p => p.id !== id));
        }
    };

    const totalPages = Math.ceil(promotions.length / itemsPerPage);
    const paginatedPromotions = promotions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-6xl font-black tracking-tighter uppercase italic text-white">Promociones</h1>
                    <p className="text-slate-deep/40 font-bold text-sm uppercase tracking-[0.3em] mt-2">Gestión de Descuentos y Campañas / Marketing Hub</p>
                </div>
                <button className="arobix-button bg-electric-blue text-white border-electric-blue flex items-center gap-3">
                    <Plus size={20} strokeWidth={3} />
                    NUEVA CAMPAÑA
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full p-20 text-center font-black uppercase tracking-widest text-white/40 animate-pulse bg-white/5 rounded-[3rem] border border-white/10">Iniciando Servidores de Marketing...</div>
                ) : promotions.length === 0 ? (
                    <div className="col-span-full p-20 text-center font-black uppercase tracking-widest text-white/40 bg-white/5 rounded-[3rem] border border-white/10">No hay campañas activas actualmente.</div>
                ) : paginatedPromotions.map((promo) => (
                    <div key={promo.id} className={cn(
                        "group bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-6 luxury-transition relative overflow-hidden",
                        !promo.is_active && "opacity-60 grayscale"
                    )}>
                        {/* Background Decor */}
                        <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:text-electric-blue/10 transition-colors">
                            {promo.type === 'percentage' ? <Percent size={120} /> : <DollarSign size={120} />}
                        </div>

                        <div className="flex items-start justify-between relative">
                            <div className="space-y-1">
                                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-electric-blue">Campaña Activa</div>
                                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">{promo.name}</h3>
                            </div>
                            <button
                                onClick={() => handleToggle(promo.id, promo.is_active)}
                                className={cn(
                                    "w-12 h-12 rounded-full flex items-center justify-center luxury-transition border",
                                    promo.is_active ? "border-tech-green/50 text-tech-green bg-tech-green/10" : "border-white/10 text-white/40 hover:text-white"
                                )}
                            >
                                <Power size={20} />
                            </button>
                        </div>

                        <div className="space-y-4 relative">
                            <p className="text-xs text-slate-deep/60 font-medium leading-relaxed">{promo.description || "Sin descripción proporcionada."}</p>

                            <div className="flex items-center gap-2">
                                <span className="text-4xl font-black tracking-tighter text-white">
                                    {promo.type === 'percentage' ? `${promo.value}%` : formatCurrency(promo.value)}
                                </span>
                                <span className="text-[10px] uppercase font-black text-slate-deep/40 tracking-widest mt-2">{promo.type === 'percentage' ? 'De Descuento' : 'De Rebaja'}</span>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/10 flex items-center justify-between text-white relative">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                                    <Calendar size={14} className="text-electric-blue" />
                                    {promo.start_date ? new Date(promo.start_date).toLocaleDateString() : 'N/A'}
                                </div>
                                <div className="w-1 h-1 rounded-full bg-white/10" />
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-deep/40">
                                    <Clock size={14} />
                                    {promo.end_date ? new Date(promo.end_date).toLocaleDateString() : 'Forever'}
                                </div>
                            </div>
                            <button
                                onClick={() => handleDelete(promo.id)}
                                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-500/10 text-red-400 luxury-transition"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>

                        {promo.code && (
                            <div className="absolute top-8 right-24 bg-electric-blue text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-xl shadow-electric-blue/20">
                                COD: {promo.code}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    className="pt-12"
                />
            )}
        </div>
    );
}
