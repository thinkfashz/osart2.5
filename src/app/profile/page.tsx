"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
    Shield,
    Trophy,
    Activity,
    Award,
    Brain,
    ChevronRight,
    Zap,
    Cpu
} from "lucide-react";
import { motion } from "framer-motion";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { safeAction } from "@/lib/security";

export default function ProfilePage() {
    const [user, setUser] = useState<SupabaseUser | null>(null);
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            if (user) {
                const { data, error } = await safeAction(async () => {
                    const { data, error } = await supabase
                        .from("profiles")
                        .select("*")
                        .eq("id", user.id)
                        .single();
                    if (error) throw error;
                    return data;
                }, "Error al cargar perfil.");

                if (error) setError(error);
                setProfile(data);
            }
            setLoading(false);
        };

        getUser();
    }, []);

    if (loading) return (
        <div className="min-h-screen bg-pearl flex items-center justify-center p-6">
            <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-graphite rounded-2xl flex items-center justify-center mx-auto text-electric-blue animate-pulse shadow-subtle">
                    <Shield size={40} />
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-graphite">Cargando Perfil...</h1>
            </div>
        </div>
    );

    if (!user) return (
        <div className="min-h-screen bg-pearl flex items-center justify-center p-6">
            <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-graphite rounded-2xl flex items-center justify-center mx-auto text-electric-blue shadow-subtle">
                    <Shield size={40} />
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-graphite">Acceso Restringido</h1>
                <p className="text-sm font-medium text-slate-deep/60 max-w-xs mx-auto">Debes iniciar sesión para acceder a tu perfil.</p>
            </div>
        </div>
    );

    const xp = profile?.xp || 0;
    const progress = (xp % 1000) / 10;
    const rank = profile?.role === 'admin' ? "Administrador" : xp > 5000 ? "Maestro" : xp > 2000 ? "Especialista" : "Ingeniero";

    return (
        <div className="bg-pearl text-graphite min-h-screen pt-32 pb-32 selection:bg-electric-blue/30">
            <div className="container mx-auto px-6 max-w-6xl">

                {/* Profile Header Card */}
                <div className="bg-gradient-to-br from-graphite to-midnight text-white rounded-3xl p-12 md:p-16 relative overflow-hidden shadow-showroom">
                    <div className="absolute inset-0 bg-tech-grid opacity-5" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                        {/* Avatar & Rank */}
                        <div className="relative">
                            <div className="w-48 h-48 rounded-3xl overflow-hidden border-4 border-electric-blue relative p-1.5 bg-midnight">
                                <img
                                    src={user.user_metadata?.avatar_url || "https://ui-avatars.com/api/?name=" + (user.user_metadata?.full_name || user.email)}
                                    className="w-full h-full rounded-2xl object-cover"
                                    alt={user.user_metadata?.full_name || ""}
                                />
                            </div>
                            <div className="absolute -bottom-4 right-0 left-0 flex justify-center">
                                <span className="bg-electric-blue text-white text-xs font-bold uppercase tracking-wide px-6 py-2 rounded-full border-4 border-midnight shadow-elevated">
                                    {rank}
                                </span>
                            </div>
                        </div>

                        {/* Info & Stats */}
                        <div className="flex-1 space-y-8 text-center md:text-left">
                            <div>
                                <h1 className="text-5xl md:text-7xl font-bold tracking-tight uppercase leading-none">{user.user_metadata?.full_name || user.email?.split('@')[0]}</h1>
                                <p className="text-electric-blue uppercase tracking-wide text-sm font-semibold mt-4">{user.email}</p>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="space-y-1">
                                    <div className="text-3xl font-bold tracking-tight">{xp}<span className="text-electric-blue ml-1 text-sm">XP</span></div>
                                    <div className="text-xs uppercase tracking-wide font-semibold text-white/60">Experiencia</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-3xl font-bold tracking-tight">12</div>
                                    <div className="text-xs uppercase tracking-wide font-semibold text-white/60">Módulos</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-3xl font-bold tracking-tight">#41</div>
                                    <div className="text-xs uppercase tracking-wide font-semibold text-white/60">Ranking</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-3xl font-bold tracking-tight">TOP 5%</div>
                                    <div className="text-xs uppercase tracking-wide font-semibold text-white/60">Continuidad</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">

                    {/* Progression Column */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Mastery Progress */}
                        <div className="bg-white border border-graphite/10 rounded-3xl p-12 space-y-8 shadow-subtle">
                            <div className="flex items-center justify-between">
                                <h3 className="text-2xl font-bold uppercase tracking-tight flex items-center gap-3">
                                    <Brain size={24} className="text-electric-blue" /> Progreso de Maestría
                                </h3>
                                <div className="text-sm font-semibold uppercase tracking-wide text-slate-deep/60">Nivel 4 / 500 XP</div>
                            </div>
                            <div className="space-y-4">
                                <div className="h-4 bg-graphite/10 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className="h-full bg-electric-blue relative"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 animate-pulse" />
                                    </motion.div>
                                </div>
                                <div className="flex justify-between text-xs font-semibold uppercase tracking-wide text-slate-deep/60">
                                    <span>Junior</span>
                                    <span>Especialista</span>
                                    <span>Maestro</span>
                                </div>
                            </div>
                        </div>

                        {/* Recent Achievements */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold uppercase tracking-tight">Logros Recientes</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { icon: Award, title: "Primer Nivel", desc: "Completó el Nivel 1 de la Academia", date: "Hace 2 días" },
                                    { icon: Activity, title: "Persistencia", desc: "7 días de actividad consecutiva", date: "Ayer" },
                                ].map((achievement, i) => (
                                    <div key={i} className="bg-white rounded-2xl p-6 border border-graphite/10 flex items-center gap-4 group hover:border-electric-blue/30 transition-all duration-300 shadow-subtle">
                                        <div className="w-12 h-12 rounded-xl bg-graphite flex items-center justify-center text-electric-blue group-hover:scale-110 transition-transform">
                                            <achievement.icon size={24} />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold uppercase tracking-wide text-graphite">{achievement.title}</div>
                                            <div className="text-xs font-medium text-slate-deep/60">{achievement.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar: Activity & Tools */}
                    <div className="space-y-8">
                        <div className="bg-white border border-graphite/10 rounded-3xl p-10 space-y-8 shadow-subtle">
                            <h3 className="text-2xl font-bold uppercase tracking-tight">Herramientas</h3>
                            <div className="space-y-4">
                                <button className="w-full h-14 bg-graphite text-white rounded-xl flex items-center justify-between px-6 hover:bg-electric-blue transition-all duration-300">
                                    <span className="text-sm uppercase font-semibold tracking-wide">Documentación</span>
                                    <ChevronRight size={16} />
                                </button>
                                <button className="w-full h-14 bg-graphite/5 rounded-xl flex items-center justify-between px-6 hover:bg-graphite hover:text-white transition-all duration-300">
                                    <span className="text-sm uppercase font-semibold tracking-wide">Certificados</span>
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-graphite to-midnight rounded-3xl p-10 text-white space-y-6 relative overflow-hidden shadow-subtle">
                            <div className="absolute inset-0 bg-tech-grid opacity-5" />
                            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-electric-blue relative z-10">
                                <Zap size={24} />
                            </div>
                            <h4 className="text-2xl font-bold tracking-tight uppercase leading-none relative z-10">Próximo Desafío:<br />Simulación</h4>
                            <p className="text-sm font-medium uppercase tracking-wide opacity-80 relative z-10">Gana +200 XP resolviendo el simulador de módulos críticos.</p>
                            <button className="w-full h-12 bg-white text-graphite rounded-full text-sm font-bold uppercase tracking-wide hover:bg-electric-blue hover:text-white transition-all duration-300 relative z-10">
                                Iniciar Protocolo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
