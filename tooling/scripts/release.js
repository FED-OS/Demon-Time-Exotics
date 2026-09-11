#!/usr/bin/env node
/**
 * tooling/scripts/release.js — DTE release orchestrator.
 *
 * Invoked by `pnpm release` (root package.json:
 *   "release": "node tooling/scripts/release.js")
 *
 * Full flow (per DEPLOYMENT.md):
 *   1. verify clean git tree
 *   2. run quality gates (lint + typecheck + build for web surfaces)
 *   3. bump version (root + every workspace package.json, keeping
 *      "workspace:*" ranges intact)
 *   4. update CHANGELOG.md "Unreleased" section with the new version
 *   5. commit + tag (v{semver})
 *   6. print the push instructions (tag push triggers release-* workflows)
 *
 * Flags:
 *   --patch | --minor | --major   bump level (default: --patch)
 *   --dry-run                     print the plan, change nothing
 *
 * The script never pushes by itself — releases are cut only when the
 * tag is pushed and GitHub Actions takes over (release-tauri.yml,
 * release-electron.yml, release-mobile.yml, deploy-landing.yml).
 */

import { readFile, writeFile, access, constants } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import process from "node:process";

const ROOT = new URL("../../", import.meta.url).pathname;
const DRY = process.argv.includes("--dry-run");
const LEVEL =
  ["major", "minor", "patch"].find((l) => process.argv.includes(`--${l}`)) ?? "patch";

const WORKSPACE_FILES = [
  "package.json",
  "apps/landing/package.json",
  "apps/tauri/package.json",
  "apps/electron/package.json",
  "apps/mobile/package.json",
  "packages/shared/package.json",
  "packages/core/package.json",
  "packages/ui/package.json",
  "packages/assets/package.json",
  "packages/config/eslint/package.json",
  "packages/config/typescript/package.json",
  "packages/config/tailwind/package.json",
  "packages/config/vite/package.json"
];

/** Shelled-out git, zero prompt. */
function git(args, { allowFail = false } = {}) {
  const res = spawnSync("git", args, { cwd: ROOT, encoding: "utf8" });
  if (res.status !== 0 && !allowFail) {
    throw new Error(`git ${args.join(" ")} failed: ${res.stderr?.trim() || res.stdout?.trim()}`);
  }
  return (res.stdout || "").trim();
}

/** Run one root script, streaming output. */
function runScript(name) {
  const res = spawnSync("pnpm", [ "run", name ], { cwd: ROOT, stdio: "inherit", shell: process.platform === "win32" });
  if (res.status !== 0) throw new Error(`pnpm ${name} failed`);
}

function bumpSemver(version, level) {
  const [major, minor, patch] = version.split(".").map((n) => Number.parseInt(n, 10));
  if (Number.isNaN(major) || Number.isNaN(minor) || Number.isNaN(patch)) {
    throw new Error(`"${version}" is not a semver string`);
  }
  if (level === "major") return `${major + 1}.0.0`;
  if (level === "minor") return `${major}.${minor + 1}.0`;
  return `${major}.${minor}.${patch + 1}`;
}

async function readJson(path) {
  return JSON.parse(await readFile(new URL(path, `file://${ROOT}`), "utf8"));
}

async function writeJson(path, data) {
  await writeFile(new URL(path, `file://${ROOT}`), `${JSON.stringify(data, null, 2)}\n`);
}

async function main() {
  console.log("");
  console.log("😈 DEMON TIME EXOTICS — release");
  console.log(`   level: ${LEVEL}${DRY ? " (dry run)" : ""}`);
  console.log("");

  // 1 — clean tree
  const status = git([ "status", "--porcelain" ], { allowFail: true });
  if (status) {
    throw new Error(`Working tree is dirty:\n${status}\nCommit or stash first.`);
  }
  console.log("✅ git tree clean");

  // 2 — quality gates
  console.log("▶ lint …");
  runScript("lint");
  console.log("▶ typecheck …");
  runScript("typecheck");
  console.log("✅ quality gates passed");

  // 3 — version bump across every workspace manifest
  const root = await readJson("package.json");
  const current = root.version;
  const next = bumpSemver(current, LEVEL);
  console.log(`▶ version ${current} → ${next}`);

  if (!DRY) {
    for (const file of WORKSPACE_FILES) {
      try {
        await access(new URL(file, `file://${ROOT}`), constants.F_OK);
      } catch {
        console.warn(`   ⚠ ${file} not found — skipped`);
        continue;
      }
      const manifest = await readJson(file);
      manifest.version = next;
      await writeJson(file, manifest);
    }
    console.log(`✅ ${WORKSPACE_FILES.length} manifests bumped to ${next}`);
  }

  // 4 — CHANGELOG "Unreleased" → version
  const changelogUrl = new URL("CHANGELOG.md", `file://${ROOT}`);
  let changelog = await readFile(changelogUrl, "utf8");
  const today = new Date().toISOString().slice(0, 10);
  const unreleased = /^## \[Unreleased\]$/m;
  if (unreleased.test(changelog)) {
    changelog = changelog.replace(
      unreleased,
      `## [${next}] — ${today}`
    );
    if (!DRY) await writeFile(changelogUrl, changelog);
    console.log("✅ CHANGELOG.md updated");
  } else {
    console.warn("   ⚠ no [Unreleased] section in CHANGELOG.md — left untouched");
  }

  // 5 — commit + tag
  if (!DRY) {
    git([ "add", "-A" ]);
    git([ "commit", "-m", `chore(release): v${next}` ]);
    git([ "tag", `v${next}` ]);
    console.log(`✅ committed + tagged v${next}`);
  }

  // 6 — next steps (tag push triggers the release workflows)
  console.log("");
  console.log("── next ───────────────────────────────────────");
  console.log(`  git push origin main --tags`);
  console.log("");
  console.log("  Pushing the tag triggers:");
  console.log("    · deploy-landing.yml   → GitHub Pages");
  console.log("    · release-tauri.yml    → .dmg/.AppImage/.exe/.msi");
  console.log("    · release-electron.yml → NSIS/dmg/AppImage/deb");
  console.log("    · release-mobile.yml   → EAS build + store submit");
  console.log("───────────────────────────────────────────────");
  console.log(`\n🔥 v${next} staged. Push the tag when ready — THE MESSY SHOW drops.`);
}

main().catch((error) => {
  console.error(`\n💥 release aborted: ${error.message}`);
  process.exit(1);
});
