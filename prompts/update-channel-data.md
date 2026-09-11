# Prompt: Update channel data

> Fill the placeholders, paste into a fresh AI session.

You are working in the **Demon Time Exotics** monorepo. The task: the periodic channel-data refresh. `@dte/shared` is the single source of truth (ADR-0005) — one edit, every surface updates on the next build. This prompt exists so the ritual is the same every time it runs.

**New numbers (from the channel's About page):**
- Subscribers: {{subscribers}}
- Total videos: {{videos}}
- Total views: {{total_views}}

**Any link changes:** {{links_changes — or "none"}}
**Any roster/pillar/top-video changes:** {{content_changes — or "none"}}

## The exact edit surface

Open `packages/shared/src/constants/index.ts`. That file — and only that file — owns the canonical values. Update `CHANNEL_STATS` with the three numbers (raw integers, no formatting — the display forms like `21.2K` and `3M` are computed at render time by `formatCompact`, so never hand-format). If links changed, update the relevant entries in `LINKS` (the whole verified link graph — YouTube main and backup, Instagram, Twitch, merch, membership, Ko-fi). If any new destination domain appears, it must also be added to `ALLOWED_URL_PREFIXES` in `packages/shared/src/helpers/index.ts` — an unlisted domain fails `isAllowedUrl` everywhere, by design.

Roster changes go in `ROSTER` (name, tag, icon, group — groups are boxing/viral/music/media/street). Top-video changes go in `TOP_VIDEOS` (title, views, age, category). Pillar changes go in `PILLARS`. Affiliate changes go in `AFFILIATES` (product, retailer, price, `was` for sale items, retailerUrl).

## Why this works

Every surface — landing, Tauri, Electron, mobile — imports these constants directly, and `@dte/core` derives its services over them (`statCards`, `nextMilestones`, `statsOneLiner`, and friends). There are no per-app copies to hunt down; that's the entire point of ADR-0005. The one known mirror is the `dte:channel-stats` IPC handler in `apps/electron/src/main/ipc/index.ts`, which hardcodes the three numbers — if `{{subscribers}}`, `{{videos}}` or `{{total_views}}` changed, update that mirror too (its comment points back at `@dte/shared`).

## Verification ritual

After the edits: `pnpm --filter @dte/shared typecheck` (catches shape mistakes), then `pnpm lint && pnpm typecheck` at the root (catches anything downstream), then eyeball the derived numbers — the hero counters on the landing page and the stats row everywhere should read `{{subscribers}}` in compact form at the next build. Add a line to `CHANGELOG.md` under `## [Unreleased]` — past tense, user-facing, one line (e.g. "Updated channel stats to 21.8K subs / 3.1M views").

Finally: show me the full diff of every file you touched, listing each file with a one-line why. If any value looked wrong while editing (a stat that regressed massively, a link that 404s on pattern), flag it instead of silently fixing — brand data gets the slow read.
