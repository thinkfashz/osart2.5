import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";

import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", style: "italic" });

export const metadata: Metadata = {
  title: "Osart Elite | Hardware Soberano",
  description: "Plataforma de élite para componentes electrónicos y educación técnica avanzada.",
};

import { Providers } from "@/components/Providers";
import LuxuryBackground from "@/components/ui/LuxuryBackground";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={cn(inter.variable, jakarta.variable, playfair.variable)}>
      <body className="font-jakarta bg-charcoal text-white selection:bg-gold relative">
        <Providers>
          <LuxuryBackground />
          <Navbar />
          <main className="min-h-screen pb-20 lg:pb-0 relative z-10 transition-colors duration-1000">
            {children}
          </main>

          <BottomNav />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
