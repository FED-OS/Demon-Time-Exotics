/**
 * @dte/mobile — store scaffold.
 *
 * Minimal typed store surface for when state graduates beyond local
 * useState (alerts prefs, watched-video cache, member status).
 * Zustand is the intended target (ROADMAP Phase 2); this module pins
 * the public API first so the swap is non-breaking.
 */
export interface AlertsPrefs {
  breaking: boolean;
  uploads: boolean;
  live: boolean;
  members: boolean;
  merch: boolean;
}

export const DEFAULT_ALERTS: AlertsPrefs = {
  breaking: true,
  uploads: true,
  live: false,
  members: false,
  merch: false
};

export interface WatchCache {
  lastWatchedTitle: string | null;
  seenCount: number;
}

export const DEFAULT_WATCH_CACHE: WatchCache = {
  lastWatchedTitle: null,
  seenCount: 0
};

export interface MobileStore {
  alerts: AlertsPrefs;
  watch: WatchCache;
  setAlert(key: keyof AlertsPrefs, value: boolean): void;
  markWatched(title: string): void;
}

/** Pure reference implementation (no reactivity) for tests. */
export function createStore(): MobileStore {
  let alerts = { ...DEFAULT_ALERTS };
  let watch = { ...DEFAULT_WATCH_CACHE };
  return {
    get alerts() {
      return alerts;
    },
    get watch() {
      return watch;
    },
    setAlert(key, value) {
      alerts = { ...alerts, [key]: value };
    },
    markWatched(title) {
      watch = { lastWatchedTitle: title, seenCount: watch.seenCount + 1 };
    }
  };
}
