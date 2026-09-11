# Build & Release Pipeline

This page walks the full path a change travels: local checks → CI gates → artifact builds → tag-triggered releases → landing deployment. The pipeline is GitHub Actions all the way, seven workflow files under `.github/workflows/`, orchestrated locally by `tooling/scripts/`.

For the repo shape see `overview.md`; for how the tasks are defined per-package see `monorepo.md`. The trust boundary that the pipeline enforces (URL allowlist, token scopes) is covered in `security.md`.

## The local loop

Everything starts at the root scripts. `pnpm dev` boots all four surfaces in parallel via `tooling/scripts/dev-all.js` — the script tags each process's output with its surface name, prints the URL table (landing at `http://localhost:5173/demon-time-exotics/`, Tauri at `1420`, Electron at `5174`, Metro at `8081`) and fans Ctrl-C out to the whole process group. `pnpm build` runs `tooling/scripts/build-all.js`, which builds every surface in sequence, verifies each surface's expected artifacts exist on disk, and prints the outcome table — `✅` green, `❌` red with the failed step, `⏭` for surfaces skipped with `--skip-native` on machines without Rust or Xcode/Android toolchains. `pnpm test` fans out to every package with a test script via Turbo, `pnpm lint` and `pnpm typecheck` do the same for their gates, and `pnpm clean` runs `turbo run clean` then scrubs the workspace of build residue via `tooling/scripts/clean.js`.

The `build-all.js` artifact contract is the interesting part: it checks concrete paths per surface — `apps/landing/dist/index.html`, `apps/tauri/src-tauri/target/release`, `apps/electron/dist/main/index.js`, `apps/mobile/dist/index.html` — and reports each surface's `BuildOutcome` (`{ app, ok, durationMs, artifacts }`, the type shipped from `@dte/shared`). A green `pnpm build` locally means the exact files CI expects to exist actually exist, so "works on my machine" and "works in Actions" converge on the same definition of done.

## The seven workflows

**`ci.yml` — CI — Lint / Typecheck / Test** runs on every push and pull request. It installs pnpm, restores the workspace via the store cache, and runs the `lint`, `typecheck` and `test` Turbo tasks across the repo. This is the quality gate; a red CI blocks the merge, full stop.

**`build.yml` — Build All Platforms** runs on push to the default branch (and manually). It is the artifact proof: it builds all four surfaces in a matrix that includes the native toolchains, producing the same `BuildOutcome` reporting the local `build-all.js` prints. If a surface's artifact is missing, the workflow fails loudly. It is the "it actually builds" gate that sits above lint/typecheck — CI proves correctness, build proves existence.

**`codeql.yml` — CodeQL Security Scan** runs on push and weekly on schedule. It analyzes the JavaScript/TypeScript and Rust sources for known vulnerability classes. It pairs with `ci.yml`: CI catches the mistakes CodeQL can't see, CodeQL catches the patterns CI doesn't look for.

**`deploy-landing.yml` — Deploy Landing → GitHub Pages** deploys the landing site to GitHub Pages. It builds `@dte/landing` with the correct Vite base path (`/demon-time-exotics/`), uploads the `dist/` tree, and deploys it to Pages on the default branch. The Pages URL is the public face of the project; this workflow is what keeps it in lockstep with the repo.

**`release-tauri.yml` — Release Tauri Desktop App** builds the Tauri bundle (`.dmg` / `.msi` / `.AppImage` per the `tauri.conf.json` targets) and attaches the artifacts to a GitHub Release. It runs on the `v*` tag push that `release.js` creates — the release ceremony below is what triggers it.

**`release-electron.yml` — Release Electron Desktop App** builds the Electron bundle through `electron-builder` (the `win`/`mac`/`linux` targets in `apps/electron/electron-builder.yml`) and attaches the artifacts to the same GitHub Release.

**`release-mobile.yml` — Release Mobile App (EAS)** submits the Expo app to EAS Build with the production profile from `apps/mobile/eas.json`, producing the iOS/Android binaries. EAS does the heavy lifting; the workflow is the trigger and the gate.

The division of labor: `ci.yml` is the always-on quality gate, `build.yml` is the artifact proof, `codeql.yml` is the safety net, `deploy-landing.yml` is the standing deployment, and the three release workflows are the tag-triggered distributors.

## The release ceremony

Releases are cut by one command: `pnpm release` (alias `node tooling/scripts/release.js`). The ceremony is deliberately strict, because the repo ships artifacts to four destinations and a sloppy release is a broken download for someone.

The script first refuses to run on a dirty tree — `git status --porcelain` must be clean, because the lockstep version bump is about to touch thirteen manifests and we can't mix that with in-flight edits. It then runs the `lint` and `typecheck` gates locally — the same ones CI enforces — so you can't cut a release that CI would have rejected. With the tree clean and the gates green, it computes the next version (default `--patch`, or `--minor` / `--major`) and writes it into every one of the thirteen manifests: the root `package.json`, the four apps, `@dte/shared`, `@dte/core`, `@dte/ui`, `@dte/assets`, and the four `@dte/config-*` presets. It folds the `CHANGELOG.md` `[Unreleased]` section into a dated `## [x.y.z] — date` heading, commits with `chore(release): v{next}`, and tags `v{next}`. Then it prints the hand-off: push the tag, and the tag push triggers `release-tauri.yml`, `release-electron.yml`, `release-mobile.yml` and `deploy-landing.yml` in sequence — the four distributor workflows fire off that single tag.

`--dry-run` runs the whole ceremony with the writes suppressed: it shows the next version, the manifest list it would bump, and the changelog heading it would fold, without committing anything. Use it to rehearse a release before cutting it.

The ordering is the point: **clean tree → gates → bump → changelog → commit → tag → push → distributors**. Each step is cheap to verify and expensive to skip, and the script makes skipping impossible.

## Why this shape

The pipeline encodes three deliberate bets. First, that the artifact contract (concrete expected paths per surface) beats "the build script exited 0" as a definition of success — the `build-all.js` and `build.yml` pair both report against `BuildOutcome` from `@dte/shared` so local and CI agree on what "built" means. Second, that the release ceremony should be one command with hard preconditions, not a wiki page of manual steps — thirteen manifests and a changelog fold are exactly the kind of chore humans get wrong and scripts get right. Third, that distributors should be tag-triggered rather than always-on — building installers on every push burns CI minutes for nothing; the tag is the deliberate "this is a release" signal.
