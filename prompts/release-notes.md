# Prompt: Release notes

> Fill the placeholders, paste into a fresh AI session.

You are working in the **Demon Time Exotics** monorepo. The task: turn the `CHANGELOG.md` `[Unreleased]` section into the user-facing release notes for the GitHub Release that ships with version `{{version}}`. The release script (`tooling/scripts/release.js`) has already run — it folded `[Unreleased]` into a dated `## [{{version}}] — {{date}}` heading, committed, and tagged. What it deliberately did *not* do is write any prose, because the script only folds and dates; it does not author history. That's this prompt's job.

**Version being released:** {{version}}
**Distributor workflows that will attach artifacts:** release-tauri.yml, release-electron.yml, release-mobile.yml, deploy-landing.yml

## What to do

Open `CHANGELOG.md` and read the `## [{{version}}]` section. Every line in it was written by contributors as their change happened, past tense, user-facing — that's the discipline documented in `docs/contributing.md`. Your job is to expand those terse lines into release notes a subscriber would actually enjoy reading, without inventing anything that isn't in the changelog. If the changelog says "Updated channel stats to 21.8K subs," the notes say that in DTE voice; they do not suddenly claim a new feature nobody added.

Group the notes by surface — the ecosystem ships as one repo but readers live on one platform at a time. Lead with whatever landed on the most surfaces (a `@dte/shared` data change touches all four), then the surface-specific work, then fixes. Keep the four-bullet artifact map at the bottom so desktop users know where their installers come from: Tauri builds land from `apps/tauri/src-tauri/target/release` via release-tauri.yml, Electron packages from `apps/electron/dist` via release-electron.yml, mobile bundles via release-mobile.yml, and the landing site deploys automatically through deploy-landing.yml.

## The voice

The channel's tagline is the north star: **No scripts. No filters. Just facts, jokes, and real talk.** Release notes for this repo sound like the channel announcing a drop, not like a corporate changelog. A headline like "🔥 v{{version}} — THE MESSY SHOW UPDATE" is on-brand; "We are pleased to announce" is not. One or two fire emoji per section header, the brand energy in the intro line, and zero fluff. If the release genuinely only contains chores and version bumps, say it straight — "a quiet one: dependency bumps and housekeeping, the empire keeps ticking" is more honest and more on-brand than manufactured hype.

## Rules that keep this trustworthy

Only changelog facts — every claim in the notes must trace to a line in `CHANGELOG.md`, and if a line is unclear, ask before embellishing. Cite the exact version and tag (`v{{version}}`) in the intro so the release page and the git tag visibly match. Do not renumber or rewrite the changelog itself — the notes are a new document; the changelog stays as the script folded it. If the `[Unreleased]` section was empty when the release was cut, the script will have warned "no [Unreleased] section — left untouched," and the honest notes are short: what shipped is the artifact refresh, and that's fine to say plainly.

## Output

Draft the release notes in Markdown, ready to paste into the GitHub Release body for tag `v{{version}}` at `https://github.com/DTEMONEY448/demon-time-exotics/releases`. Show me the draft plus a checklist mapping each notes section back to the changelog lines it came from, so I can verify nothing was invented before we publish.
