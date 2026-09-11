#!/usr/bin/env node
/**
 * tooling/scripts/build-all.js — DTE build orchestrator.
 *
 * Builds every surface of the Demon Time Exotics monorepo and reports
 * a per-surface outcome table (matching the BuildOutcome shape used
 * by @dte/shared: { app, ok, durationMs, artifacts }).
 *
 * Surfaces:
 *   landing  → vite build           (GitHub Pages static site)
 *   tauri    → tauri build          (Rust desktop bundles)
 *   electron → build (main+preload+renderer via electron-builder)
 *   mobile   → expo export          (web bundle; native via EAS)
 *
 * Usage:
 *   node tooling/scripts/build-all.js              # all surfaces
 *   node tooling/scripts/build-all.js landing      # a subset
 *   node tooling/scripts/build-all.js --skip-native
 *
 * `--skip-native` builds only the web deliverables (landing + mobile
 * web export + electron renderer) — useful in CI containers without
 * Rust toolchains or mobile SDKs. Native failures are reported as
 * "skipped" rather than errors.
 */

import { spawn } from "node:child_process";
import { access, constants } from "node:fs/promises";
import process from "node:process";

const ROOT = new URL("../../", import.meta.url).pathname;
const SKIP_NATIVE = process.argv.includes("--skip-native");
const PNPM = process.platform === "win32" ? "pnpm.cmd" : "pnpm";

/**
 * Build plan. Each entry names the workspace filter and the script to
 * run inside that workspace, plus the artifacts the build is expected
 * to produce (used for the summary and verification).
 */
const SURFACES = [
  {
    app: "landing",
    filter: "@dte/landing",
    script: "build",
    native: false,
    artifacts: ["apps/landing/dist/index.html"]
  },
  {
    app: "tauri",
    filter: "@dte/tauri",
    script: "tauri build",
    native: true,
    artifacts: ["apps/tauri/src-tauri/target/release"]
  },
  {
    app: "electron",
    filter: "@dte/electron",
    script: "build",
    native: false,
    artifacts: ["apps/electron/dist/main/index.js"]
  },
  {
    app: "mobile",
    filter: "@dte/mobile",
    script: "export",
    native: true,
    artifacts: ["apps/mobile/dist/index.html"]
  }
];

/** Run one command inside one workspace, streaming output through. */
function runWorkspace(filter, script) {
  return new Promise((resolve) => {
    const child = spawn(PNPM, ["--filter", filter, "exec", ...script.split(" ")], {
      cwd: ROOT,
      stdio: "inherit",
      shell: process.platform === "win32"
    });
    child.on("close", (code) => resolve(code === 0));
    child.on("error", () => resolve(false));
  });
}

/** Check that at least one expected artifact exists after a build. */
async function verifyArtifacts(artifacts) {
  for (const relPath of artifacts) {
    try {
      await access(new URL(relPath, `file://${ROOT}`), constants.F_OK);
      return relPath;
    } catch {
      /* keep checking */
    }
  }
  return null;
}

async function main() {
  const requested = process.argv.filter((a) => !a.startsWith("-") && !a.includes("/"));
  const plan = SURFACES.filter(
    (s) =>
      (requested.length === 0 || requested.includes(s.app)) &&
      !(SKIP_NATIVE && s.native)
  );

  console.log("");
  console.log("😈 DEMON TIME EXOTICS — build-all");
  console.log(`   surfaces: ${plan.map((s) => s.app).join(", ") || "none"}`);
  console.log(`   native:   ${SKIP_NATIVE ? "skipped (--skip-native)" : "enabled"}`);
  console.log("");

  const outcomes = [];
  for (const surface of plan) {
    const started = Date.now();
    process.stdout.write(`▶ ${surface.app} … `);
    const ok = await runWorkspace(surface.filter, surface.script);
    const durationMs = Date.now() - started;
    const artifact = ok ? await verifyArtifacts(surface.artifacts) : null;
    outcomes.push({
      app: surface.app,
      ok,
      durationMs,
      artifacts: artifact ? [artifact] : []
    });
    console.log(ok ? `OK (${(durationMs / 1000).toFixed(1)}s${artifact ? ` → ${artifact}` : ""})` : "FAILED");
  }

  console.log("");
  console.log("── build outcomes ─────────────────────────────");
  for (const o of outcomes) {
    const mark = o.ok ? "✅" : "❌";
    const found = o.artifacts.length ? ` (${o.artifacts.join(", ")})` : "";
    console.log(`  ${mark} ${o.app.padEnd(9)} ${(o.durationMs / 1000).toFixed(1)}s${found}`);
  }
  if (SKIP_NATIVE) {
    const skipped = SURFACES.filter((s) => s.native && !plan.includes(s));
    for (const s of skipped) console.log(`  ⏭  ${s.app.padEnd(9)} skipped (--skip-native)`);
  }
  console.log("───────────────────────────────────────────────");

  const failed = outcomes.filter((o) => !o.ok);
  if (failed.length) {
    console.error(`\n💥 ${failed.length} surface(s) failed: ${failed.map((f) => f.app).join(", ")}`);
    process.exit(1);
  }
  console.log("\n🔥 All requested surfaces built. THE MESSY SHOW ships.");
}

main().catch((error) => {
  console.error("build-all crashed:", error);
  process.exit(1);
});
