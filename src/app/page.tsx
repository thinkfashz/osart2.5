import PremiumProductCard from "@/components/products/PremiumProductCard";
import { dummyProducts } from "@/data/dummyProducts";
import { supabase } from "@/lib/supabase";
import PremiumHero from "@/components/home/PremiumHero";
import BenefitsSection from "@/components/home/BenefitsSection";
import SocialProofSection from "@/components/home/SocialProofSection";
import FinalCTA from "@/components/home/FinalCTA";

import { Product } from "@/types";

// Global Revalidation: Optimization for Production
export const revalidate = 60;

async function getProducts(): Promise<Product[]> {
  try {
    if (!supabase) return dummyProducts.slice(0, 8);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order('created_at', { ascending: false })
      .limit(8);

    if (error || !data || data.length === 0) return dummyProducts.slice(0, 8);
    return data;
  } catch (e) {
    return dummyProducts.slice(0, 8);
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="flex flex-col gap-0 bg-ivory min-h-screen selection:bg-electric-blue selection:text-white">

      {/* 1. PREMIUM HERO - Professional Gateway */}
      <PremiumHero />

      {/* 2. BENEFITS SECTION - Engineering Precision */}
      <BenefitsSection />

      {/* 3. FEATURED PRODUCTS - Professional Arsenal */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-tech-grid opacity-10" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-20 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-graphite/5 border border-graphite/10">
              <span className="text-xs font-semibold tracking-wide text-graphite">
                Componentes Destacados
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-graphite">
              Catálogo Profesional.
              <br />
              <span className="text-slate-deep/50">Calidad Garantizada.</span>
            </h2>

            <p className="text-lg text-slate-deep/70 leading-relaxed">
              Cada componente es seleccionado por su rendimiento excepcional
              <br className="hidden md:block" />
              y compatibilidad verificada con sistemas industriales.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {products.map((product: Product) => (
              <PremiumProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* View All Link */}
          <div className="text-center mt-16">
            <a
              href="/catalog"
              className="inline-flex items-center gap-3 text-base font-semibold text-electric-blue hover:gap-4 transition-all group"
            >
              Ver Catálogo Completo
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
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
