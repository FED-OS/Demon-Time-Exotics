/**
 * @dte/core — links service.
 *
 * Domain logic over the shared LINKS constant: resolution, validation
 * and grouping of every external URL the apps surface. The single
 * source of truth for the raw URLs is @dte/shared (ADR-0005); this
 * module turns them into the richer structures the UI needs.
 */

import { LINKS, YOUTUBE_IDS, isAllowedUrl, youtubeChannelUrl } from "@dte/shared";

export interface ResolvedLink {
  key: string;
  label: string;
  url: string;
  allowed: boolean;
  group: "watch" | "social" | "shop" | "support" | "meta";
}

/** Full link registry (labels + grouping) for menus, hub grids, footers. */
export function resolveLinks(): ResolvedLink[] {
  const entries: Array<[string, string, ResolvedLink["group"]]> = [
    ["youtube", "YouTube — THE MESSY SHOW", "watch"],
    ["youtubeSubscribe", "Subscribe on YouTube", "watch"],
    ["youtubeBackup", "DTECLIPS (backup channel)", "watch"],
    ["membership", "Become a member", "support"],
    ["instagram", "Instagram", "social"],
    ["twitch", "Twitch", "watch"],
    ["merch", "Merch store", "shop"],
    ["kofi", "Ko-fi — buy a coffee", "support"],
    ["email", "Business email", "meta"],
    ["github", "GitHub repo", "meta"],
    ["pages", "Landing page", "meta"]
  ];
  return entries.map(([key, label, group]) => {
    const url = LINKS[key as keyof typeof LINKS] as string;
    return { key, label, url, allowed: isAllowedUrl(url), group };
  });
}

/** Links grouped for rendering (hub cards, footer columns). */
export function linksByGroup(): Record<ResolvedLink["group"], ResolvedLink[]> {
  const grouped = { watch: [], social: [], shop: [], support: [], meta: [] } as Record<
    ResolvedLink["group"],
    ResolvedLink[]
  >;
  for (const link of resolveLinks()) grouped[link.group].push(link);
  return grouped;
}

/** The two YouTube channels with resolved URLs. */
export function youtubeChannels(): Array<{ id: string; label: string; url: string }> {
  return [
    { id: YOUTUBE_IDS.main, label: "DTEMONEY448 (main)", url: youtubeChannelUrl("main") },
    { id: YOUTUBE_IDS.backup, label: "DTECLIPS (backup)", url: youtubeChannelUrl("backup") }
  ];
}

/** Guarded subscribe URL (what every "Subscribe" CTA should use). */
export function subscribeUrl(): string {
  return LINKS.youtubeSubscribe;
}

/** Guarded membership URL. */
export function membershipUrl(): string {
  return LINKS.membership;
}

/** Guarded merch URL. */
export function merchUrl(): string {
  return LINKS.merch;
}

/** Guarded Ko-fi URL. */
export function supportUrl(): string {
  return LINKS.kofi;
}
