#!/usr/bin/env node
/**
 * tooling/scripts/dev-all.js — DTE parallel dev server launcher.
 *
 * Boots the dev servers for every surface at once (or a subset) so
 * the whole hub is live on one machine:
 *
 *   landing  → vite           http://localhost:5173  (base /demon-time-exotics/)
 *   tauri    → tauri dev      http://localhost:1420  (strictPort, opens the shell)
 *   electron → dev            http://localhost:5174  (renderer + main process)
 *   mobile   → expo start     http://localhost:8081  (Metro bundler)
 *
 * Usage:
 *   node tooling/scripts/dev-all.js                # everything
 *   node tooling/scripts/dev-all.js landing mobile # just those
 *
 * Ctrl-C once stops all children (the SIGINT is forwarded to each
 * spawned process group, and a second Ctrl-C force-exits).
 */

import { spawn } from "node:child_process";
import process from "node:process";

const ROOT = new URL("../../", import.meta.url).pathname;
const PNPM = process.platform === "win32" ? "pnpm.cmd" : "pnpm";

/** Dev plan — workspace filter, package script, and the URL it serves. */
const SURFACES = [
  { app: "landing", filter: "@dte/landing", script: "dev", url: "http://localhost:5173/demon-time-exotics/" },
  { app: "tauri", filter: "@dte/tauri", script: "tauri dev", url: "http://localhost:1420" },
  { app: "electron", filter: "@dte/electron", script: "dev", url: "http://localhost:5174" },
  { app: "mobile", filter: "@dte/mobile", script: "start", url: "http://localhost:8081" }
];

/** Normalized per-OS args, with `--` separation so pnpm forwards args. */
function pnpmArgs(filter, script) {
  const [cmd, ...rest] = script.split(" ");
  return ["--filter", filter, "run", cmd, ...rest];
}

async function main() {
  const requested = process.argv.filter((a) => !a.startsWith("-") && !a.includes("/"));
  const plan = SURFACES.filter((s) => requested.length === 0 || requested.includes(s.app));

  if (plan.length === 0) {
    console.error("No matching surfaces. Known surfaces: landing, tauri, electron, mobile.");
    process.exit(1);
  }

  console.log("");
  console.log("😈 DEMON TIME EXOTICS — dev-all");
  plan.forEach((s) => console.log(`   ${s.app.padEnd(9)} → ${s.url}`));
  console.log("   (Ctrl-C once to stop all · second Ctrl-C force-exits)");
  console.log("");

  const children = [];
  for (const surface of plan) {
    const child = spawn(PNPM, pnpmArgs(surface.filter, surface.script), {
      cwd: ROOT,
      stdio: ["ignore", "pipe", "pipe"],
      shell: process.platform === "win32",
      env: { ...process.env, FORCE_COLOR: "1" }
    });
    children.push({ surface, child });

    const tag = `[${surface.app}]`;
    child.stdout.on("data", (chunk) => {
      chunk
        .toString()
        .split("\n")
        .filter(Boolean)
        .forEach((line) => process.stdout.write(`${tag} ${line}\n`));
    });
    child.stderr.on("data", (chunk) => {
      chunk
        .toString()
        .split("\n")
        .filter(Boolean)
        .forEach((line) => process.stderr.write(`${tag} ${line}\n`));
    });
    child.on("exit", (code) => {
      if (shuttingDown) return;
      console.log(`${tag} exited (code ${code}) — keeping the rest alive.`);
    });
  }

  let shuttingDown = false;
  const stop = (force = false) => {
    if (shuttingDown && !force) return;
    shuttingDown = true;
    console.log("\n🛑 Stopping dev servers …");
    for (const { child } of children) {
      if (force) {
        child.kill("SIGKILL");
      } else {
        child.kill("SIGINT");
        if (typeof child.pid === "number" && process.platform !== "win32") {
          try { process.kill(-child.pid, "SIGINT"); } catch { /* already gone */ }
        }
      }
    }
    if (!force) setTimeout(() => stop(true), 2500).unref();
  };

  process.on("SIGINT", () => (shuttingDown ? process.exit(0) : stop()));
  process.on("SIGTERM", () => stop());

  // Resolve once every child exits naturally.
  await Promise.all(children.map(({ child }) => new Promise((r) => child.on("exit", r))));
}

main().catch((error) => {
  console.error("dev-all crashed:", error);
  process.exit(1);
});
