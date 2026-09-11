/**
 * @dte/ui — primitives.
 *
 * Framework-free DOM element factories (ADR-0007: the web surfaces are
 * vanilla TS). Each primitive returns a fully-styled, ready-to-mount
 * element so the apps never hand-roll markup strings.
 */

import { themeVar } from "../themes/index.js";

export type ButtonVariant = "fire" | "purple" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const BASE_BUTTON_STYLE: Partial<CSSStyleDeclaration> = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  borderRadius: "999px",
  fontFamily: themeVar("fontBody"),
  fontWeight: "600",
  letterSpacing: "0.02em",
  cursor: "pointer",
  border: "none",
  textDecoration: "none"
};

const BUTTON_VARIANTS: Record<ButtonVariant, Partial<CSSStyleDeclaration>> = {
  fire: { background: themeVar("gradientFire"), color: "#050505", boxShadow: themeVar("shadowEmber") },
  purple: { background: themeVar("gradientPurple"), color: "#ffffff", boxShadow: themeVar("shadowPurple") },
  ghost: { background: "rgba(255,255,255,0.04)", color: themeVar("paper"), border: "1px solid rgba(255,255,255,0.14)" }
};

const BUTTON_SIZES: Record<ButtonSize, Partial<CSSStyleDeclaration>> = {
  sm: { padding: "8px 16px", fontSize: "13px" },
  md: { padding: "12px 22px", fontSize: "15px" },
  lg: { padding: "16px 28px", fontSize: "17px" }
};

/** Create a brand button element. */
export function button(label: string, options: { variant?: ButtonVariant; size?: ButtonSize; href?: string } = {}): HTMLElement {
  const { variant = "fire", size = "md", href } = options;
  const el = href
    ? document.createElement("a")
    : document.createElement("button");
  if (href) {
    (el as HTMLAnchorElement).href = href;
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  }
  Object.assign(el.style, BASE_BUTTON_STYLE, BUTTON_VARIANTS[variant], BUTTON_SIZES[size]);
  el.textContent = label;
  return el;
}

/** Create a badge/chip element (roster chips, category tags). */
export function badge(text: string, tone: "fire" | "purple" | "gold" | "muted" = "muted"): HTMLElement {
  const el = document.createElement("span");
  const tones: Record<string, Partial<CSSStyleDeclaration>> = {
    fire: { background: "rgba(255,94,26,0.14)", color: themeVar("fire"), borderColor: "rgba(255,94,26,0.35)" },
    purple: { background: "rgba(139,47,214,0.14)", color: "#c9a6ff", borderColor: "rgba(139,47,214,0.35)" },
    gold: { background: "rgba(245,166,35,0.12)", color: themeVar("gold"), borderColor: "rgba(245,166,35,0.35)" },
    muted: { background: "rgba(255,255,255,0.05)", color: themeVar("muted"), borderColor: "rgba(255,255,255,0.14)" }
  };
  Object.assign(el.style, {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "4px 10px",
    borderRadius: "999px",
    border: "1px solid",
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    ...tones[tone]
  } as Partial<CSSStyleDeclaration>);
  el.textContent = text;
  return el;
}

/** Create a stat block (label + big number). */
export function statBlock(label: string, value: string): HTMLElement {
  const wrap = document.createElement("div");
  const strong = document.createElement("strong");
  const span = document.createElement("span");
  Object.assign(strong.style, {
    display: "block",
    fontFamily: themeVar("fontDisplay"),
    fontSize: "34px",
    lineHeight: "1",
    background: themeVar("gradientFire"),
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent"
  } as Partial<CSSStyleDeclaration>);
  Object.assign(span.style, {
    display: "block",
    marginTop: "4px",
    fontSize: "12px",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: themeVar("muted")
  });
  strong.textContent = value;
  span.textContent = label;
  wrap.append(strong, span);
  return wrap;
}

/** Create a card container (glass panel). */
export function card(children: HTMLElement[], options: { tone?: "ink" | "purple" } = {}): HTMLElement {
  const el = document.createElement("div");
  Object.assign(el.style, {
    background: options.tone === "purple" ? "rgba(139,47,214,0.07)" : "rgba(13,13,13,0.9)",
    border: options.tone === "purple" ? "1px solid rgba(139,47,214,0.4)" : "1px solid rgba(255,255,255,0.08)",
    borderRadius: themeVar("radiusMd"),
    padding: "20px",
    boxShadow: options.tone === "purple" ? themeVar("shadowPurple") : "none"
  } as Partial<CSSStyleDeclaration>);
  el.append(...children);
  return el;
}

/** Create an icon bullet (emoji icon + text). */
export function iconBullet(icon: string, text: string): HTMLElement {
  const el = document.createElement("div");
  const iconEl = document.createElement("span");
  const textEl = document.createElement("span");
  Object.assign(el.style, { display: "flex", alignItems: "center", gap: "10px" } as Partial<CSSStyleDeclaration>);
  Object.assign(iconEl.style, { fontSize: "20px", lineHeight: "1" } as Partial<CSSStyleDeclaration>);
  Object.assign(textEl.style, { color: themeVar("paper"), fontSize: "14px" } as Partial<CSSStyleDeclaration>);
  iconEl.textContent = icon;
  textEl.textContent = text;
  el.append(iconEl, textEl);
  return el;
}
