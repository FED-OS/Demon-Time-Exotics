/**
 * @dte/tauri — hooks scaffold (framework-free).
 *
 * Typed wrappers around Tauri events/commands so UI code never touches
 * @tauri-apps/api directly (single point of change, see lib/tauri.ts).
 */
export const tauriHookNames = [
  "useAppInfo",
  "useChannelStats",
  "useOpenExternal",
  "useRustEvent"
] as const;

export type TauriHook = (typeof tauriHookNames)[number];
