"use client";

import { motion } from "framer-motion";

export default function CelestialHeader() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
        >
            <div className="w-12 h-px bg-celeste" />
            <span className="text-[10px] uppercase tracking-[1em] font-black text-celeste cyan-shimmer">Protocolo_Celestial_2026</span>
        </motion.div>
    );
}
