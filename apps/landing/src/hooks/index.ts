/**
 * Hooks scaffold for @dte/landing (vanilla TS edition).
 *
 * The live site uses plain DOM APIs (see src/script.ts). These hooks
 * exist as the typed/composable upgrade path if React is introduced.
 *
 * ⚠️ No React import here — this module is framework-free by design
 * so `tsc --noEmit` passes without installing react types.
 */
export interface RevealOptions {
  threshold?: number;
  rootMargin?: string;
}

export const defaultRevealOptions: RevealOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -40px 0px"
};

export interface CounterOptions {
  duration?: number;
  format?: (value: number) => string;
}

export const defaultCounterOptions: CounterOptions = {
  duration: 1600
};

/** Channel stats mirrored from src/script.ts data-count attributes. */
export const channelStats = {
  subscribers: 21200,
  videos: 406,
  totalViews: 3025509
} as const;
