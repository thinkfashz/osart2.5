import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: "#0F172A",
          light: "#1E293B",
          dark: "#020617",
        },
        gold: {
          DEFAULT: "#D4AF37",
          light: "#F59E0B",
          dark: "#B45309",
        },
        surface: "#F8FAFC",
      },
      boxShadow: {
        'premium': '0 20px 50px -12px rgba(0, 0, 0, 0.15)',
        'gold-glow': '0 0 20px rgba(212, 175, 55, 0.2)',
      },
      animation: {
        'shimmer-gold': 'shimmer 3s linear infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
