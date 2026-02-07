"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/lib/supabase";
import { authSchema, profileSchema, safeAction } from "@/lib/security";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Loader2, MoveRight, User, Mail, Lock, ArrowLeft, ShieldCheck, Cpu, Command } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const schema = z.object({
    name: profileSchema.shape.fullName,
    email: authSchema.shape.email,
    password: authSchema.shape.password,
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;

export default function SignupPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        setError(null);
        if (!supabase) {
            setError("Sistema de registro no disponible.");
            setLoading(false);
            return;
        }

        const { error: securityError } = await safeAction(async () => {
            const { data: authData, error: authError } = await supabase!.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    data: {
                        full_name: data.name,
                    }
                }
            });

            if (authError) throw authError;

            if (authData.user) {
                router.push("/auth/login?message=Verifica tu email");
            }
        }, "Error al crear cuenta técnica. El sistema de registro está bajo protección.");

        if (securityError) {
            setError(securityError);
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent selection:bg-gold/30 py-20">
            {/* Ambient Lighting */}
            <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[150px] -ml-64 -mt-64 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[150px] -mr-64 -mb-64 pointer-events-none" />

            <div className="container max-w-5xl px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="grid grid-cols-1 lg:grid-cols-5 bg-charcoal/40 backdrop-blur-xl border border-white/5 rounded-[4rem] overflow-hidden shadow-premium"
                >
                    {/* Left Panel: Registration Info */}
                    <div className="lg:col-span-2 bg-charcoal relative p-12 flex flex-col justify-between border-r border-white/5 overflow-hidden group">
                        <div className="absolute inset-0 bg-gold/5 opacity-10 group-hover:opacity-20 transition-opacity duration-1000" />

                        <div className="relative z-10">
                            <Link href="/" className="flex items-center gap-3 mb-16 group/logo">
                                <div className="w-10 h-10 rounded-xl bg-white/5 p-0.5 border border-white/10 group-hover/logo:rotate-12 transition-transform duration-700">
                                    <div className="h-24 px-10 bg-charcoal text-white rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-gold hover:text-black shadow-premium transition-all flex items-center justify-center gap-6 group/btn">
                                        <Command size={20} />
                                    </div>
                                </div>
                                <span className="text-2xl font-black italic tracking-tighter text-white">OSORT</span>
                            </Link>

                            <div className="space-y-6">
                                <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mb-8 rotate-3">
                                    <Cpu size={24} strokeWidth={1.5} className="animate-pulse" />
                                </div>
                                <h2 className="text-4xl font-black text-white leading-[1] tracking-tighter uppercase italic">
                                    Registro <br /> <span className="text-white/20">Industrial.</span>
                                </h2>
                                <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em] leading-relaxed italic">
                                    Únete a la red exclusiva de repuestos electrónicos OSORT. Acceso a componentes especializados.
                                </p>
                            </div>
                        </div>

                        <div className="relative z-10 pt-12 border-t border-white/5">
                            <Link
                                href="/auth/login"
                                className="group flex items-center gap-3 text-white/20 hover:text-white transition-colors text-[9px] font-black uppercase tracking-[0.3em] italic"
                            >
                                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                Volver_al_Sistema
                            </Link>
                        </div>
                    </div>

                    {/* Right Panel: Signup Form */}
                    <div className="lg:col-span-3 p-10 md:p-16 flex flex-col justify-center bg-white/[0.01]">
                        <div className="mb-12">
                            <h1 className="text-3xl font-black text-white uppercase tracking-tighter italic mb-4">Crear_Credencial</h1>
                            <div className="w-12 h-1 bg-gold rounded-full" />
                        </div>

                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="bg-gold/10 border border-gold/20 text-gold p-5 rounded-3xl text-[9px] font-black uppercase tracking-widest mb-10 flex items-center gap-4"
                                >
                                    <ShieldCheck size={18} />
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-4">
                                <label className="text-[9px] uppercase tracking-[0.4em] font-black text-white/20 ml-4 italic">Identificador_Personal</label>
                                <div className="relative group">
                                    <User className="absolute left-8 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold transition-colors" size={18} />
                                    <input
                                        {...register("name")}
                                        className="w-full h-16 bg-white/[0.02] border border-white/5 rounded-2xl pl-18 pr-6 font-black text-sm tracking-widest focus:border-gold/30 focus:bg-white/5 outline-none liquid-hover italic uppercase placeholder:text-white/5"
                                        placeholder="NOMBRE COMPLETO"
                                    />
                                </div>
                                {errors.name && <p className="text-[9px] text-gold font-black uppercase tracking-widest ml-4">{errors.name.message}</p>}
                            </div>

                            <div className="space-y-4">
                                <label className="text-[9px] uppercase tracking-[0.4em] font-black text-white/20 ml-4 italic">Canal_Comunicación</label>
                                <div className="relative group">
                                    <Mail className="absolute left-8 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold transition-colors" size={18} />
                                    <input
                                        {...register("email")}
                                        className="w-full h-16 bg-white/[0.02] border border-white/5 rounded-2xl pl-18 pr-6 font-black text-sm tracking-widest focus:border-gold/30 focus:bg-white/5 outline-none liquid-hover italic uppercase placeholder:text-white/5"
                                        placeholder="CORREO_ELECTRÓNICO"
                                    />
                                </div>
                                {errors.email && <p className="text-[9px] text-gold font-black uppercase tracking-widest ml-4">{errors.email.message}</p>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <label className="text-[9px] uppercase tracking-[0.4em] font-black text-white/20 ml-4 italic">Clave_Acceso</label>
                                    <div className="relative group">
                                        <Lock className="absolute left-8 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold transition-colors" size={18} />
                                        <input
                                            {...register("password")}
                                            type="password"
                                            className="w-full h-16 bg-white/[0.02] border border-white/5 rounded-2xl pl-18 pr-6 font-black text-sm tracking-widest focus:border-gold/30 focus:bg-white/5 outline-none liquid-hover italic uppercase placeholder:text-white/5"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                    {errors.password && <p className="text-[9px] text-gold font-black uppercase tracking-widest ml-4">{errors.password.message}</p>}
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[9px] uppercase tracking-[0.4em] font-black text-white/20 ml-4 italic">Validación</label>
                                    <div className="relative group">
                                        <Lock className="absolute left-8 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold transition-colors" size={18} />
                                        <input
                                            {...register("confirmPassword")}
                                            type="password"
                                            className="w-full h-16 bg-white/[0.02] border border-white/5 rounded-2xl pl-18 pr-6 font-black text-sm tracking-widest focus:border-gold/30 focus:bg-white/5 outline-none liquid-hover italic uppercase placeholder:text-white/5"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                    {errors.confirmPassword && <p className="text-[9px] text-gold font-black uppercase tracking-widest ml-4">{errors.confirmPassword.message}</p>}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full h-20 bg-charcoal text-white rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-4 transition-all hover:bg-gold hover:text-black shadow-premium mt-8"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : <>CREAR_CUENTA_INDUSTRIAL <ArrowRight size={18} /></>}
                            </button>
                        </form>

                        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                            <p className="text-[9px] uppercase tracking-[0.2em] font-black text-white/10 italic">
                                ¿Ya posee una credencial técnica?
                            </p>
                            <Link
                                href="/auth/login"
                                className="text-[10px] font-black uppercase tracking-[0.4em] text-white hover:text-gold liquid-hover italic"
                            >
                                Iniciar_Sesión
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
