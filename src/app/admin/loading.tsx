"use client";

import { motion } from "framer-motion";
import { Cpu } from "lucide-react";

export default function AdminLoading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
            <div className="relative w-24 h-24">
                <motion.div
                    animate={{
                        rotate: 360,
                        borderRadius: ["25%", "50%", "25%"],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute inset-0 border-2 border-white/10"
                />
                <motion.div
                    animate={{
                        rotate: -360,
                        borderRadius: ["50%", "25%", "50%"],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute inset-2 border-2 border-electric-blue/30"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Cpu size={32} className="text-white/20 animate-pulse" />
                </div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-[0.8em] text-white/40 italic animate-pulse">
                    Sincronizando_Núcleo
                </span>
                <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="w-full h-full bg-vibrant-gradient"
                    />
                </div>
            </div>
        </div>
    );
}
