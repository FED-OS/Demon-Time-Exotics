# BUILD — Build System Reference 🔨

How builds work across the Demon Time Exotics monorepo.

## 🧭 Build Architecture

```
pnpm build (root)
   │
   ├── turbo run build            ← Turborepo orchestrator
   │     │
   │     ├── @dte/shared          (builds first — no deps)
   │     ├── @dte/core            (depends on shared)
   │     ├── @dte/ui              (depends on core, shared)
   │     │
   │     ├── @dte/landing         (depends on ui, core, shared)
   │     ├── @dte/tauri           (depends on ui, core, shared)
   │     ├── @dte/electron        (depends on ui, core, shared)
   │     └── @dte/mobile          (depends on ui, core, shared)
   │
   └── outputs land in each app's build directory (see table)
```

Turborepo reads `turbo.json`, resolves the dependency graph from workspace
`dependencies` fields, builds `packages/*` first, then builds apps in
parallel. Build outputs are cached in `.turbo/` (gitignored) — repeat builds
are near-instant unless inputs changed.

## 📦 Per-Target Build Reference

| App | Command | Output Location | Notes |
|---|---|---|---|
| 🌐 Landing | `pnpm build:landing` | `apps/landing/dist/` | Static site → GitHub Pages |
| 🖥️ Tauri | `pnpm build:tauri` | `apps/tauri/src-tauri/target/release/bundle/` | `.msi` `.exe` `.dmg` `.AppImage` `.deb` |
| 🖥️ Electron | `pnpm build:electron` | `apps/electron/release/` | `.exe` `.dmg` `.AppImage` `.snap` |
| 📱 Mobile | `pnpm build:mobile` | `apps/mobile/dist/` | Expo export (JS bundles) — see EAS for store builds |
| 🧩 Packages | `pnpm --filter @dte/ui build` (etc.) | `packages/*/dist/` | TypeScript declarations |

## 🌐 Landing Build

```bash
pnpm build:landing
```

- **Tool:** Vite 5
- **Base path:** `/demon-time-exotics/` (GitHub Pages project URL) — change
  in `apps/landing/vite.config.ts` if using a custom domain
- **Output:** `apps/landing/dist/`
- **Deploy:** automatic via `.github/workflows/deploy-landing.yml` on push to
  `main` (or `gh-pages` branch manually)

Preview a production build locally:

```bash
pnpm --filter @dte/landing preview
```

## 🖥️ Tauri Build

```bash
pnpm build:tauri
# = pnpm --filter @dte/tauri tauri build
```

Pipeline: Vite builds the frontend → Rust release build → platform bundling.

**Output bundles:**

| Platform | Artifacts |
|---|---|
| Windows | `.msi` (WiX) + NSIS `.exe` installer |
| macOS | `.dmg` + `.app` (universal) |
| Linux | `.AppImage` + `.deb` |

**Prerequisites:** Rust stable + platform deps (see [INSTALL.md](INSTALL.md)).

**Debug build (fast dev iteration):**

```bash
pnpm --filter @dte/tauri tauri build --debug
```

**Config:** `apps/tauri/src-tauri/tauri.conf.json` — app identifiers, window
size, bundle icons (in `src-tauri/icons/`), updater endpoints.

## 🖥️ Electron Build

```bash
pnpm build:electron
# = pnpm --filter @dte/electron build
```

Pipeline: Vite builds renderer → `tsc` compiles main/preload →
electron-builder packages.

**Output artifacts** (from `apps/electron/electron-builder.yml`):

| Platform | Artifacts |
|---|---|
| Windows | NSIS `.exe` (auto-updates enabled) |
| macOS | `.dmg` (universal) |
| Linux | `.AppImage` + `.snap` |

**Prerequisites:** None beyond Node/pnpm. For macOS code signing on CI:
secrets `APPLE_ID`, `APPLE_APP_SPECIFIC_PASSWORD`, `APPLE_TEAM_ID`.

**Config:** `apps/electron/electron-builder.yml` — appId, productName,
artifact names, publish targets (GitHub releases).

## 📱 Mobile Build

Two build modes:

### 1. Local JS export (no native toolchain needed)

```bash
pnpm build:mobile      # expo export → apps/mobile/dist
```

### 2. Native / store builds via EAS (cloud or local)

```bash
# Login once
eas login

# Android app bundle
eas build --platform android

# iOS (needs Apple Developer account; cloud build works from any OS)
eas build --platform ios

# Local native build (needs Android Studio / Xcode installed)
eas build --platform android --local
eas build --platform ios --local
```

**Config:** `apps/mobile/eas.json` — development / preview / production
profiles.

## 🧩 Package Builds

Shared packages are consumed as TypeScript source via workspace `*`
protocol — apps' bundlers (Vite/Metro) compile them directly, so most day-to-day
work never builds packages separately. But each package has a `build` script
for standalone verification:

```bash
pnpm --filter @dte/ui build
pnpm --filter @dte/core build
pnpm --filter @dte/shared build
```

## 🏷️ Versioning & Releasing

- **Versioning:** [SemVer](https://semver.org/) — MAJOR.MINOR.PATCH
- **Bump:** `pnpm --filter <pkg> version <major|minor|patch>`
- **Changelog:** update `CHANGELOG.md` under `## [Unreleased]`, move to a
  tagged section at release time
- **Release flow:** see [DEPLOYMENT.md](DEPLOYMENT.md)

## ⚡ Turborepo Tips

- `pnpm build` — full build with cache
- `pnpm build --force` — ignore cache, rebuild everything
- `npx turbo run build --graph` — print the dependency graph
- `npx turbo run build --filter=@dte/landing...` — build landing **and its deps**
- Cache lives in `.turbo/` — nuke it with `pnpm clean`

## 🔍 Build Verification

CI (`.github/workflows/build.yml`) builds every target on a matrix:

- **ubuntu-latest** → landing, electron (linux), mobile export, tauri (linux)
- **windows-latest** → electron (win), tauri (win)
- **macos-latest** → electron (mac), tauri (mac), mobile iOS

A PR that breaks any target's build fails the required status check.

---

Next: [DEPLOYMENT.md](DEPLOYMENT.md) • Back to [README](README.md)
