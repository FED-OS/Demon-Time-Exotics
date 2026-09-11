/**
 * @dte/mobile — screen module stubs.
 *
 * Expo Router file-routes under app/ ARE the screens today (ADR-0004).
 * This module maps them for non-router consumers (tests, storybook).
 */
export const screens = [
  { route: "/", file: "app/index.tsx", name: "Splash" },
  { route: "/(tabs)/watch", file: "app/(tabs)/watch.tsx", name: "Watch" },
  { route: "/(tabs)/roster", file: "app/(tabs)/roster.tsx", name: "Roster" },
  { route: "/(tabs)/hub", file: "app/(tabs)/hub.tsx", name: "Hub" },
  { route: "/(tabs)/alerts", file: "app/(tabs)/alerts.tsx", name: "Alerts" },
  { route: "/(tabs)/more", file: "app/(tabs)/more.tsx", name: "More" }
] as const;

export type Screen = (typeof screens)[number];
export default screens;
