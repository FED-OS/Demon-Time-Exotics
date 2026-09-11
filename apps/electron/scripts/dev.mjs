#!/usr/bin/env node
/**
 * Dev orchestrator for @dte/electron.
 *
 * Boots the Vite renderer dev server, then launches Electron with
 * ELECTRON_RENDERER_URL pointing at it. Killing this script tears
 * down both processes (turbo/dev-all friendly).
 */
import { spawn } from "node:child_process";
import { createServer } from "node:vite";

const rendererPort = 5174;

const server = await createServer({
  configFile: "vite.renderer.config.ts"
});

await server.listen(rendererPort);
const address = server.resolvedUrls?.local?.[0] ?? `http://localhost:${rendererPort}/`;
console.log(`[dte] renderer dev server → ${address}`);

const electron = spawn("electron", ["."], {
  stdio: "inherit",
  env: { ...process.env, ELECTRON_RENDERER_URL: address, NODE_ENV: "development" }
});

const shutdown = (code = 0) => {
  server.close();
  electron.kill("SIGTERM");
  process.exit(code);
};

electron.on("exit", (code) => shutdown(code ?? 0));
process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));
