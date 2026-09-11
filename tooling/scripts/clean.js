#!/usr/bin/env node
/**
 * tooling/scripts/clean.js — DTE workspace cleaner.
 *
 * Invoked by `pnpm clean` (root package.json:
 *   "clean": "turbo run clean && node tooling/scripts/clean.js")
 *
 * Removes build outputs, caches and artifacts that Turborepo's
 * per-package `clean` tasks don't expand: root-level caches, dist
 * dirs, Tauri target/, Expo .expo/, Electron release/, and
 * node_modules when --deep.
 *
 * Flags: --dry-run (print, don't delete) · --deep (also node_modules)
 */

import { rm, access, readdir } from "node:fs/promises";
import { constants } from "node:fs";
import process from "node:process";

const ROOT = new URL("../../", import.meta.url).pathname;
const DRY = process.argv.includes("--dry-run");
const DEEP = process.argv.includes("--deep");

/** Literal paths removed on every clean run (relative to repo root). */
const LITERAL_PATHS = [
  ".turbo",
  "coverage",
  "apps/landing/dist",
  "apps/tauri/dist",
  "apps/tauri/src-tauri/target",
  "apps/electron/dist",
  "apps/electron/release",
  "apps/mobile/dist",
  "apps/mobile/.expo",
  "apps/mobile/web-build"
];

/** Glob-styled patterns expanded against the workspace tree. */
const GLOB_PATTERNS = [
  { base: "apps", child: ["dist", "release", ".expo", "web-build"] },
  { base: "packages", child: ["dist"] }
];

/** Extra paths removed only with --deep (full reset). */
const DEEP_PATTERNS = [
  { base: "apps", child: ["node_modules"] },
  { base: "packages", child: ["node_modules"] },
  { base: "packages/config", child: ["node_modules"] }
];

const log = (icon, msg) => console.log(`${icon}  ${msg}`);

async function exists(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function cleanPath(relPath) {
  const path = `${ROOT}${relPath}`;
  if (!(await exists(path))) return false;
  if (DRY) {
    log("dry", `[dry-run] would remove ${relPath}`);
    return true;
  }
  await rm(path, { recursive: true, force: true });
  log("🔥", `removed ${relPath}`);
  return true;
}

async function expandPatterns(patterns) {
  const paths = [];
  for (const { base, child } of patterns) {
    let entries;
    try {
      entries = await readdir(`${ROOT}${base}`, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const entry of entries) {
      if (!entry.isDirectory() || entry.name === "node_modules") continue;
      for (const leaf of child) paths.push(`${base}/${entry.name}/${leaf}`);
    }
  }
  return paths;
}

async function main() {
  log("😈", `Demon Time Exotics — clean${DEEP ? " (deep)" : ""}${DRY ? " (dry-run)" : ""}`);

  const globPatterns = DEEP ? [...GLOB_PATTERNS, ...DEEP_PATTERNS] : GLOB_PATTERNS;
  const expanded = await expandPatterns(globPatterns);
  const all = [...LITERAL_PATHS, ...expanded];

  let removed = 0;
  for (const path of all) {
    if (await cleanPath(path)) removed++;
  }

  log(
    removed > 0 ? "✅" : "👍",
    removed > 0
      ? `${removed} paths removed — repo is clean.`
      : "Nothing to clean — already spotless."
  );
}

main().catch((error) => {
  console.error("❌ clean failed:", error);
  process.exit(1);
});
