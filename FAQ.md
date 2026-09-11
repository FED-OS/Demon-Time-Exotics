# FAQ — Frequently Asked Questions 🤔

Answers to the most common questions about **Demon Time Exotics** and this
repository.

---

## About the Channel

### What is Demon Time Exotics?

Demon Time Exotics (@DTEMONEY448) is a Hip Hop news, podcast beef, and urban
entertainment commentary brand — "THE MESSY SHOW" 💪🏾😈🔥. It covers viral drama,
street politics, industry backdoors, live interviews, and messy culture moments
across Los Angeles, Compton, South Central & West Coast hip hop.

### Who runs it?

The channel is run by DTE Bigmoney from the United States. Business contact:
**Bigmoney@demontimeexotics.com**.

### When did it start?

The YouTube channel joined **September 28, 2022**. The GitHub repo you're
looking at launched September 2025.

### How big is the channel?

As of the repo launch: **21.2K subscribers**, **406 videos**, and
**3,025,509 total views** — and climbing. The shadowban is real, but so is the
movement. 😈

### What does "the shadowban is REAL" mean?

Like many raw, unfiltered commentary channels, DTE's reach on platform
algorithms is often suppressed. That's why every like, comment, bell-alert,
and share counts — and why the brand pushes a direct community connection
(memberships, Twitch, merch) instead of relying purely on algorithmic reach.

---

## About This Repo

### What's in this repository?

One monorepo containing the **entire DTE digital ecosystem**:

- 🌐 `apps/landing` — the eye-catching GitHub Pages website
- 🖥️ `apps/tauri` — a Tauri 2 desktop app (Rust core)
- 🖥️ `apps/electron` — an Electron desktop app
- 📱 `apps/mobile` — an Expo / React Native mobile app
- 🧩 `packages/*` — shared UI, business logic, assets, configs
- 📚 docs, wiki, discussion templates, and 24 root-level documentation files

### Why one repo for everything?

A monorepo keeps branding, links, stats, and shared code **in sync everywhere**.
Update a link or stat once in `packages/core`, and every app reflects it.
Plus: one CI pipeline, one changelog, one source of truth — no drift.

### Do I need all the tooling to run just one app?

No. Each app runs independently:

| I want to run... | Command | Requires |
|---|---|---|
| Landing site | `pnpm dev:landing` | Node + pnpm only |
| Tauri app | `pnpm dev:tauri` | Node, pnpm, **Rust** |
| Electron app | `pnpm dev:electron` | Node + pnpm only |
| Mobile app | `pnpm dev:mobile` | Node, pnpm, **Expo CLI** |

### Is the site mobile-friendly?

Yes — the landing site is fully responsive, from 320px phones to ultrawide
displays, with touch-friendly tap targets and reduced-motion support.

### Can I use this structure for my own channel/brand?

Absolutely — that's why it's MIT licensed. Fork it, swap the brand tokens in
`packages/core` and `packages/assets`, and ship your own multi-platform
empire. Attribution appreciated but not required.

---

## Setup & Troubleshooting

### `pnpm install` fails with engine warnings

Make sure you're on Node ≥ 20.18 and pnpm ≥ 9.12:

```bash
nvm install          # uses .nvmrc
corepack enable
corepack prepare pnpm@latest --activate
```

### Tauri build fails on Linux

Install the required system libraries (see [INSTALL.md](INSTALL.md)):

```bash
sudo apt update
sudo apt install libwebkit2gtk-4.1-dev build-essential curl wget file \
  libxdo-dev libssl-dev libayatana-appindicator3-dev librsvg2-dev
```

### Electron won't start on Linux (sandbox error)

Run with the sandbox flag or install the setuid helper:

```bash
pnpm --filter @dte/electron dev -- --no-sandbox
```

### Expo can't find Android SDK

Ensure `ANDROID_HOME` is set and an emulator/device is connected:

```bash
# ~/.bashrc or ~/.zshrc
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### The landing site looks unstyled when opened directly via file://

The Vite build uses absolute asset paths. Use `pnpm dev:landing` for local
preview, or set `base: '/demon-time-exotics/'` in
`apps/landing/vite.config.ts` if deploying under a repo path (already
configured by default).

---

## Support & Community

### How do I support the movement?

- 🎬 Subscribe & turn on **ALL alerts** — [YouTube](https://www.youtube.com/@DTEMONEY448)
- 💎 Become a **MEMBER** — [Join](https://www.youtube.com/channel/UC4mSdocvseflT-Tubw9xOnw/join)
- ☕ **Ko-fi** — button in the README (replace `YOUR_USERNAME`)
- 👕 **Merch** — [shopdemontimeexotics.com](https://shopdemontimeexotics.com)
- 📸 **Instagram** — [@dtemoney448](https://instagram.com/dtemoney448)
- 🎮 **Twitch** — [twitch.tv/dtemoney448](https://twitch.tv/dtemoney448)

### Where do I ask questions about this repo?

Open a [GitHub Discussion](../../discussions) — questions, ideas, and show & tell.
Bugs and feature requests go to [Issues](../../issues) using the templates.

### I found a bug. Where do I report it?

Use the Bug Report template: `.github/ISSUE_TEMPLATE/bug_report.md` —
via the Issues tab (preferred).

---

*More questions? Hit the [Discussions](../../discussions) tab. Every comment counts.* 💪🏾😈🔥
