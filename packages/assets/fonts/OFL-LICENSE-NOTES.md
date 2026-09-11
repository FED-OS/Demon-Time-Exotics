# Font Licensing Notes — DTE Brand Fonts

The **Demon Time Exotics** surfaces use two typefaces, both loaded from Google Fonts and both licensed under the [SIL Open Font License 1.1](https://openfontlicense.org/) (free for commercial use, embedding and modification):

## Bebas Neue (display)

Used for headlines, stat numbers, eyebrows and section titles — the condensed uppercase voice of THE MESSY SHOW.

- Designer: Ryoichi Tsunekawa (Dharma Type)
- License: SIL OFL 1.1 — https://fonts.google.com/specimen/Bebas+Neue
- Loaded via `https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap`

## Inter (body)

Used for paragraphs, card copy, buttons, metadata and system UI text.

- Designer: Rasmus Andersson
- License: SIL OFL 1.1 — https://fonts.google.com/specimen/Inter
- Loaded via `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap`

## Self-hosting (offline desktop builds)

The web surfaces load fonts from Google Fonts (no vendoring needed). Tauri and Electron builds bundle the renderer offline, so for fully offline desktop builds vendor the woff2 files here:

```
packages/assets/fonts/
├── bebas-neue-v19-latin-regular.woff2
└── inter-latin-{400,500,600,700}-var.woff2
```

…and switch the font stacks in `@dte/ui/themes` (and the Google Fonts `<link>` in each `index.html`) to `@font-face` rules pointing at these files. Download from https://fonts.google.com/download?family=Bebas%20Neue and https://fonts.google.com/download?family=Inter — the OFL permits redistribution inside commercial app bundles.

## Fallback stacks

When Google Fonts is unreachable, every surface degrades to: Bebas Neue → `Arial Narrow`/`Segoe UI` condensed → sans-serif; Inter → `system-ui`/`-apple-system`/`Segoe UI` → sans-serif. No layout depends on exact font metrics.
