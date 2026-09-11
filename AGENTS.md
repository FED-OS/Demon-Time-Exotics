# AGENTS.md — Guide for AI Coding Agents 🤖

Operating instructions for any AI agent (Claude, Copilot, Cursor, Aider,
Codex, etc.) contributing to this repository.

## Read This First

This repo has TWO agent guides with different scopes:

- **AGENTS.md (this file)** — general agent protocol: repo layout, commands,
  conventions, safety rules
- **[CLAUDE.md](CLAUDE.md)** — Claude-Code-specific quick reference

If they conflict, **this file wins**. If both conflict with
[CONTRIBUTING.md](CONTRIBUTING.md), CONTRIBUTING wins (it governs humans and
agents alike).

## Repository Identity

**Demon Time Exotics — "THE MESSY SHOW"** multi-platform creator ecosystem:
pnpm + Turborepo monorepo with a GitHub Pages landing site, Tauri desktop
app, Electron desktop app, Expo mobile app, and shared packages. MIT-licensed
code; brand assets are brand property (see [COPYING.md](COPYING.md)).

## Golden Rules

1. **Single source of truth** — brand data (links, stats, figures, pillars)
   lives in `packages/core`. NEVER hardcode these in an app. Import:
   `import { LINKS, STATS } from '@dte/core'`
2. **`apps/landing` is framework-free** — vanilla TS + Vite by explicit
   decision (ADR-0007). Do not introduce React/Vue/Svelte there.
3. **pnpm only** — never npm or yarn. `corepack enable` if missing.
4. **No secrets in the repo** — `.env` (gitignored) + `.env.example`.
5. **Conventional Commits** — `type(scope): subject`.
6. **Check before you write** — search for existing helpers in
   `packages/shared` / `packages/ui` before creating new ones.
7. **Update docs with code** — CHANGELOG `[Unreleased]`, and ROADMAP if an
   item shipped.
8. **Say what you couldn't verify** — if a toolchain was missing, state it.

## Layout

```
apps/landing      web (Vite + vanilla TS) → GitHub Pages
apps/tauri        desktop (Tauri 2; Rust in src-tauri/)
apps/electron     desktop (Electron 33; main/preload/renderer)
apps/mobile       mobile (Expo 51 + Expo Router)
packages/ui       shared UI hooks & components
packages/core     brand data + business logic  ← most-edited package
packages/shared   constants + helpers
packages/assets   brand imagery (logo, banner) — restricted, see below
packages/config   shared eslint/ts/tailwind/vite configs
tooling/          orchestration scripts + generators
docs/ wiki/ discussion/ prompts/    content areas
.github/          workflows + issue/PR templates
```

## Command Cheat Sheet

```bash
pnpm install                     # after clone or dependency changes
pnpm dev:landing                 # http://localhost:5173
pnpm dev:electron                # electron window
pnpm dev:mobile                  # expo (i = iOS, a = Android)
pnpm dev:tauri                   # needs Rust — skip if unavailable
pnpm lint && pnpm typecheck      # MANDATORY before declaring done
pnpm build:landing               # cheap, always runnable
pnpm build:electron              # if electron touched
pnpm build:mobile                # if mobile touched (export)
pnpm build:tauri                 # if tauri touched AND rust present
pnpm clean                       # reset build artifacts
```

## Task Protocols

### Bug fix
1. Reproduce (which app? which command?)
2. Locate root cause — fix at the right layer (shared code → packages)
3. Add/adjust a test if a harness exists for that app
4. `pnpm lint && pnpm typecheck` + build the affected app
5. PR per template; reference issue with `Closes #N`

### Feature
1. Check [ROADMAP.md](ROADMAP.md) — is it planned? Align scope.
2. If cross-app or architectural → flag for a Discussion/ADR first (see
   [GOVERNANCE.md](GOVERNANCE.md)); don't unilaterally restructure
3. Implement in the right layer (2+ apps → packages/*)
4. Verify builds for ALL affected apps
5. Update CHANGELOG `[Unreleased]`

### Docs-only
No build needed, but keep cross-links valid (24 root docs link each other
heavily — renamed file = update every reference).

### Brand data change
`packages/core` links/stats/figures changes are **brand-significant** —
human owner sign-off required on the PR. Agents may prepare, never merge.

### Brand imagery
`packages/assets` and app icon folders are **restricted**: brand property.
Do not generate or replace brand imagery without explicit owner instruction.

## Prohibited

- ❌ Hardcoding DTE links/stats in apps
- ❌ Adding frameworks to `apps/landing`
- ❌ Using npm/yarn instead of pnpm
- ❌ Committing `.env`, `node_modules/`, `dist/`, build artifacts
- ❌ Editing CI workflows (`.github/workflows/*`) without flagging for review
- ❌ Opening public issues for security topics (see [SECURITY.md](SECURITY.md))
- ❌ Merging anything touching brand data or assets autonomously
- ❌ Renumbering ADRs; only append (see [ADR.md](ADR.md))

## Verification Standard

An agent's work is "done" when:

- [ ] `pnpm lint` passes
- [ ] `pnpm typecheck` passes
- [ ] Affected app(s) build
- [ ] CHANGELOG updated (for user-facing changes)
- [ ] PR description complete; limitations stated honestly
- [ ] No golden-rule violations

## Getting Unstuck

- Setup errors → [INSTALL.md](INSTALL.md) troubleshooting table
- Build behavior → [BUILD.md](BUILD.md)
- Releases → [DEPLOYMENT.md](DEPLOYMENT.md)
- History/context → [CHANGELOG.md](CHANGELOG.md), [ADR.md](ADR.md)
- Still stuck → open a Discussion with what you tried

---

*Agents: build like the show runs — no scripts where none are needed, no
filters on error reporting, and every commit counts.* 😈
