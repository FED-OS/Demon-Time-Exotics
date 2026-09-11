# CLAUDE.md — Agent Guide for Claude Code 🤖

Guidance for Claude (and any coding agent) working in this repository.

## Project Snapshot

**Demon Time Exotics ("THE MESSY SHOW")** — a pnpm + Turborepo monorepo
containing the entire DTE digital ecosystem: GitHub Pages landing site,
Tauri desktop app, Electron desktop app, Expo mobile app, and shared
packages. Brand: raw, unfiltered hip hop commentary; fire-orange /
inferno-red / purple-neon on near-black; "No scripts. No filters." tone.

## Commands

Always use pnpm. Node 20.18+ / pnpm 9.12+ (see `.nvmrc`).

```bash
pnpm install                # install all workspaces
pnpm dev:landing            # landing site dev server (5173)
pnpm dev:tauri              # tauri dev (needs Rust toolchain)
pnpm dev:electron           # electron dev
pnpm dev:mobile             # expo dev (press i/a in terminal)
pnpm build                  # build all (turbo, cached)
pnpm build:landing          # landing only
pnpm build:tauri            # tauri only
pnpm build:electron         # electron only
pnpm build:mobile           # expo export only
pnpm lint                   # eslint all workspaces
pnpm typecheck              # tsc all workspaces
pnpm test                   # test all workspaces
pnpm clean                  # remove dist/build/.turbo + node_modules caches
```

Tauri needs Rust + webkit2gtk on Linux (see [INSTALL.md](INSTALL.md)).
Expo needs ANDROID_HOME for Android. If a target's toolchain is missing,
work on the other targets — don't try to force it.

## Architecture

```
apps/
  landing/     GitHub Pages site — Vite + vanilla TS (NO framework, by design)
  tauri/       Tauri 2 app — Vite frontend + Rust core in src-tauri/
  electron/    Electron 33 — src/main (node), src/preload, src/renderer (web)
  mobile/      Expo SDK 51 — Expo Router tabs in app/, logic in src/
packages/
  ui/          shared UI hooks/components (useEmbers, useReveal, etc.)
  core/        THE source of truth for brand data: LINKS, STATS, FIGURES, PILLARS
  shared/      constants + helpers (SOCIAL, THEME, formatters)
  assets/      brand imagery (logos, banners) — brand property, see COPYING.md
  config/      shared eslint / typescript / tailwind / vite configs
tooling/       build/dev/release orchestration scripts, generators
```

**Key rule:** anything used by 2+ apps belongs in a `packages/*` workspace.
App folders hold only app-specific shell code. Brand data (links, stats,
figures) lives in `packages/core` — NEVER hardcode a DTE link or stat in an
app; import from `@dte/core`.

**Landing is deliberately framework-free** (ADR-0007). If asked to add
React/Next there, push back and reference the ADR — or open a Discussion to
supersede it.

## Conventions

- **TypeScript strict** everywhere; base config `tsconfig.base.json`
- **Conventional Commits** — `feat(landing): …` `fix(electron): …` etc.
- **Branches** — `feat/…` `fix/…` `docs/…` `chore/…` `refactor/…`
- **Imports** — workspace packages via `@dte/*` protocol
- **Formatting** — prettier defaults (2-space, no semicolon prefs beyond file)
- **No secrets in code** — `.env` only (gitignored), `.env.example` template
- **CSS** — landing uses plain CSS custom properties from
  `apps/landing/src/styles/styles.css` brand tokens

## Safety & Brand Rules

- Brand assets (demon logo, name, tagline) are brand property — do not
  generate new "official" brand imagery without owner sign-off
- Third-party names in `packages/core` (covered figures) are factual
  references; keep them exactly as-is — don't editorialize in code/data
- Affiliate prices in PRICING.md are captured data — flag for human review
  rather than silently changing
- Security issues: never open public issues — see SECURITY.md

## Testing & Verification

Before declaring work done, run what applies:

```bash
pnpm lint && pnpm typecheck
pnpm build:landing          # always — no extra toolchain needed
pnpm build:electron         # if electron touched
pnpm build:mobile           # if mobile touched
pnpm build:tauri            # if tauri touched AND rust available
```

If you can't run a target (missing toolchain), say so explicitly in the PR
rather than claiming it builds.

## Docs Map (when updating)

README (main) • CHANGELOG (keep [Unreleased] current) • ROADMAP (mark
shipped items) • ADR.md (append new decisions, never renumber) •
docs/, wiki/, discussion/, prompts/ (content areas). 24 root docs total —
keep cross-links consistent when renaming.

## Things Agents Commonly Get Wrong Here

1. Hardcoding links/stats in an app instead of importing from `@dte/core`
2. Adding a framework to `apps/landing` (don't — ADR-0007)
3. Running `pnpm install` with npm/yarn instead of pnpm
4. Committing `node_modules/` or generated `dist/` (both gitignored)
5. Editing `packages/config` without checking all 4 apps still typecheck
