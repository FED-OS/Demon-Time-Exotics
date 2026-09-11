# Packages — the @dte/* shared libraries

This page is the API tour of everything under `packages/`. The four packages form a strict dependency ladder — `shared` at the bottom, `core` above it, `ui` at the top, with `assets` and the four `config/*` presets as side branches. Nothing in `packages/` ever imports from `apps/`, and the ladder is acyclic by construction (see `monorepo.md`).

Read this alongside `overview.md` for the big picture, `apps.md` for how each surface consumes these APIs, and `decisions.md` for why the packages are split this way (ADR-0005 is the load-bearing decision here).

## @dte/shared — the data spine

`@dte/shared` is the single source of truth for channel facts, pure helpers and the shared type vocabulary (ADR-0005). If two surfaces need to agree on a number, a URL, or a name, that value lives here and nowhere else. It has **zero dependencies** and zero side effects — importing it is free, fast and safe on every surface, including Rust-adjacent tooling and Node scripts.

The **constants** module ships ten named facts: `CHANNEL` (handle, legal name, tagline, email), `CHANNEL_STATS` (the 21.2K / 406 / 3,025,509 snapshot plus curation stats), `YOUTUBE_IDS` (channel and playlist IDs), `LINKS` (the full verified link graph), `PLATFORMS` (the platforms the channel is live on), `TOP_VIDEOS` (the most-watched episodes), `ROSTER` (the recurring figures of the show), `PILLARS` (the content pillars — the "MESSY" categories), and `AFFILIATES` (the Ko-fi / merch / membership destinations). Every constant is typed; the corresponding interfaces (`Platform`, `TopVideo`, `RosterFigure`, `Pillar`, `Affiliate`) are exported as types from the same barrel.

The **helpers** module is where the pure functions live. `formatCompact` is the headline act — it turns raw counts into the display forms used everywhere in the brand (`21200` → `21.2K`, `3025509` → `3M`, `406` stays `406`) — and `parseCompactViews` is its inverse, used by the stats store when a human edits a milestone. `ALLOWED_URL_PREFIXES` and `isAllowedUrl` implement the trust boundary that every outbound link must pass (the full story is in `security.md`). `youtubeUrl`, `youtubeChannelUrl` and `youtubeEmbedUrl` build canonical YouTube URLs from IDs so that no surface ever hand-concatenates a watch link. `formatDate`, `truncate`, `capitalize`, `topByViews`, `statDeltas`, `formatDuration`, `slugId` and `prefersReducedMotion` round out the set. Every helper is a one-file, dependency-free function — trivially tree-shakeable and unit-testable.

The **types** module carries the cross-surface vocabulary: `ChannelStatsSnapshot`, `LinkTarget`, `BuildOutcome` (the shape `tooling/scripts/build-all.js` reports against), and the rest of the contracts that `core` re-exports and the apps consume. Deep imports work too — `@dte/shared/constants`, `/helpers`, `/types` — for surfaces that want to keep cold paths light.

## @dte/core — the app-logic layer

`@dte/core` sits one rung up: it imports from `@dte/shared` and exposes *services*, not raw data. Where `shared` says "here are the links", `core` says "here is the resolved, ordered, grouped link list for rendering a hub". The apps never touch raw constants directly if a core service exists for it — that's the seam that keeps four surfaces honest.

The **domain services** cover the five content domains. `links.ts` exports `resolveLinks`, `linksByGroup`, `youtubeChannels`, `subscribeUrl`, `membershipUrl`, `merchUrl` and `supportUrl` — the hub, subscribe and Ko-fi flows all resolve through here so an affiliate URL change is a one-line edit. `stats.ts` exports `statCards` (the ready-to-render stat trio), `nextMilestones` (computed from the live snapshot), `channelAverages`, `statsOneLiner` (the "≈7.4K views per video" style sentence) and `compareStats` (old vs. new snapshots for the release-notes blurb). `figures.ts` gives `allFigures`, `figuresByGroup`, `findFigure`, `searchFigures` and `groupOf` over the roster. `pillars.ts` gives `allPillars`, `findPillar` and `matchPillar`. `content.ts` gives `topContent`, `featuredContent`, `contentByFigure`, `topContentTotalViews` and `searchUrlFor`.

The **api layer** (`api/`) is a small typed client — `ApiClient`, `ApiError`, a singleton `apiClient`, and `DEFAULT_BASE_URLS` — so that a future live-stats backend can drop in without touching the surfaces. The **auth stubs** (`auth/`) export `signIn`, `guestProfile` and `membershipRedirect`, plus the `AuthProvider` / `SupporterProfile` / `AuthResult` types; they are intentionally stubbed until OAuth lands, but the call-sites already exist so the seam is real. The **stores** (`stores/`) are the reactive layer: a tiny `Store` base class, the `statsStore`, `alertsStore` and `watchStore`, the `recordWatch` action, and `hydrate` for restoring persisted state. The **utils** (`utils/`) are the runtime helpers that need more than one line of thought: `deepClone`, `debounce`, `throttle`, `safeParse`, `detectHost`, `sleep`, `clamp` and `retry`.

Deep imports mirror the folder layout — `@dte/core/links`, `/stats`, `/figures`, `/pillars`, `/content`, `/api`, `/auth`, `/stores`, `/types`, `/utils`.

## @dte/ui — the brand kit

`@dte/ui` is the DOM-and-tokens layer (ADR-0007's framework-free pattern, packaged). It compiles to ES2022 with no framework dependency, so the landing page, the Tauri webview and the Electron renderer all share the *same* component code, and React Native surfaces reuse the tokens via `@dte/shared` values.

The **themes** module exports `dteTheme` (the canonical token set — `--fire #ff5e1a`, `--inferno #ff2e00`, `--purple #8b2fd6`, `--gold #f5a623`, `--ember #ffb98a`, the ink/paper scale, the Bebas Neue + Inter font stack), `dteThemeHighContrast`, `THEME_CSS_VARS`, `applyThemeVars` (stamp the tokens onto any root element) and `themeVar` (read a token back). The **primitives** are the atoms — `button`, `badge`, `statBlock`, `card`, `iconBullet` — each a DOM factory returning a configured element, with `ButtonVariant` / `ButtonSize` types for the call-sites. The **icons** module exports the `ICONS` map, `icon`, `iconLabel` and `iconEntries` with the `IconName` type. The **components** are the composed sections that every surface reuses: `statsRow`, `hubGrid`, `rosterChips`, `pillarGrid`, `topContentList`, `supportPanel`, `heroCtas` and `fireTicker`.

The rule of thumb when building new UI: if it's a token or an atom, it goes in `ui`; if it's a section, it goes in `ui` only when two or more surfaces need it, otherwise it lives in the app's own `components/` directory (the component generator stamps this contract into every scaffold — see `tooling/generators/component`).

## @dte/assets — the brand asset library

`@dte/assets` is a data-only package: no code, just the files and a manifest. Its `package.json` `exports` map exposes `./branding/*`, `./icons/*`, `./images/*`, `./fonts/*` and `./manifest.json`, so consumers reference `@dte/assets/branding/logo.png` instead of copying files into apps. The `manifest.json` is the index of everything shipped — the logo and social banner under `branding/`, the full favicon set (16 through 512 plus apple-touch, android-adaptive, and the 1024 source for Electron/Tauri icons) under `icons/`, the hero background and the 1280×640 social preview under `images/`, and the Bebas Neue / Inter font notes under `fonts/`. When an icon or banner changes, one file changes and every surface picks it up on the next build; the README in the package documents the regeneration commands.

## @dte/config-* — the shared presets

Four preset packages under `packages/config/` keep tool config out of the apps: `@dte/config-eslint` (flat config preset used by every lint script), `@dte/config-typescript` (the base `tsconfig` the app tsconfigs extend), `@dte/config-tailwind` (the token-mapped Tailwind preset), and `@dte/config-vite` (the `webPreset` with the base-path, port and dev-server conventions every web surface calls). Each is a tiny package whose main export is the preset itself; the generators stamp them into every new app's `devDependencies` so new surfaces are consistent from minute one. The config packages are consumed via `extends` / `import` from the app config files — see any app's `.eslintrc` / `tsconfig.json` / `vite.config.ts` for the pattern.

## Versioning and the ladder

All workspace packages are `"private": true` and move in lockstep via `tooling/scripts/release.js`, which bumps every manifest together and publishes nothing — the only artifact consumers are the surfaces inside this repo. That's deliberate: the packages exist to keep the four surfaces consistent, not to be an external SDK. If a package ever needs to go public, the release script is the single place to extend.
