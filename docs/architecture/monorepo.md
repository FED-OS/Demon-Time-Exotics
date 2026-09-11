# Monorepo Mechanics

How the pnpm + Turborepo workspace actually runs: the workspace graph, the dependency direction rules, the task pipeline, and the caching behavior. For the *why* see `decisions.md` (ADR-0001); this page is the *how*.

## Workspace declaration

`pnpm-workspace.yaml` declares four globs: `apps/*` (landing, tauri, electron, mobile), `packages/*` (shared, core, ui, assets), `packages/config/*` (eslint, typescript, tailwind, vite), and `tooling/*` (the two generator packages). Every directory under those globs containing a `package.json` becomes a workspace package addressable by name — `@dte/landing`, `@dte/shared`, `@dte/config-vite`, `@dte/gen-app` and so on. The root `package.json` is private (never published) and carries the orchestration scripts that forward into the graph: `dev`, `build`, `lint`, `typecheck`, `test`, `clean`, `format`, and `release`.

## Dependency direction

Dependencies only point downward, never upward and never sideways between apps: apps may depend on `@dte/shared`, `@dte/core`, `@dte/ui`, `@dte/assets/*` and the config packages; `@dte/core` depends on `@dte/shared`; `@dte/ui` depends on `@dte/shared`; `@dte/shared` depends on nothing. No app imports another app. This keeps the graph acyclic and lets Turborepo schedule `@dte/shared`'s build before anything that consumes it. All cross-package versions use the `workspace:*` protocol, so the lockfile resolves them to local symlinks and a semver range is recorded only at publish time (irrelevant here, since everything is private).

## Task pipeline

`turbo.json` defines the pipeline. `build` depends on the outputs of upstream `^build` tasks; `lint`, `typecheck`, and `test` are independent leaves that can run in parallel; `clean` is a per-package `rm -rf` of local outputs, chained before the root `tooling/scripts/clean.js` sweep in the composed `pnpm clean` script. Turbo's cache keys off the task inputs (source files plus the package's own config), so a second `pnpm build` after a one-line change to one app rebuilds only that app and replays the rest from cache.

## The dev experience

`pnpm dev` runs `turbo run dev --parallel` — every dev server at once. The more focused `dev:landing`, `dev:tauri`, `dev:electron`, `dev:mobile` scripts filter to one surface. The `tooling/scripts/dev-all.js` launcher is the curated version of the parallel mode: it spawns the four dev processes with per-surface tag-prefixed output (so interleaved logs stay readable), prints the URL table (landing 5173, tauri 1420, electron 5174, mobile 8081), and forwards one Ctrl-C to stop everything.

## Versioning

Every workspace manifest carries the same `version` field. `tooling/scripts/release.js` bumps them in lockstep (`--patch`, `--minor`, `--major`) — the root plus the thirteen workspace manifests listed in its `WORKSPACE_FILES` array — folds the CHANGELOG's `[Unreleased]` section under the new version, and commits + tags `v{semver}`. Tags, not branch pushes, trigger the release workflows (ADR-0006).

## Adding to the graph

Two generators stamp new workspaces in: `tooling/generators/app/index.js <Name>` writes a ten-file vanilla-TS Vite app under `apps/`, and `tooling/generators/component/index.js <Name> [--surface …]` writes a web or React Native component into the right directory with a barrel append. Both refuse to overwrite existing paths. After generating, `pnpm install` links the new workspace into the graph.

## Common commands

`pnpm install` bootstraps (creates the lockfile and symlinks). `pnpm build` builds everything with the cache warm. `pnpm --filter @dte/landing dev` runs one surface's dev server. `pnpm clean --deep` adds node_modules removal to the standard sweep. `node tooling/scripts/build-all.js --skip-native` builds only the web deliverables in a container without Rust or mobile SDKs. The `Makefile` mirrors the common flows for make-users.
