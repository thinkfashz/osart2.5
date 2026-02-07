import { dummyProducts } from "@/data/dummyProducts";
import BuyBox from "@/components/products/BuyBox";
import PremiumProductCard from "@/components/products/PremiumProductCard";
import ShippingInfo from "@/components/products/ShippingInfo";
import SalesBonus from "@/components/products/SalesBonus";
import LocationPicker from "@/components/ui/LocationPicker";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ArrowLeft, Star, CheckCircle, Users, Activity, ShieldCheck, Zap, Award, TrendingUp, Package } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Product } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { calculateFinalPrice } from "@/app/actions/pricingActions";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

// Optimization: Cache strategy for individual items
export const revalidate = 60;

async function getProduct(id: string): Promise<Product | null> {
    try {
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .eq("id", id)
            .single();

        if (error || !data) {
            return dummyProducts.find(p => p.id === id) || null;
        };
        return data as Product;
    } catch (e) {
        return dummyProducts.find(p => p.id === id) || null;
    }
}

async function getRelatedProducts(category: string, currentId: string): Promise<Product[]> {
    try {
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .eq("category", category)
            .neq("id", currentId)
            .limit(4);

        if (error || !data || data.length === 0) {
            return dummyProducts.filter(p => p.category === category && p.id !== currentId).slice(0, 4);
        }
        return data as Product[];
    } catch (e) {
        return dummyProducts.filter(p => p.category === category && p.id !== currentId).slice(0, 4);
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const product = await getProduct(id);
    if (!product) return { title: 'Producto no encontrado' };

    return {
        title: `${product.title} | OSART Electronic Components`,
        description: product.description,
    };
}

export default async function ProductDetailPage({ params }: Props) {
    const { id } = await params;
    const product = await getProduct(id);
    if (!product) notFound();

    const relatedProducts = await getRelatedProducts(product.category, product.id);
    const { finalPrice } = await calculateFinalPrice(product.id);

    const mockReviews = [
        { user: "Ing. Carlos M.", role: "Lead Engineer", text: "Integración perfecta con sistemas de control industrial. Tolerancia térmica excepcional.", stars: 5 },
        { user: "Dra. Elena S.", role: "Senior Engineer", text: "La precisión del componente supera los estándares OEM. Recomendado para mantenimiento crítico.", stars: 5 },
        { user: "Global Tech Inc.", role: "Verified Partner", text: "Suministro constante y calidad certificada. El soporte técnico de OSART es impecable.", stars: 4 },
    ];

    return (
        <div className="bg-pearl text-graphite min-h-screen pt-32 pb-48 selection:bg-electric-blue/30">
            <div className="container mx-auto px-6 max-w-7xl">

                {/* Navigation & Status */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-8">
                    <Link
                        href="/catalog"
                        className="inline-flex items-center gap-4 group"
                    >
                        <div className="w-12 h-12 rounded-xl bg-graphite/5 flex items-center justify-center group-hover:bg-electric-blue group-hover:text-white transition-all duration-500">
                            <ArrowLeft size={20} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold tracking-wide text-slate-deep/60 group-hover:text-electric-blue transition-colors">Volver al Catálogo</span>
                        </div>
                    </Link>

                    <div className="flex items-center gap-8 opacity-60">
                        <div className="flex items-center gap-2">
                            <Activity size={14} className="text-tech-green animate-pulse" />
                            <span className="text-xs font-semibold uppercase tracking-wide">En Stock</span>
                        </div>
                        <div className="w-px h-6 bg-graphite/10" />
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={14} className="text-electric-blue" />
                            <span className="text-xs font-semibold uppercase tracking-wide">Certificado</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

                    {/* LEFT: Product Image */}
                    <div className="lg:col-span-6 space-y-12 lg:sticky lg:top-32">
                        <div className="bg-white rounded-3xl p-16 aspect-square flex items-center justify-center overflow-hidden relative group shadow-subtle border border-graphite/10">
                            <div className="absolute inset-0 bg-tech-grid opacity-5" />
                            <img
                                src={product.image_url}
                                alt={product.title}
                                className="w-full h-full object-contain hover:scale-105 transition-transform duration-700 relative z-10 drop-shadow-2xl"
                            />

                            {/* Metadata Labels */}
                            <div className="absolute top-8 left-8 flex flex-col gap-2 opacity-40">
                                <span className="text-xs font-semibold text-slate-deep/60 uppercase tracking-wide">REF: {product.id.slice(0, 8)}</span>
                                <span className="text-xs font-semibold text-electric-blue uppercase tracking-wide">OSART Electronics</span>
                            </div>
                        </div>

                        {/* Technical Metrics */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-8 rounded-2xl bg-white border border-graphite/10 space-y-4 group hover:border-electric-blue/30 transition-all duration-500 shadow-subtle">
                                <div className="flex items-center justify-between opacity-60">
                                    <span className="text-sm font-semibold uppercase tracking-wide">Rendimiento</span>
                                    <TrendingUp size={16} />
                                </div>
                                <div className="h-2 w-full bg-graphite/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-electric-blue w-[92%] animate-in slide-in-from-left duration-1000 delay-300" />
                                </div>
                                <span className="text-sm font-semibold uppercase tracking-wide text-slate-deep/60">Estabilidad Térmica</span>
                            </div>
                            <div className="p-8 rounded-2xl bg-white border border-graphite/10 space-y-4 group hover:border-electric-blue/30 transition-all duration-500 shadow-subtle">
                                <div className="flex items-center justify-between opacity-60">
                                    <span className="text-sm font-semibold uppercase tracking-wide">Construcción</span>
                                    <Package size={16} />
                                </div>
                                <div className="h-2 w-full bg-graphite/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-tech-green w-[98%] animate-in slide-in-from-left duration-1000 delay-500" />
                                </div>
                                <span className="text-sm font-semibold uppercase tracking-wide text-slate-deep/60">Estructura Reforzada</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Product Info */}
                    <div className="lg:col-span-6 flex flex-col space-y-12">
                        <section className="space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-blue/10 border border-electric-blue/20">
                                <Award size={14} className="text-electric-blue" />
                                <span className="text-xs font-semibold tracking-wide text-electric-blue uppercase">
                                    {product.category}
                                </span>
                            </div>

                            <h1 className="text-6xl md:text-7xl font-bold tracking-tight leading-[0.9] text-graphite animate-in slide-in-from-right duration-700">
                                {product.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-8">
                                {finalPrice < product.price ? (
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-slate-deep/40 uppercase tracking-wide mb-1 line-through">
                                            Original {formatCurrency(product.price)}
                                        </span>
                                        <div className="flex items-center gap-4">
                                            <span className="text-6xl font-bold text-red-600 tracking-tight">
                                                {formatCurrency(finalPrice)}
                                            </span>
                                            <span className="bg-red-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                                                -{Math.round((1 - finalPrice / product.price) * 100)}% OFF
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-slate-deep/40 uppercase tracking-wide mb-1">Precio Profesional</span>
                                        <span className="text-6xl font-bold text-graphite tracking-tight">
                                            {formatCurrency(product.price)}
                                        </span>
                                    </div>
                                )}
                                <div className="h-12 w-px bg-graphite/10 hidden md:block" />
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        <Star size={14} className="text-electric-blue fill-electric-blue" />
                                        <span className="text-sm font-semibold uppercase tracking-wide text-graphite">4.9 / 5.0</span>
                                    </div>
                                    <span className="text-xs font-semibold text-slate-deep/40 uppercase tracking-wide">Basado en 1.2K instalaciones</span>
                                </div>
                            </div>
                        </section>

                        {/* Stock Alert */}
                        <div className="p-6 rounded-2xl bg-electric-blue/10 border border-electric-blue/20 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Zap size={18} className="text-electric-blue" />
                                <span className="text-sm font-semibold uppercase tracking-wide text-graphite">Stock Limitado: Solo quedan {product.stock} unidades</span>
                            </div>
                            <span className="text-xs font-bold text-electric-blue uppercase tracking-wide">Alta Demanda</span>
                        </div>

                        {/* Description & Specs */}
                        <div className="space-y-8">
                            <p className="text-lg text-slate-deep/70 leading-relaxed">
                                {product.description}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {Object.entries(product.specs).filter(([k]) => k !== 'shipping').map(([key, value]) => (
                                    <div key={key} className="p-6 rounded-2xl bg-white border border-graphite/10 space-y-3 group hover:border-electric-blue/30 transition-all duration-300 shadow-subtle">
                                        <span className="text-xs uppercase tracking-wide font-semibold text-slate-deep/60">{key}</span>
                                        <div className="text-xl font-bold uppercase tracking-tight text-graphite">{String(value)}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-8 border-t border-graphite/10">
                            <BuyBox product={product} />
                        </div>

                        <LocationPicker />

                        {/* Customer Reviews */}
                        <div className="space-y-8 py-12 border-t border-graphite/10">
                            <div className="flex items-center justify-between">
                                <h3 className="text-2xl font-bold uppercase tracking-tight text-graphite">Opiniones Profesionales</h3>
                                <div className="flex items-center gap-2">
                                    <Users size={16} className="text-slate-deep/40" />
                                    <span className="text-sm font-semibold text-slate-deep/40 uppercase tracking-wide">Comunidad</span>
                                </div>
                            </div>
                            <div className="space-y-6">
                                {mockReviews.map((review, i) => (
                                    <div key={i} className="p-8 rounded-2xl bg-white border border-graphite/10 space-y-6 group hover:bg-graphite/5 transition-all duration-500 shadow-subtle">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-graphite to-midnight flex items-center justify-center text-sm font-bold text-white">
                                                    {review.user[0]}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold uppercase text-graphite tracking-wide">{review.user}</span>
                                                    <span className="text-xs font-semibold uppercase text-electric-blue tracking-wide mt-1">{review.role}</span>
                                                </div>
                                            </div>
                                            <div className="flex gap-1">
                                                {[...Array(review.stars)].map((_, j) => (
                                                    <Star key={j} size={12} className="text-electric-blue fill-electric-blue" />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-sm text-slate-deep/70 leading-relaxed">"{review.text}"</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-32 pt-20 border-t border-graphite/10">
                        <div className="flex items-end justify-between mb-12">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-blue/10 border border-electric-blue/20">
                                    <Package size={14} className="text-electric-blue" />
                                    <span className="text-xs font-semibold tracking-wide text-electric-blue">Productos Relacionados</span>
                                </div>
                                <h2 className="text-5xl font-bold tracking-tight text-graphite">Componentes Compatibles</h2>
                            </div>
                            <Link href="/catalog" className="text-sm font-semibold uppercase tracking-wide text-electric-blue hover:underline">Ver Todo</Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedProducts.map((p) => (
                                <PremiumProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
