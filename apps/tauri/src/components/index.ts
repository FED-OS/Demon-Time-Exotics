/**
 * @dte/tauri — components scaffold.
 *
 * Class contracts that mirror src/styles/styles.css:
 *   .topbar / .brand / .brand-sub — window chrome
 *   .hero / .title / .tagline / .stats / .stat — hero block
 *   .panel / .section-title / .grid / .hub-card — platform hub
 *   .statusbar / #rust-status — native status strip
 *
 * main.ts renders these today with plain DOM APIs; these stubs are the
 * componentized upgrade path.
 */
export const tauriComponents = [
  "TopBar",
  "Hero",
  "PlatformHub",
  "StatusBar",
  "HubCard"
] as const;

export type TauriComponent = (typeof tauriComponents)[number];
