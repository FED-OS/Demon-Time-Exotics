# Demon Time Exotics — Project Tracker 💪🏾😈🔥

> THE MESSY SHOW. No scripts. No filters. Just facts, jokes, and real talk.
> This is the living task tracker for the monorepo. Move items between
> **Backlog → Doing → Shipped** as work progresses. Check the boxes. Keep it messy — but organized.

## Status

- [x] Monorepo scaffolded — pnpm + Turborepo, 4 apps, 8 packages, full tooling
- [x] Landing site (GitHub Pages) — eye-catching dark theme, self-contained preview shipped
- [x] Tauri desktop app — vanilla TS frontend, Rust core, capabilities-gated
- [x] Electron desktop app — main/preload/renderer split, IPC allowlist guard
- [x] Expo mobile app — file-based routing, 5 tabs, EAS build profiles
- [x] @dte packages — shared (data), core (domain), ui (DOM kit), config presets, assets
- [x] Brand assets — official logo, icon ladder, multi-res favicon, 1280×640 social preview
- [x] Docs, wiki, prompts, discussion seeds, community health files, 7 CI workflows
- [x] Community sustainability — Ko-fi button, FUNDING.yml, SUPPORT.md, PRICING.md
- [x] Project tracker (this file) — converted from build plan to living tracker

## Shipped (v1.0.0)

- [x] Initialize the pnpm workspace and Turborepo pipeline
- [x] Ship the landing page to GitHub Pages
- [x] First Tauri + Electron desktop builds
- [x] First EAS preview build for mobile
- [x] Release scripts, generators, clean scripts (tooling/scripts)
- [x] Architecture decision records (ADR.md + docs/architecture/decisions.md)
- [x] Official brand logo swap across all apps and packages
- [x] Filename cleanup — junk/redundant root files removed, ALL-CAPS convention normalized (USAGE.md, TODO.md), 13 stale doc references fixed, link checker passing 165/165

## Backlog (next up)

- [ ] Replace the Ko-fi `YOUR_USERNAME` placeholder with the live Ko-fi page
- [ ] Create the real GitHub repo and push this monorepo (owner: dtemoney448)
- [ ] Enable GitHub Pages and verify the live URL
- [ ] Enable Discussions and seed the five categories (see discussion/README.md)
- [ ] Import the GitHub wiki from wiki/ pages (9 pages, includes _Sidebar & _Footer)
- [ ] Upload social-image.png as the repo social preview (Settings → General)
- [ ] Set the channel icons: favicon.ico in Settings → Favicon (org-level) or use landing/public
- [ ] Wire the @dte/core api client to the real YouTube channel data
- [ ] Live subscriber/view counts (scheduled refresh via api/stores)
- [ ] Deep-link routing for the mobile app (scheme: demontimeexotics)
- [ ] Play-episode surfaces for the desktop apps (watch hub → embed player)
- [ ] KOtif — notifications stack for new drops (alerts tab)
- [ ] Merch showcase section (shopdemontimeexotics.com storefront)
- [ ] Affiliate grid from the channel's REI/Sweetwater/Best Buy deals
- [ ] i18n pass (es-MX first) for the mobile + landing apps
- [ ] Open-source program applications (see COMMUNITY.md checklist)

## Doing (right now)

Nothing in flight. Grab a Backlog item and move it here when you start.

## Icebox (someday / maybe)

- [ ] Live co-viewing sync (Twitch integration)
- [ ] Community poll widget wired to YouTube polls
- [ ] Shorts-first mobile feed with swipe gestures
- [ ] Native audio podcast player (background play)
- [ ] Annual "Messy Awards" live event pages

---

**Legend:** Backlog = ready to pick up · Doing = in flight · Shipped = done and verified · Icebox = parked ideas
**Conventions:** Work in small PRs. One checkbox = one PR when possible. Update this file in the same commit as your change.
