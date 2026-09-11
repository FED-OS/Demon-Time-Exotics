/**
 * Reusable UI atoms for the DTE landing site.
 *
 * Class names intentionally match the stylesheet shipped at
 * src/styles/styles.css (.btn-fire, .btn-purple, .btn-ghost,
 * .stat-card, .content-card, .pillar-card, .hub-card, .roster-chip).
 * That keeps any future component rewrite visually 1:1 with the
 * vanilla page without a design-token migration.
 */
export const uiClasses = {
  buttons: ["btn", "btn-fire", "btn-purple", "btn-ghost"],
  cards: ["stat-card", "content-card", "pillar-card", "hub-card"],
  chrome: ["brand", "brand-logo", "navbar", "footer"],
  roster: ["roster-chip"]
} as const;

export type UiClass = string;

export const buttonVariant = (variant: "fire" | "purple" | "ghost"): string =>
  `btn btn-${variant}`;
