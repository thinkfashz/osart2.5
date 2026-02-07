"use client";

import PluginManager from "@/components/admin/plugins/PluginManager";

export default function PluginsPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col">
                <h1 className="text-6xl font-black tracking-tighter uppercase italic leading-none mb-2">
                    Plugin <span className="text-accent underline decoration-gold/30">Manager</span>
                </h1>
                <p className="text-xs uppercase tracking-[0.4em] font-bold text-white/40 mb-12">
                    Ecosistema de Extensiones y Automatización
                </p>
            </div>

            <PluginManager />
        </div>
    );
}
