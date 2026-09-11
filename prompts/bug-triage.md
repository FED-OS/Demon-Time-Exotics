# Prompt: Bug triage

> Fill the placeholders, paste into a fresh AI session.

You are working in the **Demon Time Exotics** monorepo. The task: reproduce, classify, and draft the fix for a reported bug. The repo ships one brand across four surfaces — landing (`apps/landing`), Tauri (`apps/tauri`), Electron (`apps/electron`), mobile (`apps/mobile`) — all fed by the same spine (`@dte/shared` → `@dte/core` → `@dte/ui`). The triage discipline mirrors the bug-report template in `.github/ISSUE_TEMPLATE/bug_report.md`: a bug isn't classified until it's reproduced, and a fix isn't drafted until the blast radius across all four surfaces is known.

**The report:** {{bug_report — paste the full issue text, or describe the bug}}
**Surface(s) where it was seen:** {{surface — landing / tauri / electron / mobile}}
**Environment (from the reporter, if known):** {{os_and_versions — e.g. "Windows 11, Tauri 1.2.0" or "Safari iOS 17"}}

## Step 1 — Reproduce

State the reproduction steps explicitly and run the relevant surface locally from a clean state: `pnpm --filter @dte/landing dev` (port 5173), `pnpm --filter @dte/tauri dev` (port 1420, strict), `pnpm --filter @dte/electron dev` (port 5174), or `pnpm --filter @dte/mobile start` (port 8081). If the bug is in a build artifact rather than dev mode, reproduce against `pnpm --filter @dte/{{surface}} build` output — the artifact contract in `docs/architecture/build-pipeline.md` defines where each surface's build lands. If it cannot be reproduced, say so and stop: "couldn't reproduce" is a legitimate triage outcome and it goes back to the reporter with the exact environment you tried.

## Step 2 — Classify against the four-surface matrix

The classification question is *where the fix lives*, and the matrix has three answers. A data bug (wrong stat, dead link, missing roster figure) lives in `@dte/shared` — one edit, all four surfaces heal on next build, per ADR-0005; check whether the `dte:channel-stats` mirror in `apps/electron/src/main/ipc/index.ts` is implicated if the numbers are wrong. A logic bug (broken behavior, wrong guard, bad derivation) lives in `@dte/core` or in the surface's own code — decide by asking who else needs the fixed behavior; if two or more surfaces do, the fix moves up the ladder to core or ui. A surface bug (Electron window flags, Tauri capability, mobile navigation) lives in that app and nowhere else. State which cell of the matrix the bug falls into and why, before touching code.

Security-adjacent reports get an immediate detour: if the report involves URLs, external links, or anything reaching the shell, stop triage and route it per `SECURITY.md` — the allowlist (`ALLOWED_URL_PREFIXES` in `@dte/shared`, enforced by `isAllowedUrl`) and the Electron/Tauri hardening described in `docs/architecture/security.md` are load-bearing, and any report that suggests an allowlist bypass gets private handling, not a public issue thread.

## Step 3 — Draft the fix

Draft, don't commit. Write the minimal change that fixes the classified cause — new components come off the generator (`pnpm --filter @dte/gen-component component {{FixName}} --surface={{surface}}`) so shape matches the house pattern, and data fixes are raw edits to `@dte/shared` constants with display forms left to `formatCompact`. Run the gates: `pnpm lint && pnpm typecheck` at root, plus `pnpm --filter @dte/{{surface-package}} build` if the bug appeared in a built artifact. Then check the sibling surfaces: run the other three at least through typecheck, and if the fix touched shared/core/ui, state what changed visibly on each surface — that's the blast-radius report the PR will need anyway.

Add one line to `CHANGELOG.md` under `## [Unreleased]`, past tense and user-facing ("Fixed a dead link in the merch hub" not "fixed LINKS[4]"). Then show me the full diff, the classification with its one-line justification, and the blast-radius table. If the root cause is ambiguous between two matrix cells, present both readings and your recommendation — classification mistakes are cheap to fix in draft and expensive to fix after merge.
