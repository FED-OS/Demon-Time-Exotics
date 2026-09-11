/**
 * @dte/electron — renderer components scaffold.
 *
 * Class contracts that mirror src/renderer/styles.css:
 *   .topbar / .brand / .brand-sub — window chrome
 *   .hero / .title / .tagline / .stats / .stat — hero block
 *   .panel / .section-title / .grid / .hub-card — platform hub
 *   .statusbar / #main-status — process status strip
 */
export const electronComponents = [
  "TopBar",
  "Hero",
  "PlatformHub",
  "StatusBar",
  "HubCard"
] as const;

export type ElectronComponent = (typeof electronComponents)[number];
