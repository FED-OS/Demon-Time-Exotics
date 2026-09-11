/**
 * Section components for the DTE landing site.
 *
 * Sections mirror the anchors rendered in index.html:
 *   #top (hero) • #content • #pillars • #roster • #hub • #support
 *
 * The live page is vanilla TS/HTML (ADR-0007); these modules are the
 * typed upgrade path for a componentized future rewrite.
 */
export const sectionComponents = [
  "Hero",
  "TopContent",
  "Pillars",
  "Roster",
  "PlatformHub",
  "Support"
] as const;

export type SectionComponent = (typeof sectionComponents)[number];
