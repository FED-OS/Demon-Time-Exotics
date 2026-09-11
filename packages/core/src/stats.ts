/**
 * @dte/core — stats service.
 *
 * Reads the CHANNEL_STATS snapshot from @dte/shared and derives the
 * display models every surface renders: the hero stat cards (ticking
 * counters), milestone math, and formatting for Rust/membership tiers.
 */

import { CHANNEL, CHANNEL_STATS, formatCompact, statDeltas } from "@dte/shared";

export interface StatCard {
  key: "subscribers" | "videos" | "totalViews";
  label: string;
  raw: number;
  display: string;
}

/** The three hero stat cards used by landing / desktop / mobile. */
export function statCards(): StatCard[] {
  return [
    { key: "subscribers", label: "Subscribers", raw: CHANNEL_STATS.subscribers, display: formatCompact(CHANNEL_STATS.subscribers) },
    { key: "videos", label: "Videos", raw: CHANNEL_STATS.videos, display: formatCompact(CHANNEL_STATS.videos) },
    { key: "totalViews", label: "Total Views", raw: CHANNEL_STATS.totalViews, display: formatCompact(CHANNEL_STATS.totalViews) }
  ];
}

/** Milestone thresholds the channel is marching toward. */
export interface Milestone {
  key: string;
  label: string;
  at: number;
  remaining: number;
  pct: number;
}

/** Next milestone per metric (25K subs, 500 videos, 5M views). */
export function nextMilestones(): Milestone[] {
  const targets: Array<[Milestone["key"], string, number, number]> = [
    ["subscribers-25k", "25K Subscribers", 25_000, CHANNEL_STATS.subscribers],
    ["videos-500", "500 Videos", 500, CHANNEL_STATS.videos],
    ["views-5m", "5M Total Views", 5_000_000, CHANNEL_STATS.totalViews]
  ];
  return targets.map(([key, label, at, current]) => ({
    key,
    label,
    at,
    remaining: Math.max(0, at - current),
    pct: Math.min(100, Math.round((current / at) * 100))
  }));
}

/** Averages derived from the snapshot. */
export function channelAverages(): {
  viewsPerVideo: number;
  viewsPerSubscriber: number;
  videosSinceLaunch: number;
  joined: string;
} {
  const viewsPerVideo = Math.round(CHANNEL_STATS.totalViews / Math.max(1, CHANNEL_STATS.videos));
  const viewsPerSubscriber = Math.round(CHANNEL_STATS.totalViews / Math.max(1, CHANNEL_STATS.subscribers));
  return {
    viewsPerVideo,
    viewsPerSubscriber,
    videosSinceLaunch: CHANNEL_STATS.videos,
    joined: CHANNEL.joined
  };
}

/** Human-readable one-liner for status bars ("21.2K subs · 406 videos · 3M views"). */
export function statsOneLiner(): string {
  return statCards()
    .map((card) => card.display)
    .join(" · ");
}

/** Compare a live fetch against the snapshot (positive = growth). */
export function compareStats(current: { subscribers: number; videos: number; totalViews: number }): {
  subscribers: number;
  videos: number;
  totalViews: number;
} {
  return statDeltas(current);
}
