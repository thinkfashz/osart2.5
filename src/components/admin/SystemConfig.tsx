"use client";

import { useState } from "react";
import { Settings, Eye, Palette, Globe, Save, Sliders, Layout, RefreshCw, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SystemConfig() {
    const [config, setConfig] = useState({
        siteName: "Osart Elite",
        primaryColor: "#000000",
        accentColor: "#E60000",
        isMaintenance: false,
    });
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 1500);
    };

    return (
        <div className="bg-zinc-950 border border-zinc-800 p-8 space-y-10 shadow-industrial">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-900 pb-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-100">
                        <Settings size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-black uppercase italic tracking-tighter text-zinc-100">CONFIG_GLOBAL</h3>
                        <p className="text-[10px] font-mono uppercase tracking-widest font-black text-zinc-500">PARÁMETROS_SISTEMA_V4</p>
                    </div>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="industrial-button py-2 text-[10px]"
                >
                    {isSaving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
                    <span className="ml-2">{isSaving ? "SYNCING_DATA..." : "COMMIT_CHANGES"}</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Identity Settings */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest font-black text-cyan-400 font-mono">
                        <Layout size={14} /> // IDENTIDAD_VISUAL
                    </div>
                    <div className="space-y-6 bg-zinc-900 border border-zinc-800 p-6">
                        <div className="space-y-3">
                            <label className="text-[9px] font-mono font-black text-zinc-600 uppercase tracking-widest italic">SITE_ACCESS_LABEL</label>
                            <input
                                value={config.siteName}
                                onChange={(e) => setConfig({ ...config, siteName: e.target.value })}
                                className="w-full bg-zinc-950 border border-zinc-800 h-12 px-6 text-xs font-mono font-bold text-zinc-100 focus:border-cyan-400 outline-none transition-all placeholder:text-zinc-800"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <label className="text-[9px] font-mono font-black text-zinc-600 uppercase tracking-widest italic">VAL_VEC_PRIMARY</label>
                                <div className="flex items-center gap-3 bg-zinc-950 border border-zinc-800 h-12 px-4">
                                    <input type="color" value={config.primaryColor} onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })} className="bg-transparent border-none w-6 h-6 cursor-pointer" />
                                    <span className="text-[10px] font-mono uppercase font-black text-zinc-400">{config.primaryColor}</span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[9px] font-mono font-black text-zinc-600 uppercase tracking-widest italic">VAL_VEC_ACCENT</label>
                                <div className="flex items-center gap-3 bg-zinc-950 border border-zinc-800 h-12 px-4">
                                    <input type="color" value={config.accentColor} onChange={(e) => setConfig({ ...config, accentColor: e.target.value })} className="bg-transparent border-none w-6 h-6 cursor-pointer" />
                                    <span className="text-[10px] font-mono uppercase font-black text-zinc-400">{config.accentColor}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Technical Settings */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest font-black text-orange-500 font-mono">
                        <Sliders size={14} /> // CORE_PROTOCOLS
                    </div>
                    <div className="space-y-1 bg-zinc-800 border border-zinc-800">
                        <div className="p-6 bg-zinc-950 flex items-center justify-between group transition-colors hover:bg-zinc-900/50">
                            <div className="space-y-1">
                                <div className="text-[10px] font-mono font-black uppercase text-zinc-100">MODO_MANTENIMIENTO</div>
                                <p className="text-[9px] font-mono text-zinc-600 uppercase italic">BLOCK_PUBLIC_CATALOG_ACCESS</p>
                            </div>
                            <button
                                onClick={() => setConfig({ ...config, isMaintenance: !config.isMaintenance })}
                                className={cn(
                                    "w-10 h-5 border border-zinc-800 transition-all duration-300 relative flex items-center px-1",
                                    config.isMaintenance ? "bg-orange-500 border-orange-500" : "bg-zinc-900"
                                )}
                            >
                                <div className={cn(
                                    "w-3 h-3 bg-zinc-100 transition-all duration-300",
                                    config.isMaintenance ? "translate-x-5" : "translate-x-0"
                                )} />
                            </button>
                        </div>

                        <div className="p-6 bg-zinc-950 flex items-center justify-between group">
                            <div className="space-y-1">
                                <div className="text-[10px] font-mono font-black uppercase text-zinc-100">SSR_GLOBAL_OPTIMIZATION</div>
                                <p className="text-[9px] font-mono text-zinc-600 uppercase italic">RUNTIME_AUTO_INDEXING_ACTIVE</p>
                            </div>
                            <CheckCircle2 size={16} className="text-cyan-400" />
                        </div>

                        <div className="p-6 bg-zinc-950 flex items-center justify-between group grayscale opacity-40">
                            <div className="space-y-1">
                                <div className="text-[10px] font-mono font-black uppercase text-zinc-100">DEBUG_OVERLAY_v4</div>
                                <p className="text-[9px] font-mono text-zinc-600 uppercase italic">CORE_LOGGING_DISABLED</p>
                            </div>
                            <div className="w-3 h-3 border border-zinc-800" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

