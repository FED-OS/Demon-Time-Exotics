# App Architecture

The one-liner first, because it holds: `@dte/shared` → `@dte/core` → `@dte/ui`, with the four surfaces at the top consuming all of it. This page is the wiki-altitude view. The full detail lives in [`docs/architecture/`](../docs/architecture/overview.md) — overview, monorepo, apps, packages, build pipeline, security, and the ADRs — and this page deliberately stays thin enough to not drift out of sync with it.

## The ladder

`@dte/shared` is the zero-dependency data spine: the channel constants (`CHANNEL`, `CHANNEL_STATS`, `YOUTUBE_IDS`, `LINKS`, `PLATFORMS`, `TOP_VIDEOS`, `ROSTER`, `PILLARS`, `AFFILIATES`), the 14 helpers (`formatCompact`, `isAllowedUrl`, and friends), and the shared type vocabulary. Nothing below it, everything above it. `@dte/core` builds services over those facts — `statCards`, `nextMilestones`, `statsOneLiner`, the link and roster and pillar and content services, the API client, the auth stubs, and the reactive stores — so surfaces ask questions instead of recomputing answers. `@dte/ui` packages the DOM-factory components (statsRow, hubGrid, rosterChips, pillarGrid, topContentList, supportPanel, heroCtas, fireTicker) plus themes and icons, per the framework-free pattern in ADR-0007.

Two side branches complete the picture: `@dte/assets` (data-only — branding, icons, images, fonts, with `manifest.json` as the contract of what exists) and the four `@dte/config-*` presets (eslint, typescript, tailwind, vite) that keep every workspace's tooling identical. All dependency edges point downward and the graph is acyclic by construction — `@dte/ui` imports `@dte/shared` and `@dte/core`, never the reverse, and no app imports another app.

## The four surfaces

**Landing** (`apps/landing`) is the static GitHub Pages site — framework-free DOM factories, built by Vite to `dist/index.html`, deployed by `deploy-landing.yml` on every push to `main`. **Tauri** (`apps/tauri`) wraps the same web surface in a Tauri 2 shell with a scoped capability file and a strict dev port. **Electron** (`apps/electron`) ships the same surface with a hardened main process — `contextIsolation: true`, `nodeIntegration: false`, `sandbox: true`, and a preload that exposes only the `window.dte` namespace — plus the one deliberate data mirror for `dte:channel-stats`. **Mobile** (`apps/mobile`) is Expo and React Native: the same `@dte/core` services and `@dte/shared` facts, rendered through RN components and `Linking.openURL` behind the same `isAllowedUrl` guard.

## The invariants worth memorizing

One source of truth for facts (ADR-0005) — a wrong number on any surface is wrong in `@dte/shared`, or in the single documented Electron mirror. One URL allowlist, three enforcers — `@dte/shared` ships the 13 prefixes, and the Electron main process and Tauri opener guard the URLs their processes open, with `isAllowedUrl` failing closed everywhere. Display forms are computed, never hand-formatted — `21200` renders as `21.2K` because `formatCompact` says so at render time. And the artifact contract — the four build outputs the release workflows consume — is the boundary where "works on my machine" becomes "ships." When any of these invariants and your change collide, the ADRs in [`docs/architecture/decisions.md`](../docs/architecture/decisions.md) are the record of why they're load-bearing, and changing one is an ADR conversation, not a drive-by.
