"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    index?: number;
}

export default function FeatureCard({ title, description, icon: Icon, index = 0 }: FeatureCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1]
            }}
            whileHover={{ scale: 1.02 }}
            className="group relative h-64 w-full"
        >
            {/* Glassmorphic Container */}
            <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:bg-white/[0.07] group-hover:border-white/20" />

            {/* Interactive Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Content */}
            <div className="relative h-full p-8 flex flex-col justify-end space-y-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-500">
                    <Icon size={24} strokeWidth={1.5} />
                </div>

                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white tracking-tight uppercase italic">{title}</h3>
                    <p className="text-sm text-zinc-400 font-medium leading-relaxed line-clamp-2">
                        {description}
                    </p>
                </div>

                {/* Cyberpunk accent line */}
                <div className="absolute top-0 right-0 w-16 h-1 w-0 bg-emerald-400 group-hover:w-full transition-all duration-700" />
            </div>
        </motion.div>
    );
}
