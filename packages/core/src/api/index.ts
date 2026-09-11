/**
 * @dte/core — API layer.
 *
 * A tiny fetch wrapper around the (optional) DTE public endpoints.
 * The channel is YouTube-first; there is no public REST API today, so
 * the client degrades gracefully: offline mode returns the @dte/shared
 * snapshot so every app renders identical stats with zero network.
 */

import { CHANNEL_STATS, type ChannelStatsSnapshot } from "@dte/shared";

export type ApiEnv = "production" | "staging" | "offline";

export interface ApiClientOptions {
  env?: ApiEnv;
  baseUrl?: string;
  fetchImpl?: typeof fetch;
  timeoutMs?: number;
}

export const DEFAULT_BASE_URLS: Record<Exclude<ApiEnv, "offline">, string> = {
  production: "https://dtemoney448.github.io/demon-time-exotics/api",
  staging: "https://dtemoney448.github.io/demon-time-exotics/api-staging"
};

/** Stats payload shape served over HTTP (mirrors the snapshot). */
export interface RemoteStatsPayload extends ChannelStatsSnapshot {
  fetchedAt: string;
}

export class ApiError extends Error {
  constructor(message: string, readonly status?: number) {
    super(message);
    this.name = "ApiError";
  }
}

export class ApiClient {
  readonly env: ApiEnv;
  private readonly baseUrl: string | null;
  private readonly fetchImpl: typeof fetch;
  private readonly timeoutMs: number;

  constructor(options: ApiClientOptions = {}) {
    this.env = options.env ?? "offline";
    this.baseUrl =
      this.env === "offline" ? null : options.baseUrl ?? DEFAULT_BASE_URLS[this.env];
    this.fetchImpl = options.fetchImpl ?? globalThis.fetch?.bind(globalThis) ?? null;
    this.timeoutMs = options.timeoutMs ?? 8_000;
  }

  /** Stats with graceful offline fallback to the shared snapshot. */
  async getChannelStats(): Promise<RemoteStatsPayload> {
    if (this.env === "offline" || this.baseUrl === null || this.fetchImpl === null) {
      return this.snapshotPayload();
    }
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), this.timeoutMs);
      const response = await this.fetchImpl(`${this.baseUrl}/stats.json`, {
        signal: controller.signal
      });
      clearTimeout(timer);
      if (!response.ok) throw new ApiError(`stats.json responded ${response.status}`, response.status);
      return (await response.json()) as RemoteStatsPayload;
    } catch {
      // Network unavailable → snapshot (apps never hard-fail on stats).
      return this.snapshotPayload();
    }
  }

  private snapshotPayload(): RemoteStatsPayload {
    return { ...CHANNEL_STATS, fetchedAt: "snapshot" };
  }
}

/** Default offline-first client (apps swap in a real one when hosted). */
export const apiClient = new ApiClient({ env: "offline" });
