# usage — Using the DTE Apps & Site 📱🖥️🌐

How to actually use everything in the Demon Time Exotics ecosystem.

## 🌐 The Landing Site

**Live at:** https://dtemoney448.github.io/demon-time-exotics/

### What's On It

| Section | What You Get |
|---|---|
| **Hero** | The brand, tagline, live stats, primary CTAs (subscribe / join / merch) |
| **Top Content** | The 5 highest-performing breakdowns, link out to YouTube |
| **Content Pillars** | The 6 areas of coverage (news, No Jumper, beef, street politics, exposés, live) |
| **Talent Roster** | 12 key figures covered (AB, Deen, Ray J, Blueface, Wack 100, …) |
| **Platform Hub** | Every official link in one place |
| **Support** | Ko-fi, membership, merch, affiliate gear |

### Navigating

- Everything is a single scroll page with a sticky navbar — jump sections via
  the top links
- **Mobile:** fully responsive; sections stack; tap targets sized for thumbs
- **Ember particles** run on the hero — if you prefer no motion, enable
  "reduce motion" in your OS and they pause automatically

## 🖥️ The Desktop Apps (Tauri & Electron)

Two builds, same mission: the DTE hub as a native app. Pick either —
Tauri is the lean build; Electron is the compatibility build.

### Install

Grab the latest installer for your OS from
[GitHub Releases](../../releases):

| OS | Tauri | Electron |
|---|---|---|
| Windows | `.msi` / `.exe` | `.exe` (NSIS) |
| macOS | `.dmg` | `.dmg` |
| Linux | `.AppImage` / `.deb` | `.AppImage` / `.snap` |

### What They Do

- **Home dashboard** — latest coverage front and center
- **Open external links** — YouTube / Instagram / Twitch / merch open in your
  default browser (never inside the app — by design)
- **System tray** (Tauri) — quick access, keep it running in the background
- **Native menus** — standard File/Edit/View menus with keyboard shortcuts
- **State persistence** (Electron) — window size/position remembered

### Keyboard Shortcuts (Electron)

| Shortcut | Action |
|---|---|
| `Ctrl/Cmd + R` | Reload |
| `Ctrl/Cmd + Shift + I` | DevTools (dev builds) |
| `Ctrl/Cmd + Q` | Quit |

## 📱 The Mobile App (Expo / React Native)

### Run in Development

```bash
pnpm dev:mobile      # starts Expo
# press a → Android emulator/device
# press i → iOS simulator (macOS)
# scan the QR code with Expo Go on your physical phone
```

### The Tabs

| Tab | Purpose |
|---|---|
| **Home** | Brand hero, quick links, subscribe CTA |
| **Videos** | Latest breakdowns → YouTube |
| **Live** | Live stream & Twitch status |
| **Shop** | Merch + affiliate gear |
| **More** | Full platform hub, about, support |

### Build & Install

```bash
eas build --platform android --profile preview   # .apk you can sideload
eas build --platform ios --profile preview       # TestFlight-style build
```

## 🧩 For Developers Using the Packages

```ts
// canonical brand data — single source of truth
import { LINKS, STATS, FIGURES, PILLARS } from '@dte/core';

// shared UI hooks
import { useEmbers, useReveal } from '@dte/ui';

// shared constants & helpers
import { SOCIAL, THEME } from '@dte/shared';
```

Update a link or stat **once** in `packages/core` → every app reflects it on
next build. That's the whole point of the monorepo.

## 🔗 All Official Destinations

| Destination | URL |
|---|---|
| YouTube (main) | https://www.youtube.com/@DTEMONEY448 |
| YouTube (backup) | https://www.youtube.com/@dteclips |
| Instagram | https://instagram.com/dtemoney448 |
| Twitch | https://twitch.tv/dtemoney448 |
| Merch | https://shopdemontimeexotics.com |
| Membership | https://www.youtube.com/channel/UC4mSdocvseflT-Tubw9xOnw/join |
| Email | Bigmoney@demontimeexotics.com |

## 💡 Tips

- **Landing loads instantly** — it's a static site with zero framework weight
- **Desktop apps open links externally** — that's intentional (your logins
  and cookies stay in your browser, where they belong)
- **Mobile "Live" tab** refreshes on pull — use it on release days
- **The shadowban is REAL** — if you found any of this, you're early. Welcome
  to the movement. 😈

---

Setup your own → [INSTALL.md](INSTALL.md) • Build it → [BUILD.md](BUILD.md)
