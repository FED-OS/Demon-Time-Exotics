# @dte/gen-component

Scaffolds a new Demon Time Exotics component folder in one shot: a typed, framework-free DOM component for the web surfaces (landing, Tauri, Electron renderer, @dte/ui) or a React Native component for the mobile surface, plus an automatic barrel append so the new export is live the moment the file lands.

## Usage

Run from the repo root:

```bash
node tooling/generators/component/index.js <Name> [--surface landing|tauri|electron|mobile|ui] [--dir path/to/dir] [--dry-run]
```

The generator is also wired as a workspace bin (`dte-gen-component`) and a `component` script inside `tooling/generators/component/package.json`, so after a `pnpm install` it can be invoked with `pnpm --filter @dte/gen-component component <Name>`.

## Surfaces

The `--surface` flag decides the template flavor and the default target directory. The `landing` surface writes into `apps/landing/src/components/sections`, `tauri` into `apps/tauri/src/components`, `electron` into `apps/electron/src/renderer/components`, `mobile` into `apps/mobile/src/components` (React Native, `.tsx`), and `ui` into `packages/ui/src/components`. Passing `--dir` overrides any default with an explicit path relative to the repo root.

## What gets written

For web surfaces the generator emits a `<Name>.ts` file exporting a function that returns a `HTMLElement`, following the ADR-0007 framework-free pattern used across the repo: no React import, styling via class names driven by the brand tokens, and an options object as the single input. For the mobile surface it emits a `<Name>.tsx` React Native function component with co-located `StyleSheet`. When a local `index.ts` barrel exists, the new export line is appended automatically; the generator refuses to overwrite an existing component file and skips the barrel append if the export is already present.

## Examples

```bash
node tooling/generators/component/index.js RosterGrid
node tooling/generators/component/index.js GearList --surface mobile
node tooling/generators/component/index.js HubCard --dir packages/ui/src/components
node tooling/generators/component/index.js FireTicker --dry-run
```
