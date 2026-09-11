/**
 * Lib utilities for @dte/landing.
 *
 * Single source of truth consumers should import shared constants from
 * @dte/shared (workspace package). These helpers are landing-local:
 * formatting, anchor navigation and the stats card numbers used by
 * index.html / script.ts.
 */
import { CHANNEL_STATS, formatCompact } from "@dte/shared";

export { formatCompact };

/** Local typed view of channel stats for the hero stats card. */
export const statsCard = [
  { label: "Subscribers", value: CHANNEL_STATS.subscribers, display: formatCompact(CHANNEL_STATS.subscribers) },
  { label: "Videos", value: CHANNEL_STATS.videos, display: formatCompact(CHANNEL_STATS.videos) },
  { label: "Total Views", value: CHANNEL_STATS.totalViews, display: formatCompact(CHANNEL_STATS.totalViews) }
] as const;

export type StatCardItem = (typeof statsCard)[number];

/** Smooth-scroll to a section anchor, respecting reduced motion. */
export function scrollToSection(id: string): void {
  const el = document.getElementById(id.replace(/^#/, ""));
  if (!el) return;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
}
