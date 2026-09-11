/**
 * Layout components for the DTE landing site.
 *
 * See also:
 * - ../sections/  — full page sections (hero, content, pillars, roster, hub, support)
 * - ../ui/        — reusable presentational pieces
 * - ../animations — motion helpers (embers, reveal, counters)
 *
 * The live page is vanilla TS/HTML (ADR-0007); these modules are the
 * typed upgrade path and are consumed by App.tsx / main.tsx if a
 * framework is introduced later.
 */
export const layoutComponents = ["Navbar", "Footer", "Shell"] as const;

export type LayoutComponent = (typeof layoutComponents)[number];
