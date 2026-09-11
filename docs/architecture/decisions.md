# Architecture Decision Records

The condensed ADR set for the Demon Time Exotics monorepo. The full narrative versions live in the root `ADR.md`; this file is the quick-reference digest with the status, context, and consequence of each decision on one page.

## ADR-0001 — pnpm + Turborepo monorepo

**Status: accepted.** Five shipping surfaces (web landing, Tauri, Electron, Expo mobile, shared packages) need one source tree with local linking, and pnpm's `workspace:*` protocol gives strict, symlinked local resolution while Turborepo schedules tasks across the dependency graph with content-addressed caching. The consequence is a Node 20+/pnpm 9+ requirement and the four workspace globs (`apps/*`, `packages/*`, `packages/config/*`, `tooling/*`) declared in `pnpm-workspace.yaml`. Rejected alternatives: npm workspaces (weaker isolation), separate repos (drift between surfaces), Lerna (maintenance mode).

## ADR-0002 — TypeScript + Vite as the web baseline

**Status: accepted.** Every web surface compiles with `tsc --noEmit` and bundles with Vite 5, targeting ES2022. Vite's dev-server speed and its base-path rewriting (essential for the GitHub Pages project-site `/demon-time-exotics/` prefix) outweighed webpack's configurability and esbuild's raw speed alone. The `@dte/config-vite` preset factories (`webPreset`, `tauriPreset`, `electronPreset`) keep each app's config to a few lines.

## ADR-0003 — Dual desktop runtimes: Tauri AND Electron

**Status: accepted.** The channel brief called for both. Tauri 2 ships the small-footprint Rust bundle (`.dmg`, `.AppImage`, `.deb`, `.exe`/`.msi`) and is the default desktop recommendation; Electron 33 remains as the compatibility surface — its Chromium is pinned regardless of host OS, and electron-builder's NSIS/dmg/AppImage/deb matrix is battle-tested. The cost is maintaining two desktop frontends, mitigated by both renderers sharing `@dte/shared` data, the brand tokens, and the same DOM structure, so the surface code stays thin.

## ADR-0004 — Expo / React Native for mobile

**Status: accepted.** Expo Router (file-based routing, `app/(tabs)/` with the five tabs) plus EAS build profiles (`development`, `preview`, `production`) gives OTA updates and store submissions without maintaining native projects locally. The `demontimeexotics` URL scheme deep-links, and the `eas.json` profiles gate the build types. The rejected alternative — bare React Native — was dropped for the native-toolchain maintenance burden.

## ADR-0005 — `@dte/shared` as the single source of truth

**Status: accepted.** Channel facts live exactly once: `CHANNEL`, `CHANNEL_STATS`, `YOUTUBE_IDS`, `LINKS`, `PLATFORMS`, `TOP_VIDEOS`, `ROSTER`, `PILLARS`, `AFFILIATES`, the `ALLOWED_URL_PREFIXES` allowlist, and the `formatCompact` contract (21200 → "21.2K", 3025509 → "3M"). Every surface imports from `@dte/shared`; none hardcodes stats or links. The enforcement mechanism is review discipline plus the `typecheck` gate in CI — a duplicated literal in an app is a code smell the linters can catch with a `no-restricted-syntax` rule if it ever becomes a problem.

## ADR-0006 — GitHub Actions matrix releases

**Status: accepted.** One workflow per surface (`deploy-landing.yml`, `release-tauri.yml` with its four-target matrix, `release-electron.yml`, `release-mobile.yml`, plus `build.yml` and `ci.yml` gates, `codeql.yml` scanning) triggered on version tags (`v*`). Releases are cut only by pushing a tag — never by a branch push — which keeps `main` always deployable. The `release.js` script exists to make the tag-cutting ceremony (version lockstep bump, CHANGELOG fold, commit + tag) a one-command, mistake-proof operation.

## ADR-0007 — Framework-free landing and UI kit

**Status: accepted.** The landing site and the `@dte/ui` kit are vanilla TypeScript with DOM factories (`document.createElement` + token-driven class names), no React runtime. A content site with reveal-on-scroll, ember canvas particles, and animated counters does not need a virtual DOM, and shipping zero framework bytes keeps the Pages payload tiny. The upgrade path is deliberate: `App.tsx`/`main.tsx` scaffolds exist in the landing tree as inert placeholders, so a future React migration has slots to land in without rewriting the data layer.

## ADR-0008 — Flat root docs + nested deep-dives

**Status: accepted.** GitHub surfaces files GitHub recognizes at the repo root (`README.md`, `CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`, `CHANGELOG.md`, plus the supporting set like `INSTALL.md`, `BUILD.md`, `DEPLOYMENT.md`, `ROADMAP.md`, `ADR.md`, `PRICING.md`, `FAQ.md`, `SUPPORT.md`), while `docs/` holds the architecture deep-dives, `prompts/` holds the reusable AI prompts, `wiki/` mirrors the knowledge base for the GitHub wiki feature, and `discussion/` seeds the Discussions categories. The rule: one page, one job, every page cross-linked, no page duplicating another's content.
