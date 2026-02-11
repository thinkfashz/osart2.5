"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { profilesApi, UserProfile, ProfileStats } from "@/lib/api-client";
import { formatCurrency } from "@/lib/utils";
import ImageUpload from "@/components/ui/ImageUpload";
import {
    User,
    Mail,
    Shield,
    Calendar,
    Zap,
    Backpack,
    Trophy,
    Navigation,
    Loader2,
    CheckCircle2,
    History,
    Package,
    ArrowUpRight
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
    const queryClient = useQueryClient();
    const [isEditing, setIsEditing] = useState(false);

    const { data: profile, isLoading: profileLoading } = useQuery({
        queryKey: ["profile-me"],
        queryFn: () => profilesApi.getMe(),
    });

    const { data: stats, isLoading: statsLoading } = useQuery({
        queryKey: ["profile-stats"],
        queryFn: () => profilesApi.getStats(),
    });

    const updateProfileMutation = useMutation({
        mutationFn: (data: { fullName?: string; avatarUrl?: string }) => profilesApi.update(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile-me"] });
            setIsEditing(false);
        },
    });

    if (profileLoading || statsLoading) {
        return (
            <div className="flex h-[80vh] items-center justify-center">
                <Loader2 className="animate-spin text-cyan-400" size={40} />
            </div>
        );
    }

    if (!profile) return null;

    // XP Progress Calculation (simple level logic)
    const level = Math.floor(profile.knowledgePoints / 1000) + 1;
    const currentLevelXP = profile.knowledgePoints % 1000;
    const xpPercentage = (currentLevelXP / 1000) * 100;

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
            {/* Header: Identity & XP */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-1">
                <div className="lg:col-span-4 bg-zinc-900 border border-zinc-800 p-10 flex flex-col items-center text-center">
                    <div className="relative mb-8 pt-2">
                        <div className="absolute inset-0 bg-cyan-400/20 blur-3xl rounded-full" />
                        <div className="relative w-40 h-40 rounded-full border-2 border-zinc-800 overflow-hidden bg-zinc-950 industrial-panel">
                            <ImageUpload
                                currentImageUrl={profile.avatarUrl || undefined}
                                onUploadSuccess={(url) => updateProfileMutation.mutate({ avatarUrl: url })}
                                bucket="avatars"
                                folder="users"
                                className="w-full h-full"
                            />
                        </div>
                        <div className="absolute -bottom-2 right-2 bg-zinc-900 border border-zinc-800 p-2 rounded-xl text-cyan-400">
                            <Shield size={20} />
                        </div>
                    </div>

                    <h1 className="text-3xl font-black italic tracking-tighter uppercase text-zinc-100 flex items-center gap-3">
                        {profile.fullName || "AGENT_UNNAMED"}
                    </h1>
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em] font-black mt-2">
                        STATUS: <span className="text-cyan-400">{profile.role.toUpperCase()}</span>
                    </p>

                    <div className="w-full mt-10 grid grid-cols-2 gap-4">
                        <div className="bg-zinc-950 border border-zinc-800 p-4">
                            <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-1">NIVEL</div>
                            <div className="text-2xl font-black italic text-zinc-100">{level}</div>
                        </div>
                        <div className="bg-zinc-950 border border-zinc-800 p-4">
                            <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-1">PUNTOS</div>
                            <div className="text-2xl font-black italic text-cyan-400">{profile.knowledgePoints}</div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-8 bg-zinc-900 border border-zinc-800 p-10 flex flex-col justify-center">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-xl font-black italic tracking-tighter uppercase text-zinc-100 mb-1">PROGRESO_DE_CONOCIMIENTO</h2>
                            <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Siguiente Nivel: {level + 1}</p>
                        </div>
                        <Zap size={24} className="text-orange-500 animate-pulse" />
                    </div>

                    <div className="space-y-4">
                        <div className="h-10 w-full bg-zinc-950 border border-zinc-800 p-1 relative overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${xpPercentage}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 relative"
                            >
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                            </motion.div>
                        </div>
                        <div className="flex justify-between text-[10px] font-mono text-zinc-500 font-black tracking-widest">
                            <span>{currentLevelXP} XP</span>
                            <span>1000 XP</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                        <div className="p-6 bg-zinc-950 border border-zinc-800 hover:border-cyan-400/30 transition-colors group">
                            <Trophy className="text-zinc-700 group-hover:text-cyan-400 mb-4 transition-colors" size={24} />
                            <h4 className="text-[10px] font-black uppercase text-zinc-100 tracking-[0.2em] mb-2">MISIONES_COMPLETADAS</h4>
                            <div className="text-3xl font-mono font-black italic tabular-nums text-zinc-800 group-hover:text-zinc-100 transition-colors">
                                {stats?.totalOrders || 0}
                            </div>
                        </div>
                        <div className="p-6 bg-zinc-950 border border-zinc-800 hover:border-orange-400/30 transition-colors group">
                            <Backpack className="text-zinc-700 group-hover:text-orange-500 mb-4 transition-colors" size={24} />
                            <h4 className="text-[10px] font-black uppercase text-zinc-100 tracking-[0.2em] mb-2">CRÉDITOS_INVERTIDOS</h4>
                            <div className="text-3xl font-mono font-black italic tabular-nums text-zinc-800 group-hover:text-zinc-100 transition-colors">
                                {formatCurrency(stats?.totalSpent || 0)}
                            </div>
                        </div>
                        <div className="p-6 bg-zinc-950 border border-zinc-800 hover:border-tech-green/30 transition-colors group">
                            <Navigation className="text-zinc-700 group-hover:text-tech-green mb-4 transition-colors" size={24} />
                            <h4 className="text-[10px] font-black uppercase text-zinc-100 tracking-[0.2em] mb-2">REPUTACIÓN_SISTEMA</h4>
                            <div className="text-3xl font-mono font-black italic tabular-nums text-zinc-800 group-hover:text-zinc-100 transition-colors">
                                {profile.role === 'admin' ? 'MAX' : 'STD'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom: Logs & History */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                <div className="xl:col-span-8 space-y-8">
                    <div className="bg-zinc-900 border border-zinc-800 p-8 shadow-industrial">
                        <div className="flex items-center gap-3 mb-10 pb-6 border-b border-zinc-800">
                            <History size={20} className="text-cyan-400" />
                            <h3 className="text-xl font-black uppercase italic tracking-tighter text-zinc-100">LOG_DE_OPERACIONES_REC_V4</h3>
                        </div>

                        <div className="space-y-4">
                            {profile.orders?.length === 0 ? (
                                <div className="text-center py-20 bg-zinc-950/50 border border-dashed border-zinc-800">
                                    <Package size={40} className="mx-auto text-zinc-800 mb-4" />
                                    <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest font-black">NINGUNA_TRANSACCIÓN_DETECTADA</p>
                                </div>
                            ) : (
                                profile.orders?.map((order) => (
                                    <div key={order.id} className="bg-zinc-950 border border-zinc-800 p-6 flex flex-col md:flex-row md:items-center justify-between group hover:bg-zinc-900 transition-colors">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-3">
                                                <span className="text-[10px] font-mono text-cyan-400 font-black tracking-widest uppercase">ID_{order.id.slice(0, 8)}</span>
                                                <span className={cn(
                                                    "text-[8px] px-2 py-0.5 font-black uppercase tracking-widest inline-flex items-center gap-1",
                                                    order.status === 'paid' ? "bg-tech-green/10 text-tech-green border border-tech-green/20" : "bg-cyber-red/10 text-cyber-red border border-cyber-red/20"
                                                )}>
                                                    {order.status}
                                                </span>
                                            </div>
                                            <p className="text-xs font-mono text-zinc-500">{new Date(order.createdAt).toLocaleDateString()} INTERFACE_CALL_V2</p>
                                        </div>
                                        <div className="mt-4 md:mt-0 flex items-center gap-6">
                                            <div className="text-right">
                                                <div className="text-lg font-black italic tabular-nums text-zinc-100">{formatCurrency(Number(order.total))}</div>
                                                <div className="text-[8px] font-mono text-zinc-700 uppercase">VALUE_DEBIT</div>
                                            </div>
                                            <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:bg-cyan-400/10 transition-colors">
                                                <ArrowUpRight size={16} className="text-zinc-700 group-hover:text-cyan-400 transition-colors" />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                <div className="xl:col-span-4 bg-zinc-900 border border-zinc-800 p-8 space-y-10">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                            <Calendar size={18} className="text-zinc-500" />
                            <h4 className="text-[10px] font-black uppercase text-zinc-100 tracking-[0.2em]">DATOS_DE_VINCULACIÓN</h4>
                        </div>
                        <div className="space-y-6">
                            <div className="p-4 bg-zinc-950 border border-zinc-800 flex items-center gap-4">
                                <Mail size={16} className="text-zinc-600" />
                                <div>
                                    <div className="text-[8px] font-mono text-zinc-700 uppercase tracking-widest mb-1">EMAIL_VINCULADO</div>
                                    <div className="text-[10px] font-black text-zinc-300">{profile.email}</div>
                                </div>
                            </div>
                            <div className="p-4 bg-zinc-950 border border-zinc-800 flex items-center gap-4">
                                <Calendar size={16} className="text-zinc-600" />
                                <div>
                                    <div className="text-[8px] font-mono text-zinc-700 uppercase tracking-widest mb-1">MEMBER_SINCE</div>
                                    <div className="text-[10px] font-black text-zinc-300">{new Date(profile.createdAt).toLocaleDateString()}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-cyan-900/10 to-transparent border border-cyan-400/20 rounded-3xl relative overflow-hidden group">
                        <Zap className="absolute -right-4 -bottom-4 text-cyan-400 opacity-5 group-hover:scale-150 transition-transform duration-1000" size={120} />
                        <h4 className="text-xs font-black uppercase italic text-cyan-400 tracking-tighter mb-4">SISTEMA_LEVEL_UP</h4>
                        <p className="text-[10px] text-zinc-500 leading-relaxed font-mono uppercase mb-6">
                            Adquiere nuevos Blueprints y transacciones para incrementar tus Knowledge Points. Cada 1000 XP desbloqueas un nuevo nivel de acceso.
                        </p>
                        <button className="industrial-button w-full py-3 text-[10px] group-hover:bg-cyan-400 group-hover:text-zinc-950 transition-colors">EXPLORAR_CATÁLOGO</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
