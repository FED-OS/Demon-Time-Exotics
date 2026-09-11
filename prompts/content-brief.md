# Prompt: Content brief

> Fill the placeholders, paste into a fresh AI session.

You are working in the **Demon Time Exotics** monorepo. The task: turn a covered figure or video from the channel into a landing-page entry — a roster chip, a top-content item, or a pillar refinement — written in the channel's voice. The landing page (`apps/landing`) renders straight from `@dte/shared` constants: `ROSTER` (the figures), `TOP_VIDEOS` (the performers), `PILLARS` (the coverage areas). This prompt is how raw channel material becomes one of those entries without losing the tone that made the channel what it is.

**The source material:** {{figure_or_video — the person or video to feature}}
**What happened / why it matters:** {{the_brief — the facts, in plain language}}
**Target entry:** {{target — roster figure / top video / pillar tweak}}
**Supporting numbers (views, age, category) if a video:** {{numbers — or "n/a"}}

## The voice

The tagline is law: **No scripts. No filters. Just facts, jokes, and real talk.** Study the existing entries to hear it before writing. `ROSTER` tags are two-to-four words with zero hedging — "Champion boxer," "Viral star," "Manager / media figure" — not "controversial figure who is sometimes described as." `TOP_VIDEOS` titles are the hook itself, capital letters used like seasoning ("Deen Chased Out Of Bowling Alley!??"), categories name the matchup ("AB × Deen"). The voice is confident, funny, and factual at once — it never punches down at the audience, and it never softens a story into press-release mush. If the brief's facts are thin, the entry says less rather than guessing more: a wrong claim about a real person is a brand failure, not a typo.

## The edit

Write the entry against the exact data shape. A roster figure is `{ name, tag, icon, group }` — group is one of boxing/viral/music/media/street, and the icon is a single emoji that reads at chip size. A top video is `{ title, views, age, category }` — `views` is a compact string exactly as YouTube displays it ("217K"), `age` is YouTube's relative label ("13 days"), and the title keeps the actual video title rather than inventing a cleaner one; if the real title is weak, that's a note back to the channel, not an edit we make silently. A pillar tweak is `{ title, icon, description }` where the description is one sentence, present tense, no hedging verbs. Every entry lands in `packages/shared/src/constants/index.ts` and nowhere else — the surfaces all read from there.

If the entry introduces a new destination domain (a clip link, a storefront), the domain must be added to `ALLOWED_URL_PREFIXES` in `@dte/shared` helpers or every surface will refuse to open it — `isAllowedUrl` fails closed. If it doesn't, skip the allowlist entirely.

## Verification

Run `pnpm --filter @dte/shared typecheck`, then `pnpm lint && pnpm typecheck` at root, then read the entry back in place on the landing dev server (`pnpm --filter @dte/landing dev`, port 5173) — the roster chips and top-content list are rendered by `@dte/ui` components (`rosterChips`, `topContentList`), so the entry must look right in the actual chip and row shapes, not just read right in the constants file. Add one line to `CHANGELOG.md` under `## [Unreleased]`, past tense ("Added Blueface's latest breakdown to the top-content shelf").

Then show me the entry as written, a before/after of the constants file section, and one alternative version of the tag or title so I can pick the sharper cut. Two options beat one when the whole job is voice.
