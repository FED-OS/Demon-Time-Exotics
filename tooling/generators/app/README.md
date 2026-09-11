# @dte/gen-app

Scaffolds a brand-new app workspace under `apps/` with the full DTE starter set. One command turns an empty repo corner into a running vanilla-TypeScript Vite surface wired to `@dte/shared` and `@dte/core`, complete with brand tokens, an index.html shell, and the standard barrel scaffold.

## Usage

Run from the repo root:

```bash
node tooling/generators/app/index.js <name> [--type web] [--dry-run]
```

The generator is also wired as a workspace bin (`dte-gen-app`) and an `app` script in `tooling/generators/app/package.json`, so after a `pnpm install` it can be invoked with `pnpm --filter @dte/gen-app app <name>`.

## What gets written

Ten files land in `apps/<kebab-name>/`: `package.json` (workspace-protocol deps on `@dte/shared` and `@dte/core`, devDeps on the three config packages plus Vite 5, TypeScript 5.6 and ESLint 9), `tsconfig.json` extending the repo base, `vite.config.ts` built on the `webPreset` from `@dte/config-vite`, an `index.html` shell with the DTE topbar and gradient hero title, `src/styles/styles.css` preloaded with every brand token (`--fire`, `--inferno`, `--purple`, `--gold`, `--ember`, `--ink`, `--paper`, `--muted`), `src/main.ts` thin entry, `src/lib/index.ts` with counter and platform-hub helpers importing from `@dte/shared`, and empty `components/`, `pages/` and `hooks/` barrels. The generator refuses to clobber an existing app directory and prints the exact follow-up commands (`pnpm install`, `pnpm --filter @dte/<name> dev`, `pnpm --filter @dte/<name> build`).

## Types

Only the `web` type is generated directly. Tauri, Electron and Expo surfaces carry native toolchains (Rust, electron-builder, EAS) that a template stamp can't fully own — for those, copy the existing `apps/tauri`, `apps/electron` or `apps/mobile` directories as living templates; their structures are documented in `docs/architecture/`.

## Example

```bash
node tooling/generators/app/index.js Cliphouse
# → apps/cliphouse/ with 10 files, package name @dte/cliphouse
```
