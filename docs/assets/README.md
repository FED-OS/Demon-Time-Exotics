# docs/assets — design asset staging area

This folder is the workshop, not the warehouse. It holds brand work **before** it graduates into `packages/assets/` — the package that surfaces actually reference. Anything an app, a workflow or a manifest points at lives in `@dte/assets`; everything else — explorations, variants, drafts, source files — lives here.

The relationship is one-directional on purpose: `packages/assets/manifest.json` is the index of everything *shipped*, and its paths are what the favicon references, the social preview embed, the Tauri/Electron icon builds and the Pages metadata consume. Files here have no consumers, which is exactly why they can be messy: nobody breaks when a draft changes.

## What belongs here

Logo variants and explorations — alternative lockups, the flame/ember motif studies, monochrome and inverted versions, the stacked vs. horizontal arrangements. Banner explorations — the 1280×640 social preview candidates, YouTube banner drafts, and the hero background candidates before one wins the job. Palette and type studies — swatch sheets, contrast checks against the ink/paper scale, the Bebas Neue + Inter pairing experiments. Mockups — comped screenshots of a surface wearing a candidate asset, so the graduation decision can be made against the real UI rather than in isolation.

## The graduation process

An asset moves from here to `packages/assets/` in four steps, and the steps are the whole point — graduation is a deliberate act, not a `cp`.

**1. Propose in a PR.** The asset lands here in a PR titled like `assets: propose hero-bg v3`, with the file plus a short note on what it replaces or why it's new. Reviewers compare it against the incumbent in the real UI (the mockup requirement above).

**2. Copy into the package.** On approval, the file moves into the right `packages/assets/` subfolder — `branding/`, `icons/`, `images/` or `fonts/` — at the exact size and format the manifest expects. `icons/` entries have fixed dimensions (`logo-16.png` is 16×16, `favicon.ico` the multi-resolution ICO, `icon.png` the 1024×1024 source both desktop apps scale from); `images/` entries have fixed roles (`social-preview.png` is 1280×640, `hero-bg.png` the hero background); `branding/` carries the logo and social banner. Wrong-sized files are rejected at review, because downstream consumers measure.

**3. Update the manifest.** Every graduated asset gets an entry in `packages/assets/manifest.json`. If it *replaces* an existing entry, the path stays the same and only the file bytes change — consumers like the favicon link and the GitHub social embed keep working untouched. New roles get new manifest keys. The manifest is the contract; an unmanifested file in the package is a bug.

**4. Verify the surfaces.** The PR that graduates an asset shows the surfaces wearing it: the landing favicon tab, the desktop About or title bar, the social preview card (paste the Pages URL into a card validator). A graduation PR without screenshots gets the same "where's your line?" treatment as a feature without a changelog line.

## Naming and format conventions

Files here don't need to be final, but they should already be named for their destination — `logo-stacked-v2.png` tells a reviewer what it is; `final_final.png` does not. PNG for anything with transparency, JPG only for opaque photographic backgrounds, SVG for the vector-source studies that later rasterize into the fixed-size icon set. Sizes are checked at graduation, not here, but a draft within 10% of the target dimensions saves everyone a resize round-trip.

The full list of destination roles and their exact dimensions is in `packages/assets/manifest.json` and the README inside that package — those two files are authoritative for what "graduated" means. This folder's README is authoritative only for the process of getting there.
