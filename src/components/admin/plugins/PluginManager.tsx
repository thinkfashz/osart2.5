"use client";

import { useState } from "react";
import { Plus, Grid, List as ListIcon, Search, Puzzle, Play, Settings2, Trash2, CheckCircle2, AlertCircle, Cpu, Zap, Activity, ShieldCheck, Box } from "lucide-react";
import { cn } from "@/lib/utils";
import PluginUpload from "@/components/admin/plugins/PluginUpload";
import { motion, AnimatePresence } from "framer-motion";
import Pagination from "@/components/ui/Pagination";

interface Plugin {
    id: string;
    name: string;
    version: string;
    author: string;
    description: string;
    active: boolean;
    status: 'stable' | 'warning' | 'error';
}

const INITIAL_PLUGINS: Plugin[] = [
    {
        id: "woo-sync",
        name: "WooCommerce Bridge",
        version: "2.4.1",
        author: "Osart Dev Team",
        description: "Sincronización bidireccional de inventario y pedidos con WordPress/WooCommerce.",
        active: true,
        status: 'stable'
    },
    {
        id: "seo-expert",
        name: "SEO Expert Pro",
        version: "1.0.5",
        author: "Marketing Core",
        description: "Gestión avanzada de meta-datos y optimización de imágenes para SSR.",
        active: false,
        status: 'stable'
    }
];

export default function PluginManager() {
    const [plugins, setPlugins] = useState<Plugin[]>(INITIAL_PLUGINS);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showUpload, setShowUpload] = useState(false);
    const [testResult, setTestResult] = useState<{ id: string, message: string } | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const togglePlugin = (id: string) => {
        setPlugins(plugins.map(p => p.id === id ? { ...p, active: !p.active } : p));
    };

    const runTest = (id: string) => {
        const plugin = plugins.find(p => p.id === id);
        setTestResult({ id, message: `Iniciando diagnóstico para ${plugin?.name}...` });

        setTimeout(() => {
            setTestResult({ id, message: `Test completado: El módulo "${plugin?.name}" está operando al 100% de su capacidad. Sincronización nominal.` });
        }, 2000);
    };

    const handleUploadComplete = (newPlugin: Plugin) => {
        setPlugins([newPlugin, ...plugins]);
        setShowUpload(false);
    };

    const filteredPlugins = plugins.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredPlugins.length / itemsPerPage);
    const paginatedPlugins = filteredPlugins.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="space-y-12">
            {/* Action Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-charcoal/5 border border-charcoal/5 p-8 rounded-[3rem] shadow-premium backdrop-blur-3xl">
                <div className="flex items-center gap-8">
                    <button
                        onClick={() => setShowUpload(true)}
                        className="px-8 h-14 bg-gold text-black rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-charcoal hover:text-white shadow-premium transition-all group"
                    >
                        <Plus size={20} className="group-hover:rotate-90 transition-transform duration-700" strokeWidth={3} />
                        <span className="font-black uppercase text-[11px] tracking-[0.3em] italic">INYECTAR_MÓDULO</span>
                    </button>

                    <div className="h-10 w-px bg-white/5" />

                    <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={cn(
                                "p-3 rounded-xl transition-all duration-500",
                                viewMode === 'grid' ? "bg-white text-black shadow-lg scale-110" : "text-white/20 hover:text-white"
                            )}
                        >
                            <Grid size={20} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={cn(
                                "p-3 rounded-xl transition-all duration-500",
                                viewMode === 'list' ? "bg-white text-black shadow-lg scale-110" : "text-white/20 hover:text-white"
                            )}
                        >
                            <ListIcon size={20} />
                        </button>
                    </div>
                </div>

                <div className="relative flex-1 max-w-md w-full">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/10" size={18} />
                    <input
                        placeholder="IDENTIFICAR_EXTENSIÓN..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full bg-white/[0.02] border border-white/5 h-14 rounded-2xl pl-16 pr-8 text-[11px] font-black tracking-[0.4em] uppercase outline-none focus:bg-white/5 focus:border-gold/30 liquid-hover italic placeholder:text-white/5"
                    />
                </div>
            </div>

            {/* Plugin View */}
            <AnimatePresence mode="wait">
                {viewMode === 'grid' ? (
                    <motion.div
                        key="grid"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                    >
                        {paginatedPlugins.map((plugin, idx) => (
                            <motion.div
                                key={plugin.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                className="group relative bg-charcoal/5 p-10 rounded-[3.5rem] border border-charcoal/5 hover:border-gold/30 shadow-premium transition-all overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-48 h-48 bg-gold/5 blur-[80px] -mr-24 -mt-24 group-hover:bg-gold/10 transition-all duration-1000" />
                                <div className="absolute top-0 left-0 w-1.5 h-32 bg-vibrant-gradient opacity-20" />

                                <div className="flex items-start justify-between relative z-10 mb-8">
                                    <div className="w-16 h-16 rounded-[1.5rem] bg-white/[0.03] border border-white/10 p-0.5 group-hover:rotate-12 transition-transform duration-700">
                                        <div className="w-full h-full rounded-[1.4rem] bg-black flex items-center justify-center text-white/40 group-hover:text-gold transition-colors shadow-inner">
                                            <Puzzle size={28} strokeWidth={1.5} />
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <span className="text-[10px] font-black uppercase text-white/10 tracking-widest italic leading-none">V_{plugin.version}</span>
                                        <div className={cn(
                                            "px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] italic border",
                                            plugin.status === 'stable' ? "bg-green-500/5 text-green-500 border-green-500/20" : "bg-cyber-red/5 text-cyber-red border-cyber-red/20"
                                        )}>
                                            {plugin.status === 'stable' ? 'NOMINAL' : 'CRÍTICO'}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 relative z-10">
                                    <div>
                                        <h3 className="text-2xl font-black tracking-tighter uppercase italic group-hover:text-gold transition-colors leading-none mb-1">{plugin.name}</h3>
                                        <p className="text-[9px] uppercase font-black text-white/20 tracking-[0.4em] italic mb-6">NODO_AUTOR // {plugin.author.toUpperCase()}</p>
                                    </div>
                                    <p className="text-xs text-white/40 leading-relaxed font-black uppercase tracking-widest italic line-clamp-3 opacity-60 group-hover:opacity-100 transition-opacity">
                                        "{plugin.description}"
                                    </p>
                                </div>

                                <div className="flex items-center justify-between pt-8 mt-8 border-t border-white/5 relative z-10">
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => togglePlugin(plugin.id)}
                                            className={cn(
                                                "w-14 h-7 rounded-full transition-all duration-700 relative flex items-center px-1.5 shadow-inner border border-white/5",
                                                plugin.active ? "bg-gold/80" : "bg-white/5"
                                            )}
                                        >
                                            <motion.div
                                                animate={{ x: plugin.active ? 28 : 0 }}
                                                className={cn(
                                                    "w-4 h-4 rounded-full shadow-lg transition-colors duration-500",
                                                    plugin.active ? "bg-black" : "bg-white/10"
                                                )}
                                            />
                                        </button>
                                        <span className={cn(
                                            "text-[10px] font-black uppercase tracking-[0.3em] italic",
                                            plugin.active ? "text-white" : "text-white/20"
                                        )}>
                                            {plugin.active ? 'ACTIVO' : 'INACTIVO'}
                                        </span>
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => runTest(plugin.id)}
                                            className="p-3 bg-white/[0.03] border border-white/5 hover:bg-gold hover:text-black rounded-xl text-white/20 transition-all liquid-hover"
                                            title="Diagnóstico de Módulo"
                                        >
                                            <Play size={18} strokeWidth={2.5} />
                                        </button>
                                        <button className="p-3 bg-white/[0.03] border border-white/5 hover:bg-white hover:text-black rounded-xl text-white/20 transition-all liquid-hover">
                                            <Settings2 size={18} strokeWidth={2.5} />
                                        </button>
                                        <button className="p-3 bg-cyber-red/5 border border-white/5 hover:bg-cyber-red hover:text-white rounded-xl text-cyber-red/20 transition-all liquid-hover">
                                            <Trash2 size={18} strokeWidth={2.5} />
                                        </button>
                                    </div>
                                </div>

                                {/* Test Report Overlay */}
                                <AnimatePresence>
                                    {testResult?.id === plugin.id && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 20 }}
                                            className="absolute inset-4 mt-auto p-6 bg-black/90 backdrop-blur-2xl rounded-3xl border border-gold/30 shadow-luxury-glow z-20 flex flex-col justify-between"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="mt-1">
                                                    {testResult.message.includes('completado') ? (
                                                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                                                            <CheckCircle2 size={18} />
                                                        </div>
                                                    ) : (
                                                        <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                                                            <Activity size={18} className="text-gold animate-pulse" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="space-y-1">
                                                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 italic">Bitácora_Diagnóstico</span>
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-white leading-relaxed italic">
                                                        {testResult.message}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setTestResult(null)}
                                                className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[9px] font-black uppercase tracking-[0.4em] text-gold italic transition-all"
                                            >
                                                CERRAR_REPORTE_SSR
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        key="list"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="glass-morph rounded-[4rem] border border-white/5 overflow-hidden shadow-paradox"
                    >
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-white/[0.03] border-b border-white/5">
                                    <th className="px-10 py-8 text-[10px] uppercase tracking-[0.5em] font-black text-white/20 italic">Módulo_Específico</th>
                                    <th className="px-10 py-8 text-[10px] uppercase tracking-[0.5em] font-black text-white/20 italic">Funcionalidad</th>
                                    <th className="px-10 py-8 text-[10px] uppercase tracking-[0.5em] font-black text-white/20 italic">Estado_Operativo</th>
                                    <th className="px-10 py-8 text-right text-[10px] uppercase tracking-[0.5em] font-black text-white/20 italic">Control_Terminal</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {paginatedPlugins.map(plugin => (
                                    <tr key={plugin.id} className="hover:bg-white/[0.02] liquid-hover transition-colors group">
                                        <td className="px-10 py-10">
                                            <div className="flex items-center gap-8">
                                                <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 p-0.5 group-hover:scale-105 transition-transform">
                                                    <div className="w-full h-full rounded-2xl bg-black flex items-center justify-center text-white/40 group-hover:text-gold transition-colors">
                                                        <Puzzle size={22} strokeWidth={1.5} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-xl font-black uppercase tracking-tighter italic group-hover:text-gold transition-colors">{plugin.name}</div>
                                                    <div className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] italic">V_{plugin.version} // {plugin.author.toUpperCase()}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-10">
                                            <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.2em] italic max-w-sm group-hover:text-white/60 transition-colors">"{plugin.description}"</p>
                                        </td>
                                        <td className="px-10 py-10">
                                            <div className="flex items-center gap-4">
                                                <div className={cn("w-3 h-3 rounded-full blur-[2px]", plugin.active ? "bg-green-500 shadow-[0_0_10px_#22c55e]" : "bg-white/10")} />
                                                <span className={cn(
                                                    "text-[10px] font-black uppercase tracking-[0.3em] italic",
                                                    plugin.active ? "text-white" : "text-white/20"
                                                )}>{plugin.active ? 'ACTIVO' : 'DORMIDO'}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-10 text-right space-x-3">
                                            <button onClick={() => runTest(plugin.id)} className="p-4 hover:bg-gold hover:text-black bg-white/5 rounded-2xl text-white/20 liquid-hover"><Play size={18} strokeWidth={2.5} /></button>
                                            <button className="p-4 hover:bg-white hover:text-black bg-white/5 rounded-2xl text-white/20 liquid-hover"><Settings2 size={18} strokeWidth={2.5} /></button>
                                            <button className="p-4 hover:bg-cyber-red hover:text-white bg-white/5 rounded-2xl text-white/20 liquid-hover"><Trash2 size={18} strokeWidth={2.5} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>
                )}
            </AnimatePresence>

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    className="pt-12"
                />
            )}

            {/* Modal Area */}
            <AnimatePresence>
                {showUpload && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-20">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-obsidian/80 backdrop-blur-3xl"
                            onClick={() => setShowUpload(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 50 }}
                            className="relative z-10 w-full max-w-2xl"
                        >
                            <PluginUpload
                                onClose={() => setShowUpload(false)}
                                onComplete={handleUploadComplete}
                            />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
