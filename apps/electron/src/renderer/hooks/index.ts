/**
 * @dte/electron — renderer hooks scaffold (framework-free).
 *
 * Typed wrappers around the `window.dte` preload API so UI code has a
 * single, discoverable surface (see src/preload/index.ts).
 */
export const electronHookNames = [
  "useAppInfo",
  "useChannelStats",
  "useOpenExternal"
] as const;

export type ElectronHook = (typeof electronHookNames)[number];
