/**
 * Tauri API bridge for @dte/tauri.
 *
 * Centralizes `invoke` calls to the Rust core and external-URL opening
 * (which routes through the shell/opener plugin with user confirmation).
 * Keeping the bridge in one module means the rest of the frontend stays
 * framework-free and mockable in plain-browser dev mode.
 */
import { invoke as tauriInvoke } from "@tauri-apps/api/core";
import { open as openExternal } from "@tauri-apps/plugin-opener";

export interface AppInfo {
  version: string;
  platform: string;
}

/** Invoke a Rust command with a typed result. */
export function invoke<T>(command: string, payload?: Record<string, unknown>): Promise<T> {
  return tauriInvoke<T>(command, payload);
}

/** Open an external URL via the opener plugin (respects capability allowlist). */
export function openUrl(url: string): Promise<void> {
  return openExternal(url);
}

/** Fetch channel stats from the Rust core (cached in native memory). */
export function fetchChannelStats(): Promise<{ subscribers: number; videos: number; totalViews: number }> {
  return invoke("get_channel_stats");
}
