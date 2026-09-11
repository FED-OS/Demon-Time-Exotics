/**
 * @dte/ui — themes.
 *
 * The brand token layer: every color, font, shadow and radius the DTE
 * surfaces use, expressed once here and consumed by CSS layers via
 * `applyThemeVars()` (CSS custom properties) or the Tailwind config.
 */

export type BrandTokenName =
  | "fire"
  | "inferno"
  | "purple"
  | "gold"
  | "ember"
  | "ink"
  | "ink-soft"
  | "paper"
  | "muted";

export interface ThemeVars {
  fire: string;
  inferno: string;
  purple: string;
  gold: string;
  ember: string;
  ink: string;
  inkSoft: string;
  paper: string;
  muted: string;
  fontDisplay: string;
  fontBody: string;
  radiusSm: string;
  radiusMd: string;
  radiusLg: string;
  shadowEmber: string;
  shadowPurple: string;
  gradientFire: string;
  gradientPurple: string;
}

/** The one true DTE theme (fire on near-black). */
export const dteTheme: ThemeVars = {
  fire: "#ff5e1a",
  inferno: "#ff2e00",
  purple: "#8b2fd6",
  gold: "#f5a623",
  ember: "#ffb98a",
  ink: "#050505",
  inkSoft: "#0d0d0d",
  paper: "#f4f4f5",
  muted: "#a3a3ab",
  fontDisplay: "'Bebas Neue', 'Arial Narrow', sans-serif",
  fontBody: "'Inter', system-ui, -apple-system, sans-serif",
  radiusSm: "10px",
  radiusMd: "16px",
  radiusLg: "24px",
  shadowEmber: "0 10px 40px -12px rgba(255, 94, 26, 0.45)",
  shadowPurple: "0 10px 40px -12px rgba(139, 47, 214, 0.45)",
  gradientFire: "linear-gradient(135deg, #ff5e1a 0%, #ff2e00 55%, #f5a623 120%)",
  gradientPurple: "linear-gradient(135deg, #8b2fd6 0%, #5b1f9e 100%)"
};

/** CSS custom-property names for each theme var (—dte-*). */
export const THEME_CSS_VARS: Record<keyof ThemeVars, string> = {
  fire: "--dte-fire",
  inferno: "--dte-inferno",
  purple: "--dte-purple",
  gold: "--dte-gold",
  ember: "--dte-ember",
  ink: "--dte-ink",
  inkSoft: "--dte-ink-soft",
  paper: "--dte-paper",
  muted: "--dte-muted",
  fontDisplay: "--dte-font-display",
  fontBody: "--dte-font-body",
  radiusSm: "--dte-radius-sm",
  radiusMd: "--dte-radius-md",
  radiusLg: "--dte-radius-lg",
  shadowEmber: "--dte-shadow-ember",
  shadowPurple: "--dte-shadow-purple",
  gradientFire: "--dte-gradient-fire",
  gradientPurple: "--dte-gradient-purple"
};

/** Apply the theme as CSS custom properties on a root element. */
export function applyThemeVars(root: HTMLElement | null = document.documentElement): void {
  if (!root) return;
  for (const [key, value] of Object.entries(dteTheme)) {
    const cssVar = THEME_CSS_VARS[key as keyof ThemeVars];
    if (cssVar) root.style.setProperty(cssVar, value);
  }
}

/** Read a theme value back (useful for canvas ember colors). */
export function themeVar(name: keyof ThemeVars): string {
  return dteTheme[name];
}

/** High-contrast mode (future a11y toggle) flips paper/ink. */
export const dteThemeHighContrast: ThemeVars = {
  ...dteTheme,
  ink: "#000000",
  inkSoft: "#111111",
  paper: "#ffffff",
  muted: "#e6e6ee",
  fire: "#ff7a3d",
  ember: "#ffd2b2"
};
