"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, LogIn, Github, Mail, ShieldCheck, Lock, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

export default function AuthModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    if (!isOpen) return null;

    const handleGoogleSignIn = async () => {
        if (!supabase) return;
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin
            }
        });
        if (error) console.error("Error signing in with Google:", error.message);
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-[450px] bg-black border border-white/10 rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(230,0,0,0.15)]"
                >
                    {/* Visual Decor */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-accent/20">
                        <motion.div
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="w-1/3 h-full bg-accent shadow-[0_0_15px_#e60000]"
                        />
                    </div>

                    <div className="p-10 space-y-8">
                        {/* Header */}
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-accent">
                                <Lock size={32} />
                            </div>
                            <div>
                                <h2 className="text-3xl font-black tracking-tighter uppercase italic">Protocolo de Acceso</h2>
                                <p className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40 mt-2">Identificación de Personal Osart Elite</p>
                            </div>
                        </div>

                        {/* Social Login Section */}
                        <div className="space-y-4">
                            <button
                                onClick={handleGoogleSignIn}
                                className="w-full h-16 bg-white text-black rounded-2xl flex items-center justify-center gap-4 hover:scale-[1.02] luxury-transition font-black uppercase tracking-widest text-xs"
                            >
                                <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-6 h-6" alt="Google" />
                                Acceder con Google
                            </button>
                            <button
                                className="w-full h-16 bg-white/5 border border-white/10 text-white rounded-2xl flex items-center justify-center gap-4 hover:bg-white/10 luxury-transition font-black uppercase tracking-widest text-xs opacity-50"
                                disabled
                            >
                                <img src="https://www.svgrepo.com/show/330401/facebook.svg" className="w-6 h-6 border-white bg-white rounded-full p-1" alt="Facebook" />
                                Facebook (Próximamente)
                            </button>
                        </div>

                        {/* Separator */}
                        <div className="flex items-center gap-4 opacity-10">
                            <div className="h-[1px] flex-1 bg-white" />
                            <span className="text-[8px] font-black uppercase">Seguridad Cifrada</span>
                            <div className="h-[1px] flex-1 bg-white" />
                        </div>

                        {/* Legal/Info */}
                        <div className="text-center">
                            <p className="text-[9px] uppercase tracking-[0.1em] font-bold text-white/30 leading-relaxed">
                                Al iniciar sesión, confirmas tu adherencia a los protocolos de seguridad industrial y los términos de hardware soberano.
                            </p>
                        </div>

                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 text-white/20 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Footer Visual */}
                    <div className="bg-white/5 p-4 flex items-center justify-center gap-3">
                        <ShieldCheck size={14} className="text-accent" />
                        <span className="text-[8px] uppercase font-black text-white/40 tracking-[0.2em]">Cifrado AES-256 Activo</span>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
