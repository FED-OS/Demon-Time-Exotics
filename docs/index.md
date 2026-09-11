# Documentation Index

This is the hub for everything under `docs/`. The root `README.md` is the front door to the repo — it answers "what is this and why should I care" in ninety seconds. This page is the second click: it maps every document in the folder so you never have to `grep` for the right file.

If you're new to the project, read in this order: the root `README.md`, then `architecture/overview.md`, then whichever surface you're touching. If you're already oriented and just need a fact, the table below is the map.

## The architecture set

The seven files in `architecture/` are one connected guide, written to be read in any order and cross-referenced heavily:

**`architecture/overview.md`** — the shape of the whole system: the four app surfaces, the four shared packages, the tooling scripts, and how they connect. Start here.

**`architecture/monorepo.md`** — the workspace mechanics: how pnpm globs declare the graph, the downward-only dependency rule, the Turbo task pipeline, and how to add a new package or surface.

**`architecture/apps.md`** — each surface's internals: the framework-free landing page, the Tauri desktop app, the Electron desktop app, and the Expo mobile app — file by file where it matters.

**`architecture/packages.md`** — the shared-package API tour: what `@dte/shared`, `@dte/core`, `@dte/ui`, `@dte/assets` and the `@dte/config-*` presets each export and when to reach for which.

**`architecture/build-pipeline.md`** — the full CI/CD walk-through: the local loop, the seven GitHub Actions workflows, and the one-command release ceremony.

**`architecture/security.md`** — the trust model: the URL allowlist, the Electron process hardening, the Tauri capability scoping, and the CSPs — plus what the model deliberately does not cover.

**`architecture/decisions.md`** — the eight architecture decision records in condensed form: why pnpm + Turborepo, why both Tauri *and* Electron, why the landing page is framework-free, and the rest of the load-bearing calls.

## The root-level guides

The repo root carries the standard project records — `README.md` (front door), `CONTRIBUTING.md` (the ninety-second contribution flow), `SECURITY.md` (vulnerability reporting), `CODE_OF_CONDUCT.md`, `CHANGELOG.md` (release history), `ROADMAP.md` (where this is going), `FAQ.md` (common questions), `SUPPORT.md` (where to get help), `INSTALL.md` and `BUILD.md` (setup and build), `DEPLOYMENT.md` (shipping to the four destinations), `GOVERNANCE.md` and `MAINTAINERS.md` (who decides), `ADR.md` (the pointer into the decision records), `AGENTS.md` and `CLAUDE.md` (AI-assistant ground rules), `SUMMARY.md`, `NOTICE.md`, `COPYING.md`, `AUTHORS.md`, and `CITATIONS.md` (attribution and license records), plus the issue templates and `PRICING.md` (sponsorship tiers). The root `USAGE.md` and `TODO.md` cover everyday commands and the live backlog.

## This folder

**`contributing.md`** — the deep-dive companion to the root `CONTRIBUTING.md`: the full development environment walkthrough, the task pipeline, the release flow from a contributor's seat, and the review bar a PR must clear.

**`assets/`** — the design-asset staging area: source files for the brand work (logo variants, banner explorations, palette swatches) before they graduate into `packages/assets/`. The README inside explains the graduation process.

**`screenshots/`** — the visual record of every surface, kept current by CI conventions: landing, desktop, mobile. The README inside lists the required shots and how to take them.
