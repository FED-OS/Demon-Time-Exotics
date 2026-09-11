# docs/screenshots — the visual record

Every surface of the DTE ecosystem gets its picture taken here. Screenshots serve three jobs: the README and docs stay honest (a reader sees the real UI, not a description of it), pull requests that touch anything visual prove their claim with pixels, and regressions get spotted early because the record exists to compare against.

The naming convention is the contract that makes all three work, so it's enforced: files are `<surface>-<view>-<state>.png`, all lowercase, hyphen-separated. `<surface>` is one of `landing`, `tauri`, `electron`, or `mobile`. `<view>` is the part of the app (`home`, `hub`, `roster`, `pillars`, `top-videos`, `support`, `about`, `settings`). `<state>` is optional but encouraged — `-light`, `-dark`, `-empty`, `-reduced-motion`, `-wide` (≥1440px), `-narrow` (≤420px) — because the interesting bugs live at the extremes.

## The required set

Four shots are mandatory and kept current with the UI, one per surface plus the one that proves the brand system travels:

**`landing-home-wide.png`** — the landing page at ≥1440px, scrolled to the top: full hero with the channel title, the ember gradient, the stats row (`21.2K` / `406` / `3M` in compact form), and the top of the hub grid. This is the front-of-house shot; it appears in the root README.

**`tauri-home.png`** — the Tauri desktop window at its default 1100×720: the title bar reading **DEMON TIME EXOTICS — THE MESSY SHOW**, the same shared sections rendered through the Tauri webview, the platform hub with its opener-driven links.

**`electron-home.png`** — the Electron desktop window: the same sections again through the Electron renderer, showing the `window.dte` bridge powering the stats row and the guarded open-external links.

**`mobile-home.png`** — the mobile app on a phone viewport (390×844 or the current iPhone baseline): the tab bar, the compact stats, the pillar grid stacked vertically.

Beyond the mandatory four, shots are added when they earn their keep: `landing-hub-narrow.png` proves the responsive collapse, `landing-home-reduced-motion.png` proves the flicker-in respects `prefers-reduced-motion`, `electron-about.png` and `tauri-about.png` record the About views, `mobile-top-videos.png` records the deepest scroll view. A PR that touches a surface's visual output should carry the affected shot, updated — the reviewer compares pixels, not prose.

## How to take them

Desktop windows (Tauri, Electron): build or run the app, size the window to default, use the OS screenshot against a neutral background — not a screen recording frame, not a resized capture. Mobile: the Expo dev client or a simulator, phone-sized viewport, status bar visible. Landing: a browser at the exact viewport widths (1440 and 420 for the wide/narrow pair), devtools closed, extensions hidden, fonts fully loaded before the shot — a half-loaded webfont screenshot is a stale screenshot the moment it's taken.

Landing shots are taken against the real built site, not the dev server, when they're destined for the README: `pnpm build` then serve `apps/landing/dist/` — the built site is what Pages serves, and dev-server chrome (the HMR overlay, the port bar) has no place in the record.

## Keeping the record honest

Stale screenshots are worse than no screenshots — they make claims the UI no longer backs. The rule: **a PR that changes what a surface looks like updates that surface's shot in the same PR.** The four mandatory shots are the floor; the convention is that a reviewer can diff the shot in the PR against the one in the tree and see exactly what the PR claims to change. When the UI changes and nobody updates the record, the next person to notice is a reader six months later — don't be the reason that reader distrusts the docs.
