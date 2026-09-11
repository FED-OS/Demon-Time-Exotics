# Troubleshooting

The usual suspects, in the order you'll meet them. Every fix here assumes the environment from [Getting Started](Getting-Started.md) — Corepack-enabled, Node 20+, pnpm 9.12.0 as pinned — because most "repo is broken" reports are actually environment drift.

## `pnpm install` fails or behaves oddly

The pin is the prime suspect. The repo declares `"packageManager": "pnpm@9.12.0"` and `.nvmrc` says `v20.18.0`; if your pnpm is a different major or your Node is under 20, things fail in ways that look like repo bugs. Run `pnpm --version` and `node --version` inside the repo — if either disagrees with the pins, `corepack enable` and reopen your shell is the fix nine times out of ten. The other classic is a stray install inside an app directory that created a nested lockfile; `git status` will show it — delete it and re-run `pnpm install` at the root only. Never install per-app.

## Port collisions

The dev port map is a contract: landing **5173** (base `/demon-time-exotics/`), Tauri **1420** (strictPort), Electron **5174**, mobile **8081**. If one of those is already taken — a previous `pnpm dev` that didn't fully die is the usual culprit — kill the squatter (`lsof -i :5173` or your platform's equivalent, then kill the PID) or stop running surfaces you don't need (`pnpm dev:landing` instead of the full `pnpm dev`). Tauri is the strictest about it by design: port 1420 is `strictPort`, so a busy 1420 fails the Tauri dev run loudly instead of rebinding and serving the webview a stale window.

## Stale Turbo cache

Turbo caches aggressively (`dev` is excluded, but `build`, `lint`, `typecheck` and `test` are all cacheable), and occasionally a cache entry outlives its truth — you change a file and the gate still passes or fails like it didn't notice. `pnpm clean` runs the repo's clean script (which sweeps workspace `dist/` outputs and friends); if the weirdness persists, `npx turbo daemon` issues aside, the heavy hammer is `rm -rf .turbo node_modules/.cache` from the repo root, then re-run the gate. Caching bugs are annoying but bounded — they never change what's in the repo, only what the local run believes about it.

## Tauri-specific

First Tauri build on a machine is slow — it's a full Rust toolchain compile of `src-tauri`, and minutes of `Compiling ...` output is normal, not stuck. If the dev window opens but the webview is blank or serving stale content, the port story above is usually it. If capabilities or the window config seem ignored, check that `apps/tauri/src-tauri/capabilities/default.json` and `tauri.conf.json` are what you think they are — those are the two files the shell actually reads, and a local experiment that edited one and never reverted is a recurring character in this story. Rust toolchain issues (missing target, wrong version) surface as compile errors naming the toolchain; `rustup` is the fix vector.

## Electron-specific

The hardened flags are deliberate — `contextIsolation: true`, `nodeIntegration: false`, `sandbox: true` — so code that "worked in an old Electron tutorial" by reaching for `require` in the renderer will fail here by design; the only bridge is the `window.dte` namespace exposed by the preload. If an external link "doesn't work" from the Electron app, check the allowlist story first: the main process mirrors only the platform domains (a deliberately narrower set than `@dte/shared`'s 13), and `isAllowedUrl` fails closed — a refused link is the guard doing its job, and the fix is adding the domain to `ALLOWED_URL_PREFIXES` in `@dte/shared` (and the mirror, if it's a desktop destination), not bypassing the guard. Full detail in [`docs/architecture/security.md`](../docs/architecture/security.md).

## Still stuck

Reproduce it small: one surface (`pnpm dev:<surface>`), one gate (`pnpm lint` or `pnpm typecheck`), and the exact error text. If it reproduces on a fresh clone with a correct environment, it's a bug — open an issue with the bug-report template and include the environment block; if it doesn't, the delta between the two environments is your answer, and that delta is worth knowing anyway.
