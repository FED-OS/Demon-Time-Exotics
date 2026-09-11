/**
 * @dte/shared — barrel export.
 *
 * Single source of truth for channel facts, helpers and types across
 * the DTE monorepo (ADR-0005). Apps do:
 *
 *   import { CHANNEL_STATS, PLATFORMS, formatCompact } from "@dte/shared";
 *
 * Deep imports also work via package.json exports:
 *   @dte/shared/constants, @dte/shared/helpers, @dte/shared/types
 */

// Constants — the data layer.
export {
  CHANNEL,
  CHANNEL_STATS,
  YOUTUBE_IDS,
  LINKS,
  PLATFORMS,
  TOP_VIDEOS,
  ROSTER,
  PILLARS,
  AFFILIATES
} from "./constants/index.js";

// Types shipped with the constants (interfaces + value types).
export type { Platform, TopVideo, RosterFigure, Pillar, Affiliate } from "./constants/index.js";

// Helpers — pure utilities.
export {
  ALLOWED_URL_PREFIXES,
  formatCompact,
  parseCompactViews,
  formatDate,
  truncate,
  isAllowedUrl,
  youtubeUrl,
  youtubeChannelUrl,
  youtubeEmbedUrl,
  capitalize,
  topByViews,
  statDeltas,
  formatDuration,
  slugId,
  prefersReducedMotion
} from "./helpers/index.js";

// Types — shared type vocabulary.
export type {
  ChannelStatsSnapshot,
  AppInfo,
  StreamStatus,
  HostResult,
  AlertsPrefs,
  WatchCacheEntry,
  BrandToken,
  AppSurface,
  BuildOutcome
} from "./types/index.js";

export { DEFAULT_ALERTS_PREFS } from "./types/index.js";
