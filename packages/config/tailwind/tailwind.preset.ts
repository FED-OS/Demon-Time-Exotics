/**
 * @dte/config-tailwind — shared Tailwind preset.
 *
 * Usage in any workspace tailwind.config.ts:
 *
 *   import dte from "@dte/config-tailwind";
 *   import type { Config } from "tailwindcss";
 *
 *   export default {
 *     presets: [dte],
 *     content: ["./index.html", "./src/**\/*.{ts,tsx}"]
 *   } satisfies Config;
 */

import type { Config } from "tailwindcss";

/** Brand tokens (single source: @dte/ui themes + root styles.css). */
export const dteColors = {
  fire: "#ff5e1a",
  inferno: "#ff2e00",
  purple: "#8b2fd6",
  gold: "#f5a623",
  ember: "#ffb98a",
  ink: "#050505",
  "ink-soft": "#0d0d0d",
  paper: "#f4f4f5",
  muted: "#a3a3ab"
};

export const dteFonts = {
  display: ["'Bebas Neue'", "'Arial Narrow'", "sans-serif"],
  body: ["'Inter'", "system-ui", "-apple-system", "sans-serif"]
};

export const dteShadows = {
  ember: "0 10px 40px -12px rgba(255, 94, 26, 0.45)",
  purple: "0 10px 40px -12px rgba(139, 47, 214, 0.45)",
  "ember-lg": "0 18px 60px -12px rgba(255, 94, 26, 0.55)"
};

/** The DTE Tailwind preset. */
const dtePreset: Partial<Config> = {
  theme: {
    extend: {
      colors: dteColors,
      fontFamily: dteFonts,
      boxShadow: dteShadows,
      borderRadius: {
        dte: "16px",
        "dte-lg": "24px"
      },
      backgroundImage: {
        "gradient-fire": "linear-gradient(135deg, #ff5e1a 0%, #ff2e00 55%, #f5a623 120%)",
        "gradient-purple": "linear-gradient(135deg, #8b2fd6 0%, #5b1f9e 100%)"
      },
      animation: {
        "flicker-in": "dte-flicker-in 0.7s ease-out both",
        "reveal-up": "dte-reveal-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        "ember-drift": "dte-ember-drift 9s linear infinite"
      },
      keyframes: {
        "dte-flicker-in": {
          "0%": { opacity: "0", transform: "translateY(14px) scale(0.98)" },
          "60%": { opacity: "1" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" }
        },
        "dte-reveal-up": {
          "0%": { opacity: "0", transform: "translateY(26px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "dte-ember-drift": {
          "0%": { transform: "translateY(0) translateX(0)" },
          "100%": { transform: "translateY(-120px) translateX(24px)" }
        }
      }
    }
  }
};

export default dtePreset;
