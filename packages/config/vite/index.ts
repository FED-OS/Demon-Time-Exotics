/**
 * @dte/config-vite — shared Vite config factories.
 *
 * Usage (any workspace vite.config.ts):
 *
 *   import { defineConfig } from "vite";
 *   import { webPreset } from "@dte/config-vite/web";
 *
 *   export default defineConfig(webPreset({ base: "/demon-time-exotics/" }));
 *
 * The apps currently ship explicit inline configs (self-contained per
 * ADR-0007) — these factories are the extract for reuse/new apps.
 */

import type { UserConfig } from "vite";

/** Shared build defaults (es2022, hashed assets, 4kb inline). */
const baseBuild: UserConfig["build"] = {
  outDir: "dist",
  emptyOutDir: true,
  target: "es2022",
  assetsInlineLimit: 4096
};

/** Web preset (landing / any hosted site). */
export function webPreset(options: { base?: string; port?: number } = {}): UserConfig {
  return {
    base: options.base ?? "/",
    publicDir: "public",
    build: {
      ...baseBuild,
      rollupOptions: {
        output: {
          entryFileNames: "assets/[name].[hash].js",
          chunkFileNames: "assets/[name].[hash].js",
          assetFileNames: "assets/[name].[hash].[ext]"
        }
      }
    },
    server: { port: options.port ?? 5173, strictPort: false, open: false },
    preview: { port: 4173 }
  };
}

/** Tauri preset (fixed port 1420, TAURI_ENV_ vars, no base path). */
export function tauriPreset(): UserConfig {
  return {
    base: "/",
    publicDir: "public",
    clearScreen: false,
    server: { port: 1420, strictPort: true, host: "localhost" },
    build: baseBuild,
    envPrefix: ["VITE_", "TAURI_ENV_"]
  };
}

/** Electron renderer preset (root src/renderer, port 5174, relative base). */
export function electronPreset(): UserConfig {
  return {
    root: "src/renderer",
    base: "./",
    build: {
      ...baseBuild,
      outDir: "../../dist/renderer",
      emptyOutDir: true
    },
    server: { port: 5174, strictPort: true }
  };
}
