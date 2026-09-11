# prompts/ — AI prompt templates

Reusable, copy-paste prompts for AI assistants (Claude, GPT, Copilot Chat, agentic tools) working on this repository. Each prompt is self-contained: paste it into a fresh session, fill the `{{placeholders}}`, and go.

The ground rules every AI assistant should follow when touching this repo live in the root `AGENTS.md` and `CLAUDE.md` — these prompts assume those rules and go straight to the task. Design goal: a prompt written today still works in six months because it points at the stable seams (the `@dte/shared` constants, the generators, the artifact contract) rather than at volatile file internals.

## The templates

**[new-landing-section.md](new-landing-section.md)** — scaffold a new section for the landing page: hero copy, stats wiring, and the component shape that satisfies the lint/typecheck gates.

**[new-component.md](new-component.md)** — generate a framework-free web component (any surface) or a React Native component (mobile), matching what `tooling/generators/component` stamps out.

**[update-channel-data.md](update-channel-data.md)** — the monthly ritual: refresh the subscriber/video/view counts and any platform links in `@dte/shared`, propagating through every surface.

**[release-notes.md](release-notes.md)** — fold the `CHANGELOG.md` `[Unreleased]` section into user-facing release notes for a GitHub Release.

**[bug-triage.md](bug-triage.md)** — reproduce, classify, and draft the fix for a reported bug against the four-surface matrix.

**[content-brief.md](content-brief.md)** — turn a covered figure or video from the study data into a landing-page roster/top-content entry with the right tone.

## How to use these

Paste the whole file contents as the opening message of a fresh AI session — the templates include the context an assistant needs (which package owns what, which commands to run) so you don't have to re-explain the repo. Replace `{{double-brace}}` placeholders before sending. The prompts deliberately reference commands you can verify (`pnpm lint`, `pnpm typecheck`, the generator invocations) rather than asking the model to trust its memory of this repo.

When a prompt produces a good result, tighten it and commit the improvement — these files are meant to evolve with the repo, and a prompt that goes stale is a bug in the prompt.
