/**
 * @dte/mobile — navigation constants.
 *
 * Expo Router (ADR-0004) derives navigation from the app/ directory;
 * this module centralizes route names + deep-link scheme so push
 * notifications and external links can target screens reliably.
 */
export const ROUTES = {
  ROOT: "/",
  WATCH: "/(tabs)/watch",
  ROSTER: "/(tabs)/roster",
  HUB: "/(tabs)/hub",
  ALERTS: "/(tabs)/alerts",
  MORE: "/(tabs)/more"
} as const;

export type Route = (typeof ROUTES)[keyof typeof ROUTES];

export const LINK_SCHEME = "demontimeexotics";

/** Build a deep link, e.g. demontimeexotics:///(tabs)/watch */
export const deepLink = (route: Route): string => `${LINK_SCHEME}://${route.replace(/^\//, "")}`;
