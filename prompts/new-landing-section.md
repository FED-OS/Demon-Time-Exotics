# Prompt: New landing section

> Fill the placeholders, paste into a fresh AI session.

You are working in the **Demon Time Exotics** monorepo — a pnpm + Turborepo workspace whose landing site (`apps/landing`) is deliberately framework-free vanilla TypeScript (ADR-0007). The task: build a new section for the landing page.

**Section name:** {{section_name}}
**What it must contain:** {{content_description — e.g. "a ticker of breaking-drama moments", "a timeline of the channel's biggest videos", "a testimonial wall of community comments"}}
**Where it sits on the page:** {{position — e.g. "between the stats row and the content pillars"}}

## Context you need

The single source of truth for channel facts is `@dte/shared` (`packages/shared/src/constants/index.ts`): `CHANNEL`, `CHANNEL_STATS` (subscribers 21200, videos 406, totalViews 3025509), `LINKS`, `PLATFORMS`, `TOP_VIDEOS`, `ROSTER`, `PILLARS`, `AFFILIATES`. Import what you need — never hardcode a fact that exists there, and never invent facts that don't.

The brand tokens live in the CSS custom properties of `apps/landing/src/styles/styles.css` — `--fire #ff5e1a`, `--inferno #ff2e00`, `--purple #8b2fd6`, `--gold #f5a623`, `--ember #ffb98a`, the ink/paper scale, and the Bebas Neue (display) + Inter (body) font stack. Reuse tokens; do not add new hex values.

Every outbound link must pass `isAllowedUrl` from `@dte/shared` before it is handed to the browser. The allowlist is `ALLOWED_URL_PREFIXES` — if the section needs a domain not on it, stop and tell me instead of working around the guard.

## What to produce

Write the section as a DOM-factory component in `apps/landing/src/components/sections/` following the existing files there: an exported function that returns a configured `HTMLElement`, a `data-component` attribute in kebab-case, content pulled from `@dte/shared` imports, styles added to `styles.css` (new rules only — no token edits), and the barrel in `components/sections/index.ts` updated. The component generator can scaffold the shape if you prefer to start generated: `pnpm --filter @dte/gen-component component {{SectionName}} --surface=landing`.

Then wire it into the page at the position I specified, verify with `pnpm --filter @dte/landing typecheck` and `pnpm --filter @dte/landing lint`, and give me the exact diff so I can review before anything lands.

## Constraints

Respect `prefers-reduced-motion` for any animation (there's a `prefersReducedMotion()` helper in `@dte/shared`). The site must stay responsive from 320px to ultrawide. No new dependencies — if the section seems to need one, describe the tradeoff instead of adding it. And the section must degrade gracefully if `@dte/shared` data is empty — an empty roster shouldn't render a broken grid.
