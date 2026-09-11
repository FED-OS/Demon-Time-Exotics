/**
 * @dte/core — types.
 *
 * Core-domain types that extend the @dte/shared vocabulary with the
 * richer service models (resolved links, stat cards, grouped figures,
 * content cards, api payloads, stores state).
 */

import type { AlertsPrefs, ChannelStatsSnapshot, WatchCacheEntry } from "@dte/shared";

// Re-export shared host types so apps can import everything from @dte/core.
export type {
  AlertsPrefs,
  ChannelStatsSnapshot,
  WatchCacheEntry,
  AppInfo,
  StreamStatus,
  HostResult,
  AppSurface
} from "@dte/shared";

// Services (links)
export type { ResolvedLink } from "../links.js";

// Services (stats)
export type { StatCard, Milestone } from "../stats.js";

// Services (figures)
export type { Figure, RosterGroup } from "../figures.js";

// Services (pillars)
export type { PillarEntry } from "../pillars.js";

// Services (content)
export type { ContentCard } from "../content.js";

// API layer
export type { ApiEnv, ApiClientOptions, RemoteStatsPayload } from "../api/index.js";

// Stores state shape persisted by hosts.
export interface PersistedState {
  stats: ChannelStatsSnapshot;
  alerts: AlertsPrefs;
  watchHistory: WatchCacheEntry[];
}

/** Union of every store the core exposes. */
export type CoreStore = "stats" | "alerts" | "watch";
