# @dte/config-typescript

Shared [TypeScript config presets](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) for the **Demon Time Exotics** monorepo.

## Usage

Extend a preset from any workspace `tsconfig.json`:

```jsonc
// apps/landing/tsconfig.json (web surface)
{
  "extends": "@dte/config-typescript/web.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@dte/shared": ["../../packages/shared/src/index.ts"]
    }
  },
  "include": ["src"]
}
```

```jsonc
// apps/mobile/tsconfig.json (React Native surface)
{
  "extends": "@dte/config-typescript/react-native.json",
  "include": ["app", "src"]
}
```

```jsonc
// tooling or Electron main
{
  "extends": "@dte/config-typescript/node.json"
}
```

## Presets

| Preset | Target | Notes |
| --- | --- | --- |
| `base.json` | ES2022, strict | Shared foundation (no DOM libs) |
| `web.json` | Browser surfaces | Adds `DOM`, `DOM.Iterable`, `vite/client` |
| `node.json` | Electron main, tooling | Adds `node` types |
| `react-native.json` | Expo app | `react-jsx`, `react-native` types, `.tsx` imports |

> The repo root also ships `tsconfig.base.json` with the workspace `paths` mapping (`@dte/ui`, `@dte/core`, `@dte/shared`, `@dte/assets/*`) — the presets here exist for workspaces that prefer preset-style extension and for `tsc -p` builds that must not inherit root paths.

> Apps in this repo currently extend the root `tsconfig.base.json` directly (it carries the `paths` map); these presets are the extract for external reuse.
