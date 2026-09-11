#!/usr/bin/env node
/**
 * tooling/generators/component/index.js — DTE component scaffolder.
 *
 * Stamps out a new component folder for the Demon Time Exotics
 * surfaces. Web surfaces (landing/tauri/electron renderer) use the
 * framework-free DOM pattern from ADR-0007; the mobile surface uses
 * a React Native function component. An `--index` entry is appended
 * to the target barrel so the new export is live immediately.
 *
 * Usage:
 *   node tooling/generators/component/index.js <Name> [--surface landing|tauri|electron|mobile|ui]
 *                                              [--dir apps/landing/src/components/sections]
 *                                              [--dry-run]
 *
 * Examples:
 *   node tooling/generators/component/index.js RosterGrid
 *   node tooling/generators/component/index.js GearList --surface mobile
 *   node tooling/generators/component/index.js HubCard --dir packages/ui/src/components
 */

import { mkdir, readFile, writeFile, access, constants } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import process from "node:process";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "../../..");
const DRY = process.argv.includes("--dry-run");

/** CLI args: positional name + flags. */
const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const flags = new Set(process.argv.slice(2).filter((a) => a.startsWith("--")));
function flagValue(key) {
  // Supports both `--key=value` and `--key value` forms.
  const eq = process.argv.find((a) => a.startsWith(`--${key}=`));
  if (eq) return eq.split("=").slice(1).join("=");
  const idx = process.argv.indexOf(`--${key}`);
  if (idx !== -1 && process.argv[idx + 1] && !process.argv[idx + 1].startsWith("--")) {
    return process.argv[idx + 1];
  }
  return null;
}

const SURFACE_DEFAULTS = {
  landing: { dir: "apps/landing/src/components/sections", style: "web" },
  tauri: { dir: "apps/tauri/src/components", style: "web" },
  electron: { dir: "apps/electron/src/renderer/components", style: "web" },
  mobile: { dir: "apps/mobile/src/components", style: "rn" },
  ui: { dir: "packages/ui/src/components", style: "web" }
};

/** PascalCase + kebab-case helpers for filenames. */
function pascal(input) {
  return input
    .replace(/[^a-zA-Z0-9]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""))
    .replace(/^./, (c) => c.toUpperCase());
}
function kebab(input) {
  return input.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

function templateWeb(name, surface) {
  // The primitives import only resolves inside packages/ui; app
  // surfaces pull data straight from @dte/shared instead.
  const uiImport =
    surface === "ui"
      ? `import { button, card, badge } from "../primitives/index.js";\n`
      : "";
  return `${uiImport}import { CHANNEL_STATS } from "@dte/shared";

/**
 * ${name} — Demon Time Exotics component (framework-free, ADR-0007).
 *
 * Returns a DOM element; the caller appends it. Keep it pure: read
 * inputs from the argument object, never from globals.
 */
export function ${name}(options = {}) {
  const root = document.createElement("section");
  root.className = "${kebab(name)}";
  root.setAttribute("data-component", "${kebab(name)}");

  // Example structure — replace with the real markup.
  const heading = document.createElement("h3");
  heading.className = "${kebab(name)}__title";
  heading.textContent = options.title ?? "${name}";
  root.append(heading);

  if (options.badge) {
    root.append(badge(options.badge, "fire"));
  }
  if (options.children) {
    root.append(...(Array.isArray(options.children) ? options.children : [options.children]));
  }

  return root;
}

export default ${name};
`;
}

function templateRN(name) {
  return `import { Text, View, StyleSheet } from "react-native";

/**
 * ${name} — Demon Time Exotics mobile component (React Native).
 *
 * Keep styles co-located and token-driven: pull colors from the
 * theme in _layout.tsx (ThemeProvider / DteTheme) rather than
 * hardcoding hex values.
 */
export function ${name}({ title = "${name}" }: { title?: string }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderWidth: 1,
    borderColor: "rgba(139, 47, 214, 0.45)",
    borderRadius: 14,
    padding: 14,
    backgroundColor: "#0d0d0d"
  },
  title: {
    color: "#f4f4f5",
    fontSize: 16,
    fontWeight: "700"
  }
});

export default ${name};
`;
}

async function main() {
  const rawName = args[0];
  if (!rawName || flags.has("--help")) {
    console.log(`Usage: node tooling/generators/component/index.js <Name> [options]

  --surface   landing | tauri | electron | mobile | ui   (default landing)
  --dir       explicit target directory (overrides --surface default)
  --dry-run   print the plan without writing files`);
    process.exit(rawName ? 0 : 1);
  }

  const surface = flagValue("surface") ?? "landing";
  const preset = SURFACE_DEFAULTS[surface];
  if (!preset) {
    console.error(`Unknown surface "${surface}". Known: ${Object.keys(SURFACE_DEFAULTS).join(", ")}`);
    process.exit(1);
  }

  const name = pascal(rawName);
  const targetDir = flagValue("dir") ?? preset.dir;
  const dirAbs = path.join(ROOT, targetDir);
  const fileBase = preset.style === "rn" ? `${name}.tsx` : `${name}.ts`;
  const filePath = path.join(dirAbs, fileBase);
  const barrelPath = path.join(dirAbs, "index.ts");

  const body =
    preset.style === "rn"
      ? templateRN(name)
      : templateWeb(name, surface);

  console.log("");
  console.log("😈 DTE component generator");
  console.log(`   name:     ${name}`);
  console.log(`   surface:  ${surface} (${preset.style})`);
  console.log(`   target:   ${targetDir}/${fileBase}`);
  console.log(`   barrel:   ${targetDir}/index.ts`);
  console.log("");

  if (DRY) {
    console.log("─ preview " + "─".repeat(30));
    console.log(body);
    return;
  }

  await mkdir(dirAbs, { recursive: true });

  // Never clobber an existing component.
  try {
    await access(filePath, constants.F_OK);
    console.error(`💥 ${filePath} already exists — refusing to overwrite.`);
    process.exit(1);
  } catch {
    /* not there — good */
  }

  await writeFile(filePath, body);
  console.log(`✅ wrote ${filePath}`);

  // Append the export to the local barrel if it exists.
  try {
    await access(barrelPath, constants.F_OK);
    const barrel = await readFile(barrelPath, "utf8");
    const exportLine = `export { ${name}, default as ${name}Default } from "./${name}.js";`;
    if (preset.style === "rn") {
      const rnLine = `export { ${name} } from "./${name}";`;
      if (!barrel.includes(`from "./${name}"`)) {
        await writeFile(barrelPath, `${barrel.trimEnd()}\n${rnLine}\n`);
        console.log(`✅ appended to ${barrelPath}`);
      }
    } else if (!barrel.includes(`from "./${name}.js"`)) {
      await writeFile(barrelPath, `${barrel.trimEnd()}\n${exportLine}\n`);
      console.log(`✅ appended to ${barrelPath}`);
    } else {
      console.log(`=  ${name} already exported from ${barrelPath}`);
    }
  } catch {
    console.log(`ℹ  no barrel at ${barrelPath} — skipped export step`);
  }

  console.log(`\n🔥 ${name} scaffolded. Wire it up and make it messy.`);
}

main().catch((error) => {
  console.error("component generator crashed:", error);
  process.exit(1);
});
