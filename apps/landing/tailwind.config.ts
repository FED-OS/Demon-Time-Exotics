import type { Config } from "tailwindcss";

/**
 * Demon Time Exotics — Tailwind preset for the landing site.
 *
 * The live landing page ships framework-free vanilla CSS (ADR-0007),
 * but this config exists so contributors can opt into Tailwind for
 * new pages/components without re-inventing the brand palette.
 *
 * Usage:
 *   1. `pnpm add -D tailwindcss postcss autoprefixer`
 *   2. Add `@tailwind base; @tailwind components; @tailwind utilities;`
 *      to a stylesheet imported by index.html.
 */
const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        dte: {
          black: "#050505",
          dark: "#0d0d0d",
          charcoal: "#141414",
          fire: "#ff5e1a",
          inferno: "#ff2e00",
          purple: "#8b2fd6",
          gold: "#f5a623",
          smoke: "#9a9a9a",
          text: "#f2f2f2"
        }
      },
      fontFamily: {
        display: ['"Bebas Neue"', '"Segoe UI"', "sans-serif"],
        body: ['"Inter"', '"Segoe UI"', "system-ui", "sans-serif"]
      },
      boxShadow: {
        fire: "0 0 24px rgba(255, 94, 26, 0.35)",
        purple: "0 0 24px rgba(139, 47, 214, 0.35)",
        ember: "0 10px 40px rgba(255, 46, 0, 0.25)"
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease forwards",
        flicker: "flicker 3s linear infinite",
        "float-slow": "floatSlow 8s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
