# ADR — Architecture Decision Records 🏛️

Numbered records of significant architecture decisions in this monorepo.
Status legend: **Proposed** → **Accepted** → **Deprecated** → **Superseded**.

---

## ADR-0001 — Adopt a pnpm + Turborepo monorepo

**Status:** Accepted • **Date:** 2025-09-10

**Context.** The DTE ecosystem spans a web landing site, two desktop stacks
(Tauri, Electron), a mobile app (Expo), and shared code. Managing four repos
guarantees drift: links, stats, and branding updated in one place but not the
others.

**Decision.** One repository using pnpm workspaces for package linking and
Turborepo for build orchestration.

**Consequences.**
- ✅ Single source of truth for brand data (`packages/core`)
- ✅ One CI pipeline, one changelog, atomic cross-app changes
- ✅ Turborepo caches make CI fast
- ⚠️ Repo is larger; contributors must install pnpm
- ⚠️ CI must handle mixed toolchains (Node, Rust, mobile SDKs)

---

## ADR-0002 — TypeScript + Vite as the default frontend stack

**Status:** Accepted • **Date:** 2025-09-10

**Context.** Landing, Tauri, and Electron all need a fast, modern frontend
bundler; mobile uses Metro (Expo). We wanted one language across the stack.

**Decision.** TypeScript everywhere; Vite as bundler for `landing`, `tauri`,
and `electron` frontends; Metro via Expo for `mobile`.

**Consequences.**
- ✅ Shared types flow from `packages/core` into every app
- ✅ Vite gives instant HMR and a tiny config surface
- ✅ Vite is Tauri's recommended frontend toolchain
- ⚠️ Two bundlers (Vite + Metro) — minor config duplication, handled by
  `packages/config`

---

## ADR-0003 — Ship BOTH Tauri and Electron desktop apps

**Status:** Accepted • **Date:** 2025-09-10

**Context.** Tauri: tiny bundles, Rust core, best security posture — but
younger ecosystem and occasional webview quirks per-OS. Electron: heavier
but battle-tested, uniform Chromium everywhere, richer desktop APIs.

**Decision.** Maintain both. Tauri is the lean "core" desktop client;
Electron is the compatibility-first client. Shared UI/business logic in
`packages/ui` / `packages/core` keeps per-app code thin (shell only).

**Consequences.**
- ✅ Users choose the build that fits their OS/preferences
- ✅ Desktop-specific features can land in whichever shell suits them
- ⚠️ Two release pipelines (workflows already handle this)
- ⚠️ Discipline required to keep features in shared packages, not shells

---

## ADR-0004 — Expo (React Native) for the mobile app

**Status:** Accepted • **Date:** 2025-09-10

**Context.** Need iOS + Android from one codebase, fast iteration, OTA
updates for content changes, and cloud builds so contributors without
macOS can still produce iOS artifacts.

**Decision.** Expo SDK 51 + Expo Router (file-based routing, tab navigation).

**Consequences.**
- ✅ One codebase → two platforms; OTA updates for JS-only changes
- ✅ EAS cloud builds (no local Xcode needed for CI artifacts)
- ⚠️ Native modules require config plugins / prebuild eject paths
- ⚠️ Bundle size slightly larger than hand-rolled native

---

## ADR-0005 — Shared brand data lives in `@dte/core`, not apps

**Status:** Accepted • **Date:** 2025-09-10

**Context.** Channel stats, platform links, and covered figures change often.
Duplicating them per-app guarantees staleness.

**Decision.** All canonical brand data (links, stats, figures, pillars) lives
in `packages/core/src` as typed exports; every app imports from there.
Assets (logos/icons) live in `packages/assets`.

**Consequences.**
- ✅ Update a stat/link once → every app reflects it after rebuild
- ✅ Type-safe: rename a platform and the compiler finds every usage
- ⚠️ A bad value in core propagates everywhere — CI checks help

---

## ADR-0006 — GitHub Actions with matrix builds for releases

**Status:** Accepted • **Date:** 2025-09-10

**Context.** Desktop targets need per-OS bundling (msi/dmg/AppImage/deb/exe);
mobile needs EAS; landing needs Pages. One CI provider, one config surface.

**Decision.** GitHub Actions workflows: `build.yml` (verify matrix),
`deploy-landing.yml` (Pages), `release-tauri.yml` / `release-electron.yml` /
`release-mobile.yml` (tag-triggered), `codeql.yml` (security), `ci.yml`
(lint/typecheck/test).

**Consequences.**
- ✅ Free for public repos; artifacts attach straight to GitHub Releases
- ✅ Tag-driven releases keep `main` always-deployable
- ⚠️ macOS runners are the slow/scarce resource — keep mac jobs minimal

---

## ADR-0007 — Landing site is self-contained vanilla TS (no framework)

**Status:** Accepted • **Date:** 2025-09-10

**Context.** The landing site is content-stationary: hero, stats, videos,
roster, links. A framework (React/Next) would add weight and build complexity
for zero interactivity gain.

**Decision.** `apps/landing` uses Vite + vanilla TypeScript with hand-rolled
components and CSS. No UI framework.

**Consequences.**
- ✅ Tiny payload, instant load, trivial GitHub Pages hosting
- ✅ Full control of the fire/neon aesthetic
- ⚠️ If the site grows interactive (search, feeds), revisit — see ROADMAP

---

## ADR-0008 — Root-level flat documentation suite

**Status:** Accepted • **Date:** 2025-09-10

**Context.** The project wants every conventional open-source doc present and
discoverable (README, CONTRIBUTING, SECURITY, etc.) plus repo meta-docs
(CLAUDE.md, AGENTS.md, TODO.md).

**Decision.** 24 root-level `.md` files (the standard set + project meta set),
with deeper content in `docs/`, `wiki/`, `discussion/`, and `prompts/`.

**Consequences.**
- ✅ Everything GitHub surfaces (SECURITY.md, CONTRIBUTING.md, etc.) at root
- ✅ AI agents read CLAUDE.md/AGENTS.md from root automatically
- ⚠️ Root is busy — `docs/` hub links keep navigation sane

---

*New ADRs: copy the numbered pattern above, append, never renumber.*
Template & index live in `docs/architecture/`.
