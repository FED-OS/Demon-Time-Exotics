# Changelog

All notable changes to the **Demon Time Exotics** monorepo are documented in
this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned

- Live stream embed section on landing site
- Member-only content gating in Tauri/Electron apps
- Push notifications for breaking drama in mobile app
- Dark/light theme toggle across all apps
- Comment section integration (YouTube API)

## [1.0.0] — 2025-09-10

### 🎉 Initial Release — THE MESSY SHOW EMPIRE 💪🏾😈🔥

One repo. Every platform. The full Demon Time Exotics digital ecosystem.

### Added

**🌐 Landing Site (`apps/landing`)**
- Eye-catching GitHub Pages site with fire/ember theme
- Hero section with brand tagline and social proof stats
- Top content showcase (top 5 performing videos)
- Content pillars section (6 core coverage areas)
- Talent roster grid (12 key figures covered)
- All-platform link hub (YouTube, Instagram, Twitch, merch, membership)
- Ko-fi support button
- Ember particle animation, neon glow effects, responsive design
- Favicon and social preview (1280×640) branding

**🖥️ Tauri Desktop App (`apps/tauri`)**
- Tauri 2 application shell with DTE branding
- Rust core with system tray, native menus, deep links
- IPC commands for external URL opening
- Least-privilege capability configuration
- Vite frontend scaffold with shared UI hooks

**🖥️ Electron Desktop App (`apps/electron`)**
- Electron 33 main/preload/renderer process architecture
- Context-isolated, secure IPC bridge
- Window state persistence, native menus, external link handling
- electron-builder packaging (NSIS, DMG, AppImage, Snap, MSI)

**📱 Mobile App (`apps/mobile`)**
- Expo SDK 51 / React Native app
- Expo Router tab navigation (Home, Videos, Live, Shop, More)
- Reanimated 3 ember particle background
- Platform links and membership CTA screens

**🧩 Shared Packages (`packages/*`)**
- `@dte/ui` — reusable UI components and primitives
- `@dte/core` — business logic: links, stats, feeds, types, stores
- `@dte/shared` — constants, helpers, types
- `@dte/assets` — brand logos, icons, fonts, imagery
- `@dte/config-*` — shared ESLint, TypeScript, Tailwind, Vite configs

**⚙️ Tooling (`tooling/`)**
- `build-all`, `clean`, `dev-all`, `release` orchestration scripts
- Component and app generators

**🔧 CI/CD (`.github/workflows/`)**
- `build.yml` — all-platform build matrix
- `ci.yml` — lint, typecheck, test pipeline
- `deploy-landing.yml` — GitHub Pages deployment
- `release-tauri.yml` — cross-platform Tauri bundling
- `release-electron.yml` — Electron packaging & artifacts
- `release-mobile.yml` — EAS Android/iOS builds
- `codeql.yml` — security scanning

**📚 Documentation (root `.md` files)**
- 24 root-level docs: README, CONTRIBUTING, SECURITY, CHANGELOG, FAQ, SUPPORT,
  INSTALL, BUILD, DEPLOYMENT, ROADMAP, ADR, AUTHORS, MAINTAINERS, GOVERNANCE,
  PRICING, COPYING, CITATIONS, NOTICE, SUMMARY, USAGE, CODE_OF_CONDUCT,
  CLAUDE.md, AGENTS.md, TODO (issue & PR templates live in `.github/`)
- `docs/` hub, `wiki/` content source, `discussion/` templates, `prompts/` templates

**🎨 Branding**
- Social preview image (1280×640) for GitHub repository
- Demon logo / favicon (16–512px + .ico multi-res)
- Hero background art (South Central LA night skyline)
- Fire-orange/inferno-red/purple-neon brand palette tokens

[Unreleased]: https://github.com/DTEMONEY448/demon-time-exotics/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/DTEMONEY448/demon-time-exotics/releases/tag/v1.0.0
