# Prompt: New component

> Fill the placeholders, paste into a fresh AI session.

You are working in the **Demon Time Exotics** monorepo. The task: create a new reusable component.

**Component name:** {{Name — PascalCase, e.g. "FireBadge"}}
**Surface:** {{surface — landing | tauri | electron | mobile | ui}}
**What it renders/does:** {{description — e.g. "a pill-shaped tag with the flame glyph and a count", "a horizontal scroll list of affiliate gear cards"}}

## The supported path first

This repo ships a component generator that stamps the canonical shapes: `pnpm --filter @dte/gen-component component {{Name}} --surface={{surface}}`. Run it first (add `--dry-run` to preview), then edit the generated scaffold instead of hand-writing the file — the scaffold already satisfies the lint and typecheck rules, has the right barrel export, and lands in the right directory per surface.

**Directory map the generator uses:** landing → `apps/landing/src/components/sections/`, tauri → `apps/tauri/src/components/`, electron → `apps/electron/src/renderer/components/`, mobile → `apps/mobile/src/components/`, ui → `packages/ui/src/components/`.

## Shape by surface kind

Web surfaces (landing, tauri, electron) and `ui` follow the framework-free DOM-factory pattern (ADR-0007): export a function that returns an `HTMLElement` built with `document.createElement`, styles applied via the style object or the shared stylesheet, a `data-component` attribute in kebab-case, and data from `@dte/shared` imports only — never hardcoded channel facts. If the surface is `ui`, also import primitives from `../primitives/index.js` (`button`, `badge`, `card`, `statBlock`) and compose rather than rebuild.

Mobile follows React Native: a `Text`/`View` composition with a `StyleSheet` at the bottom of the file, data from `@dte/shared`, and no web APIs (no `document`, no `window`).

## After generating

Prove it works: `pnpm --filter @dte/{{surface-package}} typecheck && pnpm --filter @dte/{{surface-package}} lint`. If the component has rendering logic worth locking, add a small test next to it following the existing test patterns in that surface. Then show me the diff. Do not commit anything — I review first.

## Rules that always apply

Two or more surfaces needing the same component is the signal it belongs in `packages/ui` (or `@dte/shared` for pure data helpers) — if you notice the component duplicates something that exists elsewhere, stop and tell me. No new dependencies without asking. Every external link passes `isAllowedUrl` first. And mobile components never import from web surfaces, and vice versa.
