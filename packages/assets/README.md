# @dte/assets

The **Demon Time Exotics** brand asset library — every logo, banner, icon, font reference and hero image the four build surfaces (landing, Tauri, Electron, Expo) consume. Apps reference these paths instead of forking copies.

## Layout

```
packages/assets/
├── branding/          # Master brand art
│   ├── logo.png            1024×1024 demon-head logo
│   └── social-banner.png   1280×640 GitHub social preview
├── icons/             # App/web icons (all sizes)
│   ├── favicon.ico         multi-resolution (16/32/48)
│   ├── logo-16.png … logo-512.png
│   ├── logo-180.png        Apple touch icon
│   ├── logo-192.png        Android adaptive
│   └── icon.png            desktop app icon (Tauri/Electron)
├── images/            # Photographic/hero art
│   ├── hero-bg.png         hero background (fire/neon city)
│   └── social-preview.png  OG/Twitter card 1280×640
├── fonts/             # Font licensing notes (fonts load from Google Fonts)
│   └── OFL-LICENSE-NOTES.md
├── manifest.json      # Machine-readable asset index
└── package.json
```

## Usage

CSS / HTML / config references — via the `@dte/assets/*` path alias (mapped in `tsconfig.base.json`) or direct import:

```css
/* vite handles the base-prefixing when referenced from src/ */
background: url("@dte/assets/images/hero-bg.png") center / cover no-repeat;
```

```jsonc
// app.json (Expo)
{ "icon": "../../packages/assets/icons/icon.png" }
```

## Regenerating sizes

All raster sizes derive from the master `branding/logo.png`:

```bash
# from repo root (requires Pillow)
python3 - <<'PY'
from PIL import Image
logo = Image.open("packages/assets/branding/logo.png")
for size in (16, 32, 48, 64, 128, 180, 192, 256, 512):
    logo.resize((size, size), Image.LANCZOS).save(f"packages/assets/icons/logo-{size}.png")
PY
```

## Fonts

Bebas Neue and Inter are loaded from [Google Fonts](https://fonts.google.com/) under the SIL Open Font License — see `fonts/OFL-LICENSE-NOTES.md`. The apps self-host nothing; if you need offline desktop builds, vendor the woff2 files here and update the font stacks in `@dte/ui/themes`.
