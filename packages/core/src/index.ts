/**
 * @dte/core — barrel export.
 *
 * The app-logic layer over @dte/shared. Apps import services, stores
 * and the api client from here:
 *
 *   import { statCards, statsStore, apiClient } from "@dte/core";
 *
 * Deep imports also work via package.json exports:
 *   @dte/core/links, /stats, /figures, /pillars, /content,
 *   /api, /auth, /stores, /types, /utils
 */

// Domain services.
export {
  resolveLinks,
  linksByGroup,
  youtubeChannels,
  subscribeUrl,
  membershipUrl,
  merchUrl,
  supportUrl
} from "./links.js";
export { statCards, nextMilestones, channelAverages, statsOneLiner, compareStats } from "./stats.js";
export { allFigures, figuresByGroup, findFigure, searchFigures, groupOf } from "./figures.js";
export { allPillars, findPillar, matchPillar } from "./pillars.js";
export { topContent, featuredContent, contentByFigure, topContentTotalViews, searchUrlFor } from "./content.js";

// API layer.
export { ApiClient, ApiError, apiClient, DEFAULT_BASE_URLS } from "./api/index.js";

// Auth stubs.
export { signIn, guestProfile, membershipRedirect } from "./auth/index.js";

// Stores.
export {
  Store,
  statsStore,
  alertsStore,
  watchStore,
  recordWatch,
  hydrate
} from "./stores/index.js";

// Utils.
export {
  deepClone,
  debounce,
  throttle,
  safeParse,
  detectHost,
  sleep,
  clamp,
  retry
} from "./utils/index.js";

// Types.
export type {
  ResolvedLink,
  StatCard,
  Milestone,
  Figure,
  RosterGroup,
  PillarEntry,
  ContentCard,
  ApiEnv,
  ApiClientOptions,
  RemoteStatsPayload,
  PersistedState,
  CoreStore,
  AlertsPrefs,
  ChannelStatsSnapshot,
  WatchCacheEntry,
  AppInfo,
  StreamStatus,
  HostResult,
  AppSurface
} from "./types/index.js";
export type { SupporterProfile, AuthResult } from "./auth/index.js";
export type { AuthProvider } from "./auth/index.js";
