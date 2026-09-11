import { defineConfig } from "vite";

/**
 * Demon Time Exotics — Tauri frontend build.
 *
 * Tauri serves this dev server URL in the native window and bundles
 * the built assets inside the final binary (frontendDist → dist).
 * Vanilla TS + Vite, mirroring the landing philosophy (ADR-0007).
 *
 * ⚠️ Tauri requires a fixed port in dev so clearOnIdle doesn't kill
 * the window during HMR. `server.strictPort: true` enforces 1420.
 */
export default defineConfig({
  // Tauri expects a fixed dev port and relative assets (no base path).
  base: "/",
  publicDir: "public",
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
    host: "localhost",
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    target: "es2022",
    assetsInlineLimit: 4096,
  },
  // Tauri CLI injects TAURI_ENV_* vars — silence untrusted warning.
  envPrefix: ["VITE_", "TAURI_ENV_"],
});
