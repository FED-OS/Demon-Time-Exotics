# Getting Started

Three commands and you're running. The wiki Home page promised that; this page delivers it, plus the environment details that keep those three commands from failing.

## What you need first

Node 20 or newer and pnpm 9 or newer. The repo pins both: `.nvmrc` says `v20.18.0` and the root `package.json` declares `"packageManager": "pnpm@9.12.0"`. The easy path on any machine is `corepack enable` once — Node ships Corepack, and Corepack reads that pin and activates exactly pnpm 9.12.0 for this repo, no global install, no version roulette. If `pnpm --version` prints anything else inside the repo after that, something overrode Corepack and that's the first thing to fix, before any install.

## The three commands

Clone, then from the repo root: `pnpm install` (workspaces resolve, one lockfile, every workspace wired), then `pnpm dev`. That last one is `turbo run dev --parallel` — all four surfaces boot at once. Give it a minute; four Vite servers and an Expo bundler are waking up.

## Where things land

The dev ports are part of the repo's contract, and they don't collide by design: the landing site serves at **http://localhost:5173** (base `/demon-time-exotics/`), the Tauri dev window at **http://localhost:1420** (strictPort — if 1420 is busy the Tauri dev run fails loudly rather than quietly rebinding), the Electron renderer at **http://localhost:5174**, and the mobile Expo bundler at **http://localhost:8081**. If you only need one surface, `pnpm dev:landing`, `pnpm dev:tauri`, `pnpm dev:electron`, or `pnpm dev:mobile` boots it alone — the Makefile has the same targets under `make dev-landing` and friends.

## One install, one graph

`pnpm install` at the root is the only install you ever run. The workspace globs are `apps/*`, `packages/*`, `packages/config/*`, and `tooling/*`; pnpm resolves them all from `pnpm-workspace.yaml` and symlinks each `@dte/*` package into place, so `apps/landing` importing `@dte/shared` resolves the local source, not a registry copy. Never `pnpm install` inside an app directory — you'll get a nested lockfile and a confused graph.

## Verify you're healthy

Two commands prove the tree is sound: `pnpm lint` and `pnpm typecheck`, both Turbo tasks that fan out across every workspace. If both pass on a fresh clone with zero changes, your environment is correct. From there, [Development Workflow](Development-Workflow.md) is the daily loop, and [Troubleshooting](Troubleshooting.md) is where the unlucky endings live.
