/**
 * @dte/mobile — hooks scaffold (framework-free core pieces).
 *
 * Typed wrappers around navigation, platform opening and stats so
 * screens stay thin and testable.
 */
export const mobileHookNames = [
  "useAlerts",
  "useDeepLink",
  "useOpenPlatform",
  "useChannelStats"
] as const;

export type MobileHook = (typeof mobileHookNames)[number];
