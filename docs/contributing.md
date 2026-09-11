# Contributing — the deep dive

The root `CONTRIBUTING.md` is the ninety-second version: how to clone, how to run, how to open a PR. This page is the ninety-minute version — the full environment walkthrough, the task pipeline, the review bar, and the release flow from a contributor's seat. If the root file answers "what do I do", this one answers "why is it set up this way and what does good look like".

The architecture context behind everything here is in `architecture/monorepo.md` (workspace mechanics), `architecture/build-pipeline.md` (the pipeline you're stepping into), and `architecture/packages.md` (the APIs you'll be calling).

## The environment, fully walked

The repo is a pnpm workspace — the prerequisites are Node ≥ 20.18, pnpm ≥ 9.12, and Rust stable only if you're touching the Tauri surface. `corepack enable` gets you the pinned pnpm version (`packageManager` in the root manifest). One `pnpm install` at the root installs every workspace package into the pnpm store and links the `workspace:*` dependencies — there is no per-package install step, ever, and running `npm install` anywhere in the tree will fight the lockfile.

The root scripts are your whole interface. `pnpm dev` boots all four surfaces at once via `tooling/scripts/dev-all.js` — expect the URL table in your terminal (landing `5173/demon-time-exotics/`, Tauri `1420`, Electron `5174`, Metro `8081`) and give Vite a few seconds on first boot. The per-surface variants (`pnpm dev:landing`, `dev:tauri`, `dev:electron`, `dev:mobile`) boot exactly one surface when you don't want the fan-out. `pnpm build` mirrors CI's build matrix via `build-all.js`, and `--skip-native` skips the Rust and mobile-compile steps on machines without those toolchains — the outcome table still prints, with `⏭` for the skipped surfaces. `pnpm test`, `pnpm lint` and `pnpm typecheck` are the Turbo-fanned gates; run them before every push, because CI runs the same three.

Two quirks worth knowing. First, the tooling scripts are ESM — the root manifest's `"type": "module"` makes that official, so the scripts import Node built-ins with the `node:` prefix and there are no `.cjs` stragglers. Second, the generators are the supported way to add code: `pnpm --filter @dte/gen-component component <Name> --surface=<s>` and `pnpm --filter @dte/gen-app app <name>` scaffold files that already satisfy the lint and typecheck rules — hand-writing the ten files a new web app needs is the long way around, and the generator's scaffolds are the canonical shapes.

## The task pipeline from the inside

Every workspace package owns its scripts, and Turbo caches them by inputs hash. The practical consequence: `pnpm build` only rebuilds what changed since your last successful run, and `pnpm lint` re-lints only the packages whose inputs differ. The cache is a speed feature, not a correctness one — CI's runs are always cold, so "it passed locally with cache" is not evidence; the gates (`lint`, `typecheck`, `test`) re-run cold in CI on every PR.

The task graph is declared in `turbo.json`: `build` depends on `^build` (a package builds after its dependencies build), `typecheck` depends on `^build`, `test` depends on `^build`, and `clean` runs everywhere. When you add a script to a package, think about whether it should join a pipeline — a `bundle:analyze` script is fine standalone, but a `verify` script that should gate releases belongs in the pipeline and in `build-all.js`'s artifact checks.

The artifact contract matters when your change moves a build output. `build-all.js` and the `Build All Platforms` workflow both verify concrete paths — `apps/landing/dist/index.html`, `apps/tauri/src-tauri/target/release`, `apps/electron/dist/main/index.js`, `apps/mobile/dist/index.html`. If your change relocates a dist tree or renames a binary, update the artifact list in `tooling/scripts/build-all.js` in the same PR, or local builds will green while the CI artifact check reds. That file and the workflow are the two halves of one contract.

## The review bar

A PR that passes CI is not automatically mergeable — the human bar is deliberately higher than the machine bar. The machine bar: lint green, typecheck green, tests green, build artifacts present, and — if the change touches the security surfaces — the allowlist/mirror/CSP diffs get line-level attention (see `architecture/security.md` for what those surfaces are and why the Electron mirror is narrower than the shared list).

The human bar: changes to `@dte/shared` constants get special attention because they are the single source of truth for four surfaces — a typo'd handle or a stale stat propagates everywhere at once, so those diffs get the slow read. The same goes for the token set in `@dte/ui`'s themes and the capability file in the Tauri app: small files, huge blast radius, slow reads. Conversely, a new component scaffolded by the generator with its tests attached is the fast path — the generator's output is known-good shape, so review focuses on the content, not the scaffolding.

Conventional commits are enforced by habit and CI convention (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:` prefixes) because the release script folds `CHANGELOG.md` by hand rather than parsing commits — but the discipline keeps the history scannable, and the release notes read better when the commit log reads well. Branch naming (`feat/<short>`, `fix/<short>`, `docs/<short>`) and the PR template's checklist come from the root `CONTRIBUTING.md`; they're the same rules here, just with the reasons attached.

## The release flow from a contributor's seat

Releases are cut by a maintainer running one command — `pnpm release` — and contributors mostly watch. But it helps to know the ceremony, because it shapes what lands when. The script refuses a dirty tree, runs the gates, bumps all thirteen manifests in lockstep, folds the `[Unreleased]` changelog section into a dated heading, commits `chore(release): v{next}`, and tags `v{next}`; the tag push then triggers the four distributor workflows (Tauri, Electron, mobile, landing) in sequence. Full walk-through in `architecture/build-pipeline.md`.

The contributor-relevant part: **land features before the cut, not during it.** The changelog's `[Unreleased]` section is written by the people who land the changes — when your PR merges, add your line to that section in the same PR, past-tense, user-facing, one line. The release script only folds and dates; it does not write history. A PR that adds a feature but no changelog line will get the "where's your line?" review comment, every time.

## Where each kind of change goes

Rules of thumb that keep the repo's shape stable. A fact that four surfaces must agree on goes in `@dte/shared`. A derived computation over those facts goes in `@dte/core`. A visual atom or composed section two or more surfaces share goes in `@dte/ui`; a section one surface needs goes in that app's `components/` dir. A config preset that three-plus apps would duplicate goes in `packages/config/`. A script that operates on the whole workspace goes in `tooling/scripts/`; a scaffolder goes in `tooling/generators/`. A brand file goes in `packages/assets/` only via the graduation process in `docs/assets/README.md`; staging explorations live in `docs/assets/`. Screenshots that document current state go in `docs/screenshots/` with the naming convention in its README. And docs changes never touch code — the `docs/` tree is prose-only by design (ADR-0008).
