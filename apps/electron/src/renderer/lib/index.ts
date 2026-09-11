/**
 * Lib utilities for @dte/electron renderer.
 *
 * Thin, typed access to the preload bridge plus shared formatting.
 * Never import "electron" here — renderer must stay Node-free
 * (contextIsolation: true, sandbox: true, ADR-0003).
 */
import { PLATFORMS } from "@dte/shared";

export { PLATFORMS };

export interface DteGlobal {
  appInfo(): Promise<{ version: string; platform: string; electron: string }>;
  openExternal(url: string): Promise<{ ok: boolean; error?: string }>;
  channelStats(): Promise<{ subscribers: number; videos: number; totalViews: number }>;
}

/** Type-safe fetch of the preload-injected global. */
export function getDteApi(): DteGlobal | null {
  return typeof window !== "undefined" && "dte" in window
    ? (window as unknown as { dte: DteGlobal }).dte
    : null;
}

export const formatCompact = (n: number): string =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : n >= 1_000 ? `${Math.round(n / 100) / 10}K` : `${n}`;
