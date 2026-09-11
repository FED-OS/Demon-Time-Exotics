/**
 * Additional routes/pages scaffold for @dte/landing.
 *
 * index.html currently renders the entire single-page experience
 * (hero → content → pillars → roster → hub → support → footer).
 * These page modules are stubs for optional future routes that a
 * componentized rewrite could mount (ADR-0007 documents the decision).
 */
export const routes = [
  { path: "/", title: "Home — DEMON TIME EXOTICS", anchor: "#top" },
  { path: "/content", title: "Top Content", anchor: "#content" },
  { path: "/pillars", title: "Coverage Pillars", anchor: "#pillars" },
  { path: "/roster", title: "The Roster", anchor: "#roster" },
  { path: "/hub", title: "Platform Hub", anchor: "#hub" },
  { path: "/support", title: "Support the Show", anchor: "#support" }
] as const;

export type Route = (typeof routes)[number];
export default routes;
