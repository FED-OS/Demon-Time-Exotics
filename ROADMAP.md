# ROADMAP — Where The Messy Show Empire Is Heading 🗺️

Living document. Priorities shift with the culture; last reviewed 2025-09-10.

## 🏁 Now (v1.0 — Shipped ✅)

- [x] Monorepo scaffolding: pnpm + Turborepo
- [x] Eye-catching landing site (GitHub Pages) — hero, content pillars, top
      videos, talent roster, platform hub, Ko-fi support
- [x] Tauri 2 desktop app shell (Rust core, tray, menus, IPC)
- [x] Electron 33 desktop app (main/preload/renderer, secure IPC, packaging)
- [x] Expo / React Native mobile app (tab navigation, ember background)
- [x] Shared packages: ui, core, shared, assets, config-*
- [x] CI/CD: build, ci, deploy-landing, release-tauri, release-electron,
      release-mobile, codeql workflows
- [x] Full documentation set (24 root docs + docs/ + wiki/ + discussion/)
- [x] Branding: social preview (1280×640), demon logo/favicon suite, hero art

## 🔜 Next (v1.1)

- [ ] **Live stream embed** — auto-detect & embed when channel is LIVE
- [ ] **YouTube API integration** — real-time sub/view counts on landing
- [ ] **Latest videos feed** — channel uploads grid, refreshed daily
- [ ] **Push notifications** (mobile) — breaking drama alerts
- [ ] **Member gating** — members-only content unlock in desktop/mobile apps
- [ ] **Search** — search across covered figures/topics on landing site
- [ ] **PWA** — offline support + add-to-homescreen for the landing site

## 🎯 Later (v1.2+)

- [ ] **Full YouTube Data API sync** — video library with per-video pages,
      comments, and stats
- [ ] **Podcast RSS feed** — audio episodes from the show
- [ ] **Twitch integration** — live status + recent VODs in all apps
- [ ] **Merch API** — pull products from shopdemontimeexotics.com
- [ ] **Community section** — moderated comments/discussions on-site
- [ ] **Multi-language** — ES translations for the landing site
- [ ] **Auto-publish pipeline** — new video → auto-update apps + sitemap

## 🌟 Dreaming Big (v2.0)

- [ ] **DTE Network** — multi-channel hub (DTE Clips, collab channels)
- [ ] **Native live chat** — synced chat across YouTube/Twitch embeds
- [ ] **Content archive** — searchable, tagged database of every breakdown
- [ ] **Creator toolkit** — the monorepo generalized as a template for other
      commentary channels (one-click brand swap)

## 🧊 Icebox (someday / maybe)

- [ ] Desktop app: native notifications on LIVE
- [ ] Mobile: on-device video downloads for members
- [ ] Watch parties / synced viewing
- [ ] Official Discord bot integration
- [ ] Annual "Messy Awards" community voting platform

## 📅 Release Cadence

| Type | Cadence |
|---|---|
| Patch fixes | as needed |
| Minor features | monthly-ish |
| Major versions | milestone-driven |

---

See [CHANGELOG.md](CHANGELOG.md) for what already shipped. Got a feature
idea? Open a [Feature Request](https://github.com/DTEMONEY448/demon-time-exotics/issues/new?template=feature_request.md) 😈
