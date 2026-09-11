/**
 * @dte/ui — components.
 *
 * Higher-level brand components composed from the primitives and the
 * @dte/core services: stat-card rows, hub grids, roster chips, pillar
 * cards and the support panel. All framework-free DOM builders that
 * the landing/desktop surfaces mount directly.
 */

import { statCards, topContent, allFigures, allPillars } from "@dte/core";
import { PLATFORMS, LINKS, prefersReducedMotion } from "@dte/shared";
import { button, badge, statBlock, card, iconBullet } from "../primitives/index.js";
import { icon } from "../icons/index.js";
import type { ButtonVariant } from "../primitives/index.js";

/** A row of the three hero stat blocks (with tick-up animation). */
export function statsRow(): HTMLElement {
  const row = document.createElement("div");
  Object.assign(row.style, {
    display: "flex",
    flexWrap: "wrap",
    gap: "28px",
    justifyContent: "center"
  } as Partial<CSSStyleDeclaration>);
  for (const card of statCards()) {
    const block = statBlock(card.label, card.display);
    block.dataset.raw = String(card.raw);
    row.append(block);
  }
  return row;
}

/** The platform hub grid (6 cards). */
export function hubGrid(): HTMLElement {
  const grid = document.createElement("div");
  Object.assign(grid.style, {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "14px"
  } as Partial<CSSStyleDeclaration>);
  for (const platform of PLATFORMS) {
    const title = document.createElement("strong");
    Object.assign(title.style, {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontFamily: "var(--dte-font-display, 'Bebas Neue', sans-serif)",
      fontSize: "20px",
      letterSpacing: "0.06em",
      color: "#fff"
    } as Partial<CSSStyleDeclaration>);
    title.textContent = `${platform.icon} ${platform.name}`;
    const note = document.createElement("span");
    Object.assign(note.style, { fontSize: "13px", color: "var(--dte-muted, #a3a3ab)" } as Partial<CSSStyleDeclaration>);
    note.textContent = platform.note;
    const handle = document.createElement("span");
    handle.textContent = platform.handle;
    const platformCard = card([title, note, handle], { tone: "ink" });
    const anchor = document.createElement("a");
    anchor.href = platform.url;
    anchor.setAttribute("target", "_blank");
    anchor.setAttribute("rel", "noopener noreferrer");
    anchor.style.textDecoration = "none";
    anchor.style.color = "inherit";
    anchor.append(platformCard);
    grid.append(anchor);
  }
  return grid;
}

/** Roster chips row (all covered figures). */
export function rosterChips(): HTMLElement {
  const wrap = document.createElement("div");
  Object.assign(wrap.style, {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    justifyContent: "center"
  } as Partial<CSSStyleDeclaration>);
  allFigures().forEach((figure, index) => {
    const chip = badge(`${figure.icon} ${figure.name}`, index % 3 === 2 ? "purple" : "fire");
    chip.title = figure.tag;
    wrap.append(chip);
  });
  return wrap;
}

/** Pillar cards grid (content coverage). */
export function pillarGrid(): HTMLElement {
  const grid = document.createElement("div");
  Object.assign(grid.style, {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "14px"
  } as Partial<CSSStyleDeclaration>);
  allPillars().forEach((pillar, index) => {
    const title = document.createElement("strong");
    Object.assign(title.style, {
      display: "block",
      fontFamily: "var(--dte-font-display, 'Bebas Neue', sans-serif)",
      fontSize: "21px",
      letterSpacing: "0.06em",
      color: "#fff",
      marginBottom: "6px"
    } as Partial<CSSStyleDeclaration>);
    title.textContent = `${pillar.icon} ${pillar.title}`;
    const text = document.createElement("span");
    Object.assign(text.style, { fontSize: "13.5px", lineHeight: "1.55", color: "var(--dte-muted, #a3a3ab)", display: "block" } as Partial<CSSStyleDeclaration>);
    text.textContent = pillar.description;
    grid.append(card([title, text], { tone: index % 3 === 2 ? "purple" : "ink" }));
  });
  return grid;
}

/** Top-content cards (ranked video list). */
export function topContentList(limit = 6): HTMLElement {
  const wrap = document.createElement("div");
  Object.assign(wrap.style, { display: "grid", gap: "12px" } as Partial<CSSStyleDeclaration>);
  topContent(limit).forEach((item) => {
    const title = document.createElement("strong");
    Object.assign(title.style, {
      display: "block",
      fontSize: "15px",
      color: "#fff",
      lineHeight: "1.4",
      marginBottom: "8px"
    } as Partial<CSSStyleDeclaration>);
    title.textContent = item.title;
    const meta = document.createElement("div");
    meta.append(badge(`#${item.rank}`, "gold"), badge(item.views, "fire"), badge(item.category, "muted"));
    Object.assign(meta.style, { display: "flex", gap: "6px", flexWrap: "wrap" } as Partial<CSSStyleDeclaration>);
    const entry = card([title, meta], { tone: "ink" });
    const anchor = document.createElement("a");
    anchor.href = item.searchUrl;
    anchor.setAttribute("target", "_blank");
    anchor.setAttribute("rel", "noopener noreferrer");
    anchor.append(entry);
    wrap.append(anchor);
  });
  return wrap;
}

/** The support panel (subscribe / member / merch / Ko-fi). */
export function supportPanel(): HTMLElement {
  const panel = document.createElement("div");
  Object.assign(panel.style, {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    justifyContent: "center",
    alignItems: "center"
  } as Partial<CSSStyleDeclaration>);
  panel.append(
    button(`${icon("subscribe")} Subscribe`, { variant: "fire", href: LINKS.youtubeSubscribe }),
    button(`${icon("member")} Membership`, { variant: "purple", href: LINKS.membership }),
    button(`${icon("merch")} Merch`, { variant: "ghost", href: LINKS.merch }),
    button(`${icon("fire")} Ko-fi`, { variant: "ghost", href: LINKS.kofi })
  );
  return panel;
}

/** CTA row for a hero section. */
export function heroCtas(): HTMLElement {
  const row = document.createElement("div");
  Object.assign(row.style, {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    justifyContent: "center"
  } as Partial<CSSStyleDeclaration>);
  row.append(
    button(`▶ Watch THE MESSY SHOW`, { variant: "fire", size: "lg", href: LINKS.youtube }),
    button(`😈 Follow the movement`, { variant: "ghost", size: "lg", href: LINKS.instagram })
  );
  return row;
}

/** Reduced-motion-aware ticker (optional decorative marquee). */
export function fireTicker(text = "NO SCRIPTS · NO FILTERS · JUST FACTS"): HTMLElement {
  const el = document.createElement("div");
  Object.assign(el.style, {
    fontFamily: "var(--dte-font-display, 'Bebas Neue', sans-serif)",
    letterSpacing: "0.18em",
    fontSize: "13px",
    color: "var(--dte-fire, #ff5e1a)",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    overflow: "hidden"
  } as Partial<CSSStyleDeclaration>);
  el.textContent = prefersReducedMotion() ? text : `${text} · ${text} · ${text}`;
  return el;
}

export type { ButtonVariant };
