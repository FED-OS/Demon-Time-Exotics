/**
 * @dte/mobile — shared components.
 *
 * Tab screens under app/(tabs)/ are self-contained today; these
 * component stubs mark the extraction path (BrandHeader, StatCard,
 * HubCard, GearCard, SupportPanel) as the app grows.
 */
export const mobileComponents = [
  "BrandHeader",
  "StatCard",
  "HubCard",
  "GearCard",
  "SupportPanel",
  "RosterChip"
] as const;

export type MobileComponent = (typeof mobileComponents)[number];
