# Development Workflow

The daily loop, from clone to merged PR. The full contributor deep-dive is [`docs/contributing.md`](../docs/contributing.md); this page is the working version you keep open in a tab.

## Branch, change, gate, PR

Work on a branch off `main` — naming is loose but descriptive (`fix/merch-link`, `feature/roster-chips`, `docs/release-walkthrough` all fine). Make the change. Run the gates. Open the PR with the template at `.github/PULL_REQUEST_TEMPLATE.md`. That's the whole loop; the rest of this page is what "the change" and "the gates" mean precisely.

## Where each kind of change goes

Most work lands in exactly one place, and knowing which is most of the job. **Data changes** — a stat, a link, a roster figure, a video entry, an affiliate — go in `packages/shared/src/constants/index.ts` and nowhere else; every surface reads from there, and one edit heals all four on the next build (ADR-0005). The one known mirror is the `dte:channel-stats` IPC handler in `apps/electron/src/main/ipc/index.ts` — if the three channel numbers changed, update it too; its comment points back at `@dte/shared`. **Logic changes** — a derivation, a guard, a service behavior — go in `@dte/core`, or in the surface's own code if only that surface needs it; the tiebreaker is whether two or more surfaces need the fixed behavior, in which case it moves up the ladder to core or ui. **UI changes** go in `@dte/ui` when two or more surfaces render them, or in the surface's own components otherwise. **Security changes** — anything touching `ALLOWED_URL_PREFIXES`, the Tauri capabilities file, the Electron hardening flags, or either CSP — get a slow human read in review, no exceptions, per [`docs/architecture/security.md`](../docs/architecture/security.md).

## The gates

Every PR passes `pnpm lint && pnpm typecheck` at root — Turbo fans both out across every workspace, and CI runs the same thing so a red gate locally is a red gate on GitHub. If your change touches a build output, `pnpm --filter @dte/<workspace> build` proves the artifact contract still holds — `apps/landing/dist/index.html`, `apps/tauri/src-tauri/target/release`, `apps/electron/dist/main/index.js`, and `apps/mobile/dist/index.html` are the four artifacts the release workflows consume. New components should come off the generator (`pnpm --filter @dte/gen-component component <Name> --surface=<surface>`) so their shape matches the house pattern before a human ever looks at the diff.

## The changelog discipline

Every PR adds its own line to `CHANGELOG.md` under `## [Unreleased]` — past tense, user-facing, one line ("Fixed a dead link in the merch hub," not "fixed LINKS[4]"). This is the discipline that makes releases painless: when `pnpm release` runs, it only has to fold and date what's already written; it doesn't author history. If your change isn't worth a changelog line, it probably wasn't worth a PR — and if it was worth a PR, write the line in the same PR.

## Review expectations

Machine checks clear the path; humans read the judgment calls. Expect fast approval on generator-shaped components and routine data edits, and expect a slow read on `@dte/shared` changes, token files, and anything in the security surface. Visual changes update their screenshots in `docs/screenshots/` in the same PR — the required set is landing-home-wide, tauri-home, electron-home, mobile-home, per the naming rules in `docs/screenshots/README.md`.

When the PR merges, [Releasing a Version](Releasing-a-Version.md) is what happens next if it's time to ship — and most of the time it isn't; the empire ships on deliberate tags, not every push.
