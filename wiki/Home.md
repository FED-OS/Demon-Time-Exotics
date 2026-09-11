# Demon Time Exotics Wiki

Welcome to the wiki for the **Demon Time Exotics** monorepo — one repo, every platform: the landing site, the Tauri desktop app, the Electron desktop app, and the Expo mobile app, all fed by a single `@dte/shared` data spine. This wiki is the friendly map. The deep documentation lives in [`docs/`](../docs/index.md) — when a wiki page and a doc disagree, the doc wins and the wiki gets fixed in the same PR.

## Start here

If you just cloned the repo, read [Getting Started](Getting-Started.md) — it takes you from zero to a running dev environment in three commands. If you're here to contribute, [Development Workflow](Development-Workflow.md) covers the daily loop: branch, change, gate, PR. If you're cutting a release, [Releasing a Version](Releasing-a-Version.md) walks the ceremony from the human seat.

## The pages

**[Getting Started](Getting-Started.md)** — clone, `corepack enable`, one `pnpm install`, first dev run on all four surfaces. What Node and pnpm versions the repo expects and where the ports land.

**[Development Workflow](Development-Workflow.md)** — the branch-and-PR loop, the lint/typecheck gates, where each kind of change goes, and the changelog discipline that makes releases painless.

**[App Architecture](App-Architecture.md)** — the `@dte/shared → @dte/core → @dte/ui` ladder and how the four surfaces consume it, at wiki altitude. The full detail is in [`docs/architecture/`](../docs/architecture/overview.md) and the ADRs in [`docs/architecture/decisions.md`](../docs/architecture/decisions.md).

**[Releasing a Version](Releasing-a-Version.md)** — the tag-triggered release ceremony: what `pnpm release` does, what it deliberately does *not* do, and what happens when the tag push wakes the four distributor workflows.

**[Deploying the Landing Site](Deploying-the-Landing-Site.md)** — how GitHub Pages serves the landing site, what the `deploy-landing.yml` workflow does, and the custom-domain notes.

**[Troubleshooting](Troubleshooting.md)** — the usual suspects: port collisions, wrong pnpm version, stale Turbo cache, and the platform quirks for Tauri and Electron dev.

## The one thing to remember

Every stat, link, roster figure, and video entry on every surface comes from one place: `packages/shared/src/constants/index.ts`. If the number is wrong on the site, it's wrong *there* — or in the one known mirror, the `dte:channel-stats` IPC handler in `apps/electron/src/main/ipc/index.ts`. That single-source rule (ADR-0005) is the whole architecture in one sentence, and most of this wiki is just its consequences.

**No scripts. No filters. Just facts, jokes, and real talk.** 💪🏿😈🔥
