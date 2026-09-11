/**
 * Animation helpers for the DTE landing site.
 *
 * These are the TS mirrors of the runtime behaviors implemented in
 * src/script.ts (vanilla TS, no framework — ADR-0007):
 *
 *   initEmbers()    — canvas fire/ember particle field
 *   initReveal()    — IntersectionObserver reveal-on-scroll (.reveal)
 *   initCounters()  — animated stat counters (data-count)
 *   initNav()       — mobile nav toggle
 *   initScrollGuard() — fixed-nav scroll offset guard
 *
 * Respect prefers-reduced-motion: the runtime disables particles and
 * reveals when the media query matches; keep that behavior if these
 * modules are ever promoted to the live boot path.
 */
export const animationModules = [
  "initEmbers",
  "initReveal",
  "initCounters",
  "initNav",
  "initScrollGuard"
] as const;

export type AnimationModule = (typeof animationModules)[number];
