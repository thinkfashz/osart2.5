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
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
            }}
            className="group relative h-72 w-full"
        >
            {/* Industrial Container */}
            <div className="absolute inset-0 bg-zinc-900 border border-zinc-800 transition-all duration-300 group-hover:border-cyan-400 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]" />

            {/* Interactive Scanner Line */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

            {/* Content */}
            <div className="relative h-full p-10 flex flex-col justify-end space-y-6">
                <div className="w-12 h-12 bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover:text-cyan-400 group-hover:bg-zinc-900 group-hover:border-cyan-400/50 transition-all duration-300">
                    <Icon size={20} strokeWidth={2.5} />
                </div>

                <div className="space-y-3">
                    <h3 className="text-xl font-black text-zinc-100 tracking-tighter uppercase">{title}</h3>
                    <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-tight leading-relaxed line-clamp-3">
                        {description}
                    </p>
                </div>

                {/* Tech Code Ornament */}
                <div className="absolute top-6 right-6 text-[8px] font-black text-zinc-800 uppercase tracking-widest select-none">
                    MOD_PRC_{index + 10}
                </div>
            </div>
        </motion.div>
    );
}
