import { defineConfig } from "vite";

/**
 * Legacy alias — kept so `vite build` (no flag) still works locally.
 * The real renderer config is vite.renderer.config.ts.
 */
export default defineConfig({
  root: "src/renderer",
  base: "./",
  build: {
    outDir: "../../dist/renderer",
    emptyOutDir: true,
    target: "es2022"
  }
});
