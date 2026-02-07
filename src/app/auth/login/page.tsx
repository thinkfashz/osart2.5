"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/lib/supabase";
import { authSchema, safeAction } from "@/lib/security";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Loader2, ArrowRight, Shield, Eye, EyeOff, CheckCircle2, Zap, Fingerprint, Chrome, Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type FormData = z.infer<typeof authSchema>;

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const router = useRouter();

    const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>({
        resolver: zodResolver(authSchema),
    });

    const emailValue = watch("email");
    const passwordValue = watch("password");

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        setError(null);
        if (!supabase) {
            setError("Sistema de autenticación no disponible.");
            setLoading(false);
            return;
        }

        const { error: securityError } = await safeAction(async () => {
            const { error: authError } = await supabase!.auth.signInWithPassword({
                email: data.email,
                password: data.password,
            });
            if (authError) throw authError;
            router.push("/");
        }, "Credenciales no válidas o sistema bajo mantenimiento de seguridad.");

        if (securityError) {
            setError(securityError);
            setLoading(false);
        }
    };

    const handleOAuth = async (provider: 'google' | 'github') => {
        if (!supabase) {
            setError("Autenticación social no disponible.");
            return;
        }
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider,
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });
            if (error) throw error;
        } catch (err) {
            setError("Error al inicializar autenticación social.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-ivory via-pearl to-silver relative overflow-hidden">
            {/* Tech Grid Background */}
            <div className="absolute inset-0 bg-tech-grid opacity-20" />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 via-transparent to-tech-green/5" />
            <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-electric-blue/10 to-transparent blur-3xl" />
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-tech-green/10 to-transparent blur-3xl" />

            {/* Security Badge - Top Right */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute top-8 right-8 z-10"
            >
                <div className="flex items-center gap-3 px-5 py-3 bg-white/80 backdrop-blur-xl rounded-2xl border border-graphite/10 shadow-subtle">
                    <Shield size={18} className="text-tech-green" />
                    <div className="text-left">
                        <p className="text-xs font-bold uppercase tracking-wide text-graphite">Acceso Seguro</p>
                        <p className="text-[10px] text-slate-deep/60 font-medium">Cifrado AES-256</p>
                    </div>
                </div>
            </motion.div>

            <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="w-full max-w-md"
                >
                    {/* Logo & Brand */}
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", damping: 15, stiffness: 200 }}
                            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-graphite to-midnight rounded-3xl mb-6 shadow-elevated"
                        >
                            <Zap size={40} className="text-electric-blue" strokeWidth={2.5} />
                        </motion.div>
                        <h1 className="text-5xl font-bold tracking-tight text-graphite mb-3 leading-[0.9]">
                            OSART
                        </h1>
                        <p className="text-sm font-semibold uppercase tracking-wider text-slate-deep/60">
                            Componentes Electrónicos Profesionales
                        </p>
                    </div>

                    {/* Main Card */}
                    <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-10 shadow-showroom border border-graphite/10">
                        {/* Header */}
                        <div className="mb-10">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-blue/10 border border-electric-blue/20 mb-6">
                                <Fingerprint size={14} className="text-electric-blue" />
                                <span className="text-xs font-bold uppercase tracking-wide text-electric-blue">
                                    Autenticación Segura
                                </span>
                            </div>
                            <h2 className="text-4xl font-bold tracking-tight text-graphite mb-3">
                                Bienvenido de Vuelta
                            </h2>
                            <p className="text-sm text-slate-deep/70 font-medium">
                                Accede a tu panel de gestión profesional
                            </p>
                        </div>

                        {/* Error Message */}
                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                    className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 flex items-center gap-3"
                                >
                                    <Shield size={16} className="text-red-500" />
                                    <p className="text-sm font-semibold text-red-700">{error}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Social Auth */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleOAuth('google')}
                                className="flex items-center justify-center gap-3 h-14 rounded-2xl bg-white border-2 border-graphite/10 hover:border-electric-blue/30 hover:shadow-subtle transition-all duration-300 group"
                            >
                                <Chrome size={18} className="text-slate-deep/60 group-hover:text-electric-blue transition-colors" />
                                <span className="text-sm font-semibold text-graphite">Google</span>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleOAuth('github')}
                                className="flex items-center justify-center gap-3 h-14 rounded-2xl bg-white border-2 border-graphite/10 hover:border-electric-blue/30 hover:shadow-subtle transition-all duration-300 group"
                            >
                                <Github size={18} className="text-slate-deep/60 group-hover:text-electric-blue transition-colors" />
                                <span className="text-sm font-semibold text-graphite">GitHub</span>
                            </motion.button>
                        </div>

                        {/* Divider */}
                        <div className="relative mb-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-graphite/10" />
                            </div>
                            <div className="relative flex justify-center">
                                <span className="px-4 bg-white text-xs font-semibold uppercase tracking-wide text-slate-deep/40">
                                    O continuar con email
                                </span>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Email Field */}
                            <div className="space-y-3">
                                <label className="text-sm font-bold uppercase tracking-wide text-slate-deep/60">
                                    Correo Electrónico
                                </label>
                                <div className="relative">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 z-10">
                                        <Mail size={20} className={cn(
                                            "transition-colors duration-300",
                                            focusedField === "email" ? "text-electric-blue" : "text-slate-deep/40"
                                        )} />
                                    </div>
                                    <input
                                        {...register("email")}
                                        type="email"
                                        onFocus={() => setFocusedField("email")}
                                        onBlur={() => setFocusedField(null)}
                                        placeholder="tu@email.com"
                                        className={cn(
                                            "w-full h-16 bg-pearl/50 border-2 rounded-2xl pl-14 pr-14 font-medium text-sm transition-all duration-300 outline-none",
                                            focusedField === "email"
                                                ? "border-electric-blue/50 bg-white shadow-lg ring-4 ring-electric-blue/10"
                                                : "border-graphite/10 hover:border-graphite/20",
                                            errors.email && "border-red-300 bg-red-50/50"
                                        )}
                                    />
                                    <AnimatePresence>
                                        {emailValue && !errors.email && (
                                            <motion.div
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0, opacity: 0 }}
                                                className="absolute right-5 top-1/2 -translate-y-1/2"
                                            >
                                                <CheckCircle2 size={20} className="text-tech-green" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                {errors.email && (
                                    <p className="text-xs text-red-500 font-semibold flex items-center gap-2">
                                        <span className="w-1 h-1 rounded-full bg-red-500" />
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div className="space-y-3">
                                <label className="text-sm font-bold uppercase tracking-wide text-slate-deep/60">
                                    Contraseña
                                </label>
                                <div className="relative">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 z-10">
                                        <Lock size={20} className={cn(
                                            "transition-colors duration-300",
                                            focusedField === "password" ? "text-electric-blue" : "text-slate-deep/40"
                                        )} />
                                    </div>
                                    <input
                                        {...register("password")}
                                        type={showPassword ? "text" : "password"}
                                        onFocus={() => setFocusedField("password")}
                                        onBlur={() => setFocusedField(null)}
                                        placeholder="••••••••"
                                        className={cn(
                                            "w-full h-16 bg-pearl/50 border-2 rounded-2xl pl-14 pr-14 font-medium text-sm transition-all duration-300 outline-none",
                                            focusedField === "password"
                                                ? "border-electric-blue/50 bg-white shadow-lg ring-4 ring-electric-blue/10"
                                                : "border-graphite/10 hover:border-graphite/20",
                                            errors.password && "border-red-300 bg-red-50/50"
                                        )}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-deep/40 hover:text-graphite transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-xs text-red-500 font-semibold flex items-center gap-2">
                                        <span className="w-1 h-1 rounded-full bg-red-500" />
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            {/* Forgot Password */}
                            <div className="flex justify-end">
                                <Link
                                    href="/auth/forgot-password"
                                    className="text-sm font-semibold text-electric-blue hover:text-electric-blue/80 transition-colors"
                                >
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={loading}
                                whileHover={{ scale: loading ? 1 : 1.02 }}
                                whileTap={{ scale: loading ? 1 : 0.98 }}
                                className="relative w-full h-16 bg-gradient-to-br from-graphite to-midnight text-white rounded-2xl font-bold uppercase tracking-wide text-sm shadow-elevated overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-3">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                        />
                                        <span>Verificando Acceso...</span>
                                    </div>
                                ) : (
                                    <>
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                                            animate={{
                                                x: ["-200%", "200%"]
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "linear"
                                            }}
                                        />
                                        <span className="relative z-10 flex items-center justify-center gap-3">
                                            Acceder al Sistema
                                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </>
                                )}
                            </motion.button>
                        </form>

                        {/* Divider */}
                        <div className="relative my-10">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-graphite/10" />
                            </div>
                            <div className="relative flex justify-center">
                                <span className="px-4 bg-white text-xs font-semibold uppercase tracking-wide text-slate-deep/40">
                                    ¿Nuevo usuario?
                                </span>
                            </div>
                        </div>

                        {/* Sign Up Link */}
                        <Link
                            href="/auth/signup"
                            className="block w-full h-16 bg-transparent border-2 border-graphite/20 hover:border-graphite/40 text-graphite rounded-2xl font-bold uppercase tracking-wide text-sm flex items-center justify-center gap-3 transition-all hover:shadow-subtle"
                        >
                            Crear Cuenta Profesional
                        </Link>
                    </div>

                    {/* Security Features */}
                    <div className="mt-10 grid grid-cols-3 gap-4">
                        {[
                            { icon: Shield, label: "Cifrado SSL" },
                            { icon: CheckCircle2, label: "ISO 27001" },
                            { icon: Fingerprint, label: "2FA Disponible" }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                                className="flex flex-col items-center gap-2 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-graphite/10"
                            >
                                <feature.icon size={20} className="text-tech-green" />
                                <span className="text-[10px] font-bold uppercase tracking-wide text-slate-deep/60 text-center">
                                    {feature.label}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Footer Note */}
                    <p className="text-center text-xs text-slate-deep/50 font-medium mt-8">
                        Al acceder, aceptas nuestros{" "}
                        <Link href="/terms" className="text-electric-blue hover:underline">
                            Términos de Servicio
                        </Link>{" "}
                        y{" "}
                        <Link href="/privacy" className="text-electric-blue hover:underline">
                            Política de Privacidad
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
