/**
 * @dte/tauri — page modules scaffold.
 *
 * main.ts renders the whole single-window experience today; these
 * module stubs mark the future multi-view split (Watch / Roster /
 * Platforms / Settings) if the desktop app grows beyond the hub.
 */
export const tauriViews = [
  { id: "home", label: "Home", anchor: "#stats" },
  { id: "platforms", label: "Tap In", anchor: "#platforms" },
  { id: "settings", label: "Settings", anchor: "#settings" }
] as const;

export type TauriView = (typeof tauriViews)[number];
export default tauriViews;
