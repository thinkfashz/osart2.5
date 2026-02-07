"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useProductStore } from "@/store/productStore";
import {
    ArrowLeft,
    Plus,
    Save,
    Trash2,
    Image as ImageIcon,
    Tag,
    Hash,
    Package
} from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { createVariant, getProductVariants } from "@/app/actions/productActions";
import { ProductVariant } from "@/types";

export default function VariantsManagementPage() {
    const { id } = useParams();
    const router = useRouter();
    const { products } = useProductStore();
    const product = products.find(p => p.id === id);

    const [variants, setVariants] = useState<ProductVariant[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);

    // Form state for new variant
    const [newVariant, setNewVariant] = useState({
        name: "",
        sku: "",
        price_override: "",
        stock: 0,
        attributes: {}
    });

    useEffect(() => {
        async function loadVariants() {
            setLoading(true);
            const data = await getProductVariants(id as string);
            setVariants(data);
            setLoading(false);
        }
        if (id) loadVariants();
    }, [id]);

    const handleAddVariant = async () => {
        if (!newVariant.name) return;

        const data = await createVariant({
            product_id: id,
            name: newVariant.name,
            sku: newVariant.sku || null,
            price_override: newVariant.price_override ? parseFloat(newVariant.price_override) : null,
            stock: newVariant.stock,
            attributes: newVariant.attributes
        });

        if (data) {
            setVariants([...variants, data]);
            setIsAdding(false);
            setNewVariant({ name: "", sku: "", price_override: "", stock: 0, attributes: {} });
        }
    };

    if (!product) return <div className="p-20 text-center font-black uppercase tracking-widest text-text-light animate-pulse">Producto no encontrado...</div>;

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => router.back()}
                        className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 luxury-transition"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-4xl font-black tracking-tighter uppercase italic">Variantes: {product.title}</h1>
                        <p className="text-text-light font-bold text-[10px] uppercase tracking-[0.3em] mt-1">Configuración de Atributos y Stock por SKU</p>
                    </div>
                </div>
                <button
                    onClick={() => setIsAdding(true)}
                    className="arobix-button bg-accent text-white border-accent flex items-center gap-3"
                >
                    <Plus size={20} strokeWidth={3} />
                    AÑADIR VARIANTE
                </button>
            </div>

            {/* Content Split: Form & List */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* List of existing variants */}
                <div className="lg:col-span-2 space-y-6">
                    {loading ? (
                        <div className="p-20 text-center font-black uppercase tracking-widest text-text-light animate-pulse bg-white/5 rounded-[3rem] border border-white/10">Escaneando Arsenal...</div>
                    ) : variants.length === 0 ? (
                        <div className="p-20 text-center font-black uppercase tracking-widest text-text-light bg-white/5 rounded-[3rem] border border-white/10">Este producto no posee variantes configuradas.</div>
                    ) : (
                        <div className="space-y-4">
                            {variants.map((v) => (
                                <div key={v.id} className="group bg-white/5 border border-white/10 rounded-3xl p-6 flex items-center justify-between hover:bg-white/[0.08] luxury-transition">
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center p-3 group-hover:bg-white luxury-transition">
                                            <ImageIcon size={20} className="group-hover:text-black luxury-transition" />
                                        </div>
                                        <div>
                                            <div className="font-black text-sm uppercase tracking-tight">{v.name}</div>
                                            <div className="flex items-center gap-4 mt-1">
                                                <span className="flex items-center gap-1.5 text-[9px] font-bold text-text-light uppercase tracking-widest">
                                                    <Hash size={10} /> {v.sku || "N/A"}
                                                </span>
                                                <span className="flex items-center gap-1.5 text-[9px] font-bold text-text-light uppercase tracking-widest">
                                                    <Package size={10} /> {v.stock} UNID
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-8">
                                        <div className="text-right">
                                            <div className="text-[10px] uppercase font-black text-text-light tracking-widest mb-0.5">Precio</div>
                                            <div className="font-black text-sm">
                                                {v.price_override ? formatCurrency(v.price_override) : formatCurrency(product.price)}
                                            </div>
                                        </div>
                                        <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-500/10 text-red-400 luxury-transition">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Add/Edit Panel */}
                <div className={cn(
                    "bg-white/5 border border-white/10 rounded-[3rem] p-8 space-y-8 luxury-transition",
                    isAdding ? "opacity-100 scale-100" : "opacity-40 grayscale pointer-events-none"
                )}>
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-black uppercase italic tracking-tighter">Nueva Variante</h2>
                        <button onClick={() => setIsAdding(false)} className="text-[10px] font-black uppercase tracking-widest text-text-light hover:text-white transition-colors">Cancelar</button>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-text-light">Nombre / Atributo</label>
                            <input
                                value={newVariant.name}
                                onChange={(e) => setNewVariant({ ...newVariant, name: e.target.value })}
                                placeholder="Ej: Black / Large"
                                className="w-full bg-white/5 border border-white/10 h-12 rounded-2xl px-6 text-sm focus:bg-white/10 outline-none border-focus-accent transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-text-light">SKU (Opcional)</label>
                                <input
                                    value={newVariant.sku}
                                    onChange={(e) => setNewVariant({ ...newVariant, sku: e.target.value })}
                                    placeholder="OS-001"
                                    className="w-full bg-white/5 border border-white/10 h-12 rounded-2xl px-6 text-sm focus:bg-white/10 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-text-light">Stock Inicial</label>
                                <input
                                    type="number"
                                    value={newVariant.stock}
                                    onChange={(e) => setNewVariant({ ...newVariant, stock: parseInt(e.target.value) })}
                                    className="w-full bg-white/5 border border-white/10 h-12 rounded-2xl px-6 text-sm focus:bg-white/10 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-text-light">Precio Override (Opcional)</label>
                            <div className="relative">
                                <Tag className="absolute left-6 top-1/2 -translate-y-1/2 text-text-light" size={14} />
                                <input
                                    type="number"
                                    value={newVariant.price_override}
                                    onChange={(e) => setNewVariant({ ...newVariant, price_override: e.target.value })}
                                    placeholder={product.price.toString()}
                                    className="w-full bg-white/5 border border-white/10 h-12 rounded-2xl pl-12 pr-6 text-sm focus:bg-white/10 outline-none transition-all"
                                />
                            </div>
                            <p className="text-[8px] text-text-light uppercase font-bold tracking-tighter ml-2">Dejar vacío para usar precio base ({formatCurrency(product.price)})</p>
                        </div>

                        <button
                            onClick={handleAddVariant}
                            className="w-full py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-accent hover:text-white luxury-transition flex items-center justify-center gap-2"
                        >
                            <Save size={14} />
                            GUARDAR VARIANTE
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
