import { defineConfig } from "vite";

/**
 * Demon Time Exotics — Electron renderer build.
 *
 * Bundles the renderer (web layer) only. Main/preload processes are
 * compiled by `tsc` (see tsconfig.build.json) because they target
 * Node/Electron, not the browser — Vite would strip their APIs.
 *
 * Dev mode: Vite dev server on 5174; `ELECTRON_RENDERER_URL` tells
 * the main process whether to load the dev server or dist files.
 */
export default defineConfig({
  root: "src/renderer",
  base: "./",
  build: {
    outDir: "../../dist/renderer",
    emptyOutDir: true,
    target: "es2022",
    assetsInlineLimit: 4096
  },
  server: {
    port: 5174,
    strictPort: true
  }
});
