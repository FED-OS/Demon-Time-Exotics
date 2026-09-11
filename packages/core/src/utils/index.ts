/**
 * @dte/core — utils.
 *
 * Core-level conveniences that need slightly more context than the
 * pure @dte/shared helpers: deep clones, debounce/throttle for UI,
 * safe JSON parsing, and host-detection used by the api/stores.
 */

/** Structured clone fallback (older Hermes lacks it). */
export function deepClone<T>(value: T): T {
  if (typeof structuredClone === "function") return structuredClone(value);
  return JSON.parse(JSON.stringify(value)) as T;
}

/** Debounce a call (nav search, resize handlers). */
export function debounce<A extends unknown[]>(fn: (...args: A) => void, ms = 250): (...args: A) => void {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return (...args: A) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

/** Throttle a call (scroll listeners, ticker ticks). */
export function throttle<A extends unknown[]>(fn: (...args: A) => void, ms = 100): (...args: A) => void {
  let last = 0;
  return (...args: A) => {
    const now = Date.now();
    if (now - last >= ms) {
      last = now;
      fn(...args);
    }
  };
}

/** JSON.parse that never throws. */
export function safeParse<T>(text: string | null | undefined): T | null {
  if (!text) return null;
  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

/** Which surface are we running on? (Tauri window vs Electron vs web). */
export function detectHost(): "web" | "electron" | "tauri" {
  if (typeof window === "undefined") return "web";
  if ("__TAURI_INTERNALS__" in window) return "tauri";
  if ("dte" in window) return "electron";
  return "web";
}

/** Async sleep (polling helper for the api client). */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Clamp a number (progress bars, milestone percentages). */
export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

/** Retry an async op with linear backoff (api calls in dev). */
export async function retry<T>(fn: () => Promise<T>, attempts = 3, delayMs = 500): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      await sleep(delayMs * (i + 1));
    }
  }
  throw lastError;
}
