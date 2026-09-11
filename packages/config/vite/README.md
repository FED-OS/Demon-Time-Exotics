# @dte/config-vite

Shared [Vite 5](https://vitejs.dev/config/) config factories for the **Demon Time Exotics** build surfaces.

## Usage

```ts
// vite.config.ts (new web app)
import { defineConfig } from "vite";
import { webPreset } from "@dte/config-vite/web";

export default defineConfig(webPreset({ base: "/demon-time-exotics/" }));
```

```ts
// Tauri frontend
import { defineConfig } from "vite";
import { tauriPreset } from "@dte/config-vite/tauri";

export default defineConfig(tauriPreset());
```

```ts
// Electron renderer
import { defineConfig } from "vite";
import { electronPreset } from "@dte/config-vite/electron";

export default defineConfig(electronPreset());
```

## Factories

| Factory | Surface | Defaults |
| --- | --- | --- |
| `webPreset({ base, port })` | landing / hosted sites | hashed `assets/` output, port 5173, preview 4173 |
| `tauriPreset()` | Tauri frontend | fixed port **1420** (`strictPort`), `TAURI_ENV_` env prefix, no base path |
| `electronPreset()` | Electron renderer | root `src/renderer`, relative `./` base, port **5174**, output `dist/renderer` |

Shared build defaults: `target: "es2022"`, `assetsInlineLimit: 4096`, `emptyOutDir: true`.

> The three apps in this repo currently ship self-contained inline `vite.config.ts` files (explicit per ADR-0007, e.g. the landing sets the GitHub Pages `base` and Tauri pins port 1420 for its window lifecycle). These factories are the extracted equivalents — use them for new apps or when consolidating.
