/**
 * Lib utilities for @dte/mobile.
 *
 * Re-exports the shared data layer (@dte/shared) plus mobile-local
 * helpers (open-platform allowlist mirrors the desktop apps).
 */
import { Linking } from "react-native";
import { PLATFORMS } from "@dte/shared";

export { PLATFORMS, TOP_VIDEOS, ROSTER, AFFILIATES, CHANNEL_STATS } from "@dte/shared";

const ALLOWED_URL_PREFIXES = [
  "https://www.youtube.com/",
  "https://youtube.com/",
  "https://www.instagram.com/",
  "https://www.twitch.tv/",
  "https://shopdemontimeexotics.com/",
  "https://ko-fi.com/",
  "https://www.rei.com/",
  "https://www.sweetwater.com/",
  "https://www.guitarcenter.com/",
  "https://www.bestbuy.com/"
];

/** Guard: only allowlisted domains may be opened externally. */
export function isAllowedUrl(url: string): boolean {
  return ALLOWED_URL_PREFIXES.some((p) => url.startsWith(p));
}

/** Open an external platform URL if allowlisted. */
export async function openPlatform(url: string): Promise<boolean> {
  if (!isAllowedUrl(url)) return false;
  try {
    await Linking.openURL(url);
    return true;
  } catch {
    return false;
  }
}
