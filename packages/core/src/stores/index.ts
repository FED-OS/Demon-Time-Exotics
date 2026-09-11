/**
 * @dte/core — stores.
 *
 * Minimal observable stores (pub/sub) shared by desktop and mobile.
 * No external state library — the DTE surfaces are small enough that
 * a ~40-line store keeps the bundle honest (see ADR-0001 notes).
 */

import { CHANNEL_STATS, DEFAULT_ALERTS_PREFS, type AlertsPrefs, type ChannelStatsSnapshot, type WatchCacheEntry } from "@dte/shared";

type Listener<T> = (value: T) => void;
type Unsubscribe = () => void;

/** Base store: get / set / subscribe. */
export class Store<T> {
  private listeners = new Set<Listener<T>>();

  constructor(private value: T) {}

  get(): T {
    return this.value;
  }

  set(next: T): void {
    this.value = next;
    for (const listener of this.listeners) listener(next);
  }

  subscribe(listener: Listener<T>): Unsubscribe {
    this.listeners.add(listener);
    listener(this.value);
    return () => this.listeners.delete(listener);
  }
}

/** Channel stats store (starts on the shared snapshot). */
export const statsStore = new Store<ChannelStatsSnapshot>({ ...CHANNEL_STATS });

/** Alert-preferences store (mobile alerts tab backing). */
export const alertsStore = new Store<AlertsPrefs>({ ...DEFAULT_ALERTS_PREFS });

/** Watch-history store (most recent first, capped at 20). */
export const watchStore = new Store<WatchCacheEntry[]>([]);

/** Record a watch in the history store. */
export function recordWatch(entry: WatchCacheEntry): void {
  const next = [entry, ...watchStore.get().filter((e) => e.videoTitle !== entry.videoTitle)].slice(0, 20);
  watchStore.set(next);
}

/** Hydrate a store from persisted JSON (AsyncStorage / localStorage). */
export function hydrate<T>(store: Store<T>, persisted: T | null | undefined): void {
  if (persisted !== null && persisted !== undefined) store.set(persisted);
}
