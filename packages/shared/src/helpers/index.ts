/**
 * @dte/shared — helpers module.
 *
 * Pure, dependency-free utilities shared by every app (landing, Tauri,
 * Electron, mobile). Keep these functions side-effect free so they can
 * run in the browser, in Node (Electron main), on RN (Hermes) and in
 * tests without shims. Anything that needs a host API (window, ipc,
 * Linking) stays in the app-local lib layer.
 */

import { CHANNEL_STATS, LINKS, YOUTUBE_IDS } from "../constants/index.js";

/**
 * Domains we permit the apps to open externally. Every open-external
 * path (Electron IPC, Tauri opener, RN Linking) checks against this
 * allowlist — see SECURITY.md ("No unguarded shell.openExternal").
 */
export const ALLOWED_URL_PREFIXES: readonly string[] = [
  "https://www.youtube.com/",
  "https://youtube.com/",
  "https://www.instagram.com/",
  "https://www.twitch.tv/",
  "https://shopdemontimeexotics.com/",
  "https://ko-fi.com/",
  "https://www.rei.com/",
  "https://www.sweetwater.com/",
  "https://www.guitarcenter.com/",
  "https://www.bestbuy.com/",
  "https://github.com/DTEMONEY448/",
  "https://dtemoney448.github.io/",
  "mailto:Bigmoney@demontimeexotics.com"
];

/**
 * Format a number in YouTube-style compact notation.
 *
 *   406        -> "406"
 *   21_200     -> "21.2K"
 *   3_025_509  -> "3M"
 *
 * Used by the hero stat counters (data-count) in every app, so the
 * on-screen numbers tick up to the same final values everywhere.
 */
export function formatCompact(n: number): string {
  if (!Number.isFinite(n)) return "0";
  const abs = Math.abs(n);
  if (abs >= 1_000_000) {
    const m = n / 1_000_000;
    return `${m >= 10 ? Math.round(m) : Math.round(m * 10) / 10}M`;
  }
  if (abs >= 1_000) {
    const k = n / 1_000;
    return `${k >= 100 ? Math.round(k) : Math.round(k * 10) / 10}K`;
  }
  return `${Math.round(n)}`;
}

/**
 * Parse a compact view string ("217K", "3M", "1,204") back into a
 * number so ranked lists can be sorted numerically.
 */
export function parseCompactViews(value: string): number {
  const match = value.trim().replace(/,/g, "").match(/^([\d.]+)\s*([KMB])?$/i);
  if (!match) return 0;
  const base = Number.parseFloat(match[1]);
  const suffix = (match[2] ?? "").toUpperCase();
  const multiplier = suffix === "M" ? 1_000_000 : suffix === "K" ? 1_000 : suffix === "B" ? 1_000_000_000 : 1;
  return Number.isFinite(base) ? Math.round(base * multiplier) : 0;
}

/** "2022-09-28" / Date -> "Sep 28, 2022" (en-US, deterministic). */
export function formatDate(input: string | Date): string {
  const date = typeof input === "string" ? new Date(`${input}T00:00:00Z`) : input;
  if (Number.isNaN(date.getTime())) return String(input);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC"
  });
}

/** Truncate long titles on one line with an ellipsis. */
export function truncate(text: string, max = 64): string {
  return text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`;
}

/** Is this URL on the DTE allowlist? (host apps call before opening.) */
export function isAllowedUrl(url: string): boolean {
  return ALLOWED_URL_PREFIXES.some((prefix) => url.startsWith(prefix));
}

/** Build a YouTube channel URL (subscribe prompt optional). */
export function youtubeUrl(subscribe = false): string {
  return subscribe ? LINKS.youtubeSubscribe : LINKS.youtube;
}

/** Build the URL that opens this channel on YouTube by id. */
export function youtubeChannelUrl(id: keyof typeof YOUTUBE_IDS = "main"): string {
  return id === "main" ? LINKS.youtube : LINKS.youtubeBackup;
}

/** Build a YouTube embed URL for a video id (used by watch cards). */
export function youtubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${encodeURIComponent(videoId)}`;
}

/** Uppercase-first helper for tags/labels ("houston rapper" -> "Houston rapper"). */
export function capitalize(text: string): string {
  return text.length === 0 ? text : `${text[0].toUpperCase()}${text.slice(1)}`;
}

/**
 * Sort-top helper: given items with a compact "views" field, return the
 * highest-performing entries (the channel study ordering).
 */
export function topByViews<T extends { views: string }>(items: readonly T[], count = 5): T[] {
  return [...items].sort((a, b) => parseCompactViews(b.views) - parseCompactViews(a.views)).slice(0, count);
}

/** Current milestone deltas vs the CHANNEL_STATS snapshot (0-based). */
export function statDeltas(current: { subscribers: number; videos: number; totalViews: number }): {
  subscribers: number;
  videos: number;
  totalViews: number;
} {
  return {
    subscribers: current.subscribers - CHANNEL_STATS.subscribers,
    videos: current.videos - CHANNEL_STATS.videos,
    totalViews: current.totalViews - CHANNEL_STATS.totalViews
  };
}

/** Humanize a duration in seconds as m:ss / h:mm:ss (video cards). */
export function formatDuration(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3_600);
  const m = Math.floor((s % 3_600) / 60);
  const sec = s % 60;
  const mm = h > 0 ? `${m}`.padStart(2, "0") : `${m}`;
  const ss = `${sec}`.padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

/** Stable hash-ish id for list keys where no natural key exists. */
export function slugId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

/** True when the runtime prefers reduced motion (counters pause ticking). */
export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;
}
