# Releasing a Version

The ceremony, from the human seat. The full pipeline detail is in [`docs/architecture/build-pipeline.md`](../docs/architecture/build-pipeline.md); this page is the runbook you follow when it's shipping day.

## Before you cut

A release needs a clean tree and a green baseline: `git status` clean, `pnpm lint && pnpm typecheck` passing at root, and a `CHANGELOG.md` whose `## [Unreleased]` section holds the lines the release will fold — written by contributors in their own PRs, past tense, user-facing. If `[Unreleased]` is empty or thin, the release is premature; go merge some PRs first. A dry run is cheap insurance: `pnpm release --dry-run` prints the entire plan — the version bump, the 13 manifests it will touch, the changelog fold, the commit and tag — and changes nothing.

## The one command

`pnpm release` — optionally `--patch` (default), `--minor`, or `--major` to pick the bump level. The script is `tooling/scripts/release.js`, and its order of operations is deliberate: verify the tree is clean, run the lint and typecheck gates, lockstep-bump all 13 package manifests across the monorepo, fold `[Unreleased]` into `## [<version>] — <today>`, commit as `chore(release): v<version>`, and tag `v<version>`. It then prints the push instructions and stops. The script never pushes by itself — releases are cut only when the tag is pushed and GitHub Actions takes over. That's not cowardice; it's the deliberate bet that a human should be the one who fires the distributors.

## What the tag push wakes up

Pushing `v<version>` triggers all four distributor workflows: **release-tauri.yml** builds the desktop bundles from `apps/tauri/src-tauri/target/release`, **release-electron.yml** packages the Electron installers from `apps/electron/dist`, **release-mobile.yml** bundles the mobile app, and **deploy-landing.yml** serves the fresh landing site to GitHub Pages. The workflows consume the artifact contract — if a build artifact moved, the release fails loudly at that step, which is exactly when you want to find out. Attach or edit the GitHub Release for the tag with notes drafted from the changelog; the `prompts/release-notes.md` template exists for exactly that fold, and the discipline it enforces is the same one the script enforces: the script only folds and dates, it does not author history — the notes' claims trace to changelog lines, never beyond them.

## After the ship

Watch the four workflows run green on the Actions tab. Once they're green, the release is live: installers attached to the GitHub Release, landing site updated on Pages. The next cycle starts immediately — new work goes under a fresh `## [Unreleased]` heading in `CHANGELOG.md`, which the script's fold leaves ready because it replaces the heading in place. If a workflow went red, the fix is a normal PR on `main` plus a new patch release when it's fixed — never a force-pushed tag; the ceremony is boring on purpose, and boring is what you want when four distributors are watching a tag.
