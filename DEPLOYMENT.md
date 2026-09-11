# DEPLOYMENT — Release & Deployment Guide 🚀

How the Demon Time Exotics ecosystem ships: the landing site to GitHub Pages,
desktop apps to GitHub Releases, and mobile apps to EAS builds.

## 🌊 Branch & Release Model

| Branch | Purpose |
|---|---|
| `main` | Stable. Landing deploys here. Releases tag from here. |
| `develop` | Integration branch (optional) |
| `feat/*` `fix/*` | Short-lived working branches → PR into `main` |

**Releases** are git tags: `v1.0.0`, `v1.1.0`, … Tags trigger release
workflows (below).

## 🌐 Landing Site — GitHub Pages

**Trigger:** push to `main`
**Workflow:** `.github/workflows/deploy-landing.yml`
**URL:** https://dtemoney448.github.io/demon-time-exotics/

**Pipeline:**

1. Checkout `main`
2. `pnpm install` (workspace)
3. `pnpm build:landing` → `apps/landing/dist`
4. Upload artifact → deploy to `gh-pages` branch via `actions/deploy-pages`
5. Pages site goes live (typically < 2 minutes)

**Custom domain (optional):**

1. Add a `CNAME` file in `apps/landing/public/` with your domain
2. Repo → Settings → Pages → Custom domain → set it
3. Update `base: '/'` in `apps/landing/vite.config.ts`

**Manual deploy (no CI):**

```bash
pnpm build:landing
npx gh-pages -d apps/landing/dist -t true
```

## 🖥️ Tauri Desktop — GitHub Releases

**Trigger:** tag `v*`
**Workflow:** `.github/workflows/release-tauri.yml`
**Output:** `.msi` / `.exe` / `.dmg` / `.AppImage` / `.deb` attached to a
GitHub Release

**Matrix:** windows-latest, macos-latest, ubuntu-22.04 (for the Linux bundle)

**Local build & manual publish:**

```bash
pnpm build:tauri
# artifacts in apps/tauri/src-tauri/target/release/bundle/
```

**Updater endpoint (optional):** configure `plugins.updater` in
`tauri.conf.json` with a signing keypair — secrets:
`TAURI_SIGNING_PRIVATE_KEY`, `TAURI_SIGNING_PRIVATE_KEY_PASSWORD`.

## 🖥️ Electron Desktop — GitHub Releases

**Trigger:** tag `v*`
**Workflow:** `.github/workflows/release-electron.yml`
**Output:** NSIS `.exe`, `.dmg`, `.AppImage`, `.snap` attached to a GitHub Release

**Matrix:** windows-latest, macos-latest, ubuntu-latest

**Mac code signing secrets (optional):**

| Secret | Purpose |
|---|---|
| `APPLE_ID` | Apple ID email |
| `APPLE_APP_SPECIFIC_PASSWORD` | app-specific password (not account pw) |
| `APPLE_TEAM_ID` | 10-char team ID |
| `CSC_LINK` | `.p12` cert base64 (for a signing cert) |
| `CSC_KEY_PASSWORD` | cert password |

**Auto-update:** electron-builder `publish: github` is configured — published
builds self-update from GitHub Releases.

**Local build:**

```bash
pnpm build:electron
# artifacts in apps/electron/release/
```

## 📱 Mobile — EAS Build & Submit

**Workflow:** `.github/workflows/release-mobile.yml`
**Trigger:** tag `v*` or manual dispatch
**Output:** `.apk` / `.aab` (Android) + iOS build via EAS, artifacts uploaded
to the GitHub Release

**Required secrets:**

| Secret | Purpose |
|---|---|
| `EXPO_TOKEN` | EAS access token (from `eas whoami` / expo.dev accounts) |
| `ANDROID_SERVICE_ACCOUNT_KEY` | (submit only) Play Store service JSON |
| `APPLE_API_KEY_ID` / `APPLE_API_ISSUER_ID` / `APPLE_API_KEY_P8` | (submit only) App Store Connect API |

**From your machine:**

```bash
eas login
eas build --platform android --profile production   # .aab
eas build --platform ios --profile production       # iOS archive

# Submit to stores (one-time setup per platform)
eas submit --platform android --latest
eas submit --platform ios --latest
```

**OTA updates (JS-only changes):**

```bash
eas update --branch production
```

## 🔄 Complete Release Checklist

1. [ ] All CI green on `main`
2. [ ] `CHANGELOG.md` updated (`## [Unreleased]` → new version section)
3. [ ] Versions bumped where changed (`pnpm --filter <pkg> version <bump>`)
4. [ ] `git tag v<version>` && `git push origin v<version>`
5. [ ] Release workflows run → verify artifacts on the GitHub Release
6. [ ] Landing site deployed & spot-checked (hero, links, mobile view)
7. [ ] Desktop installers smoke-tested (install + open + core nav)
8. [ ] Mobile builds downloaded & smoke-tested
9. [ ] Release notes published on the GitHub Release
10. [ ] Announce: YouTube community post / IG story / Twitch 😈

## 🔙 Rollback

- **Landing:** redeploy previous commit —
  `git revert <sha> && git push` (auto-deploys) or checkout the old `gh-pages`
  tree manually
- **Desktop:** GitHub Releases keep every version — point users at the prior
  release asset; Electron auto-update can be paused by yanking the `latest`
  release tag (mark as pre-release)
- **Mobile:** EAS keeps build history — `eas build` list, resubmit prior
  build; OTA: `eas update --branch production` back to a prior update ID

## 🏗️ Environments

| Environment | Landing | Desktop | Mobile |
|---|---|---|---|
| **Development** | `pnpm dev:landing` (localhost:5173) | `pnpm dev:tauri` / `dev:electron` | `pnpm dev:mobile` + Expo Go |
| **Preview** | PR builds via CI (artifact) | `tauri build --debug` / electron dir build | `eas build --profile preview` |
| **Production** | GitHub Pages | GitHub Releases (tag) | EAS production → stores |

---

Related: [BUILD.md](BUILD.md) • [CHANGELOG.md](CHANGELOG.md) • [ROADMAP.md](ROADMAP.md)
