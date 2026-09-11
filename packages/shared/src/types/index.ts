/**
 * @dte/shared — types module.
 *
 * The shared type vocabulary for the whole monorepo. Data shapes that
 * travel between apps live next to their constants (see constants/
 * index.ts); host-specific types (Tauri AppInfo, Electron DteGlobal,
 * RN AlertPrefs) are defined once here so no app invents a drift copy.
 */

// Re-export the data-carrier types shipped with the constants module.
export type { Platform, TopVideo, RosterFigure, Pillar, Affiliate } from "../constants/index.js";

/** Immutable snapshot of channel stats (matches CHANNEL_STATS). */
export interface ChannelStatsSnapshot {
  subscribers: number;
  videos: number;
  totalViews: number;
}

/** App runtime info returned by desktop hosts (Tauri / Electron IPC). */
export interface AppInfo {
  version: string;
  platform: string;
}

/** Live stream status surfaced by the Rust core (spawn/check command). */
export interface StreamStatus {
  live: boolean;
  platform: "youtube" | "twitch" | "offline";
  message: string;
}

/** Result envelope for risky host operations (open-external etc.). */
export interface HostResult {
  ok: boolean;
  error?: string;
}

/** Alert toggles persisted by the mobile app (AsyncStorage-backed). */
export interface AlertsPrefs {
  breaking: boolean;
  uploads: boolean;
  live: boolean;
  members: boolean;
  merch: boolean;
}

export const DEFAULT_ALERTS_PREFS: AlertsPrefs = {
  breaking: true,
  uploads: true,
  live: true,
  members: false,
  merch: false
};

/** Cached watch-card entry (mobile store reference implementation). */
export interface WatchCacheEntry {
  videoTitle: string;
  category: string;
  watchedAt: number;
}

/** Brand token names shared by CSS layers in every app. */
export type BrandToken =
  | "fire"
  | "inferno"
  | "purple"
  | "gold"
  | "ink"
  | "paper";

/** The four build surfaces this repo ships. */
export type AppSurface = "landing" | "tauri" | "electron" | "mobile";

/** Result of a Turborepo-informed build step (tooling scripts). */
export interface BuildOutcome {
  app: AppSurface;
  ok: boolean;
  durationMs: number;
  artifacts: string[];
}
