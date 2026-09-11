import { defineConfig } from "vite";

/**
 * Demon Time Exotics — Landing (GitHub Pages)
 *
 * The landing site is deliberately framework-free vanilla TypeScript (ADR-0007).
 * Vite is used purely as the bundler/dev-server and asset pipeline.
 *
 * `base` is set for a GitHub Pages project site:
 *   https://<user>.github.io/demon-time-exotics/
 * Remove or change `base` if deploying to a user site (<user>.github.io)
 * or a custom domain via public/CNAME.
 */
export default defineConfig({
  base: "/demon-time-exotics/",
  publicDir: "public",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    target: "es2022",
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name].[hash].js",
        chunkFileNames: "assets/[name].[hash].js",
        assetFileNames: "assets/[name].[hash].[ext]",
      },
    },
  },
  server: {
    port: 5173,
    strictPort: false,
    open: false,
  },
  preview: {
    port: 4173,
  },
});
