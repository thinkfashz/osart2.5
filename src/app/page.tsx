"use client";

import { useEffect, useState } from "react";
import PremiumProductCard from "@/components/products/PremiumProductCard";
import { dummyProducts } from "@/data/dummyProducts";
import { supabase } from "@/lib/supabase";
import PremiumHero from "@/components/home/PremiumHero";
import BenefitsSection from "@/components/home/BenefitsSection";
import SocialProofSection from "@/components/home/SocialProofSection";
import FinalCTA from "@/components/home/FinalCTA";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Product } from "@/types";


export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!supabase) {
          setProducts(dummyProducts.slice(0, 8));
          setLoading(false);
          return;
        }
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order('created_at', { ascending: false })
          .limit(8);

        if (error || !data || data.length === 0) {
          setProducts(dummyProducts.slice(0, 8));
        } else {
          setProducts(data);
        }
      } catch (e) {
        setProducts(dummyProducts.slice(0, 8));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col gap-0 bg-zinc-950 min-h-screen">

      {/* 1. PREMIUM HERO - Professional Gateway */}
      <PremiumHero />

      {/* 2. BENEFITS SECTION - Engineering Precision */}
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
        <BenefitsSection />
      </div>

      {/* 3. FEATURED PRODUCTS - Professional Arsenal */}
      <section className="py-24 bg-zinc-950 relative overflow-hidden">
        {/* Background Grid Accent */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-24 space-y-12"
          >
            <div className="inline-flex items-center gap-4 px-6 py-2 bg-zinc-900 border border-zinc-800">
              <div className="w-2 h-2 bg-cyan-400 animate-pulse" />
              <span className="text-[10px] font-black tracking-[0.3em] text-zinc-400">
                08_SELECCIÓN_KRÍTICA
              </span>
            </div>

            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-zinc-100 italic uppercase leading-[0.9]">
              ARSENAL
              <br />
              <span className="text-zinc-700">DESTACADO.</span>
            </h2>

            <p className="text-lg text-zinc-500 max-w-2xl mx-auto font-bold uppercase tracking-tight">
              Componentes certificados bajo protocolos de estrés industrial.
              Resultados garantizados en entornos de alta exigencia.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-800 p-px max-w-7xl mx-auto border border-zinc-800">
            {products.map((product: Product) => (
              <div key={product.id} className="bg-zinc-950 p-4">
                <PremiumProductCard product={product} />
              </div>
            ))}
          </div>

          {/* View All Link */}
          <div className="text-center mt-24">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-6 text-xs font-black tracking-[0.4em] text-zinc-500 hover:text-cyan-400 transition-all uppercase group italic"
            >
              VER_INVENTARIO_ESTRATÉGICO
              <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                <ArrowRight size={20} />
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. SOCIAL PROOF - Trust & Authority */}
      <SocialProofSection />

      {/* 5. FINAL CTA - Intelligent Decision */}
      <FinalCTA />

    </div>
  );
}
