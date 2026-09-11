/**
 * @dte/electron — renderer pages scaffold.
 *
 * index.html renders the full single-window experience today; these
 * stubs mark the future multi-view split (Watch / Roster / Platforms /
 * Settings) if the Electron app grows beyond the hub.
 */
export const electronViews = [
  { id: "home", label: "Home", anchor: "#stats" },
  { id: "platforms", label: "Tap In", anchor: "#platforms" },
  { id: "settings", label: "Settings", anchor: "#settings" }
] as const;

export type ElectronView = (typeof electronViews)[number];
export default electronViews;
