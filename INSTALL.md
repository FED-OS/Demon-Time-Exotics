# INSTALL — Environment Setup 🛠️

Complete setup instructions to run **every app** in the Demon Time Exotics
monorepo. You only need the sections for the targets you plan to build.

## 📋 Requirements Overview

| Tool | Version | Needed For | Check |
|---|---|---|---|
| **Node.js** | ≥ 20.18.0 | Everything | `node -v` |
| **pnpm** | ≥ 9.12.0 | Everything | `pnpm -v` |
| **Git** | ≥ 2.40 | Everything | `git --version` |
| **Rust toolchain** | stable | Tauri only | `rustc --version` |
| **Xcode** | ≥ 15 | iOS only | `xcodebuild -version` |
| **Android Studio** | latest | Android only | `adb --version` |
| **CocoaPods** | ≥ 1.15 | iOS only | `pod --version` |

## 1️⃣ Node.js + pnpm (Required — all targets)

```bash
# Install Node via nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc        # or ~/.zshrc

nvm install             # reads .nvmrc → v20.18.0
nvm use

# Enable pnpm via corepack (bundled with Node 20)
corepack enable
corepack prepare pnpm@9.12.0 --activate

# Verify
node -v   # v20.18.0
pnpm -v   # 9.12.0
```

<details>
<summary><b>Alternative: install pnpm globally</b></summary>

```bash
# via npm
npm install -g pnpm@9

# or standalone
curl -fsSL https://get.pnpm.io/install.sh | sh -
```
</details>

## 2️⃣ Rust (Tauri only)

```bash
# Install rustup (macOS / Linux)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"

# Windows: download rustup-init.exe from https://rustup.rs

# Verify — needs 1.77.2+
rustc --version
cargo --version
```

### Linux system dependencies (Tauri)

**Debian / Ubuntu:**

```bash
sudo apt update
sudo apt install -y \
  libwebkit2gtk-4.1-dev \
  build-essential \
  curl \
  wget \
  file \
  libxdo-dev \
  libssl-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev
```

**Fedora:**

```bash
sudo dnf install -y \
  webkit2gtk4.1-devel \
  openssl-devel \
  curl wget file \
  libappindicator-gtk3-devel \
  librsvg2-devel \
  gcc
```

**Arch:**

```bash
sudo pacman -S --needed \
  webkit2gtk-4.1 \
  base-devel \
  curl wget file \
  openssl \
  appindicator-gtk3 \
  librsvg
```

> **Note:** Tauri 2 requires `libwebkit2gtk-4.1` (not 4.0). On Ubuntu 22.04
> LTS this is available from the standard repos; on 20.04 you'll need a PPA
> or upgrade.

### macOS (Tauri)

Xcode Command Line Tools are required (see iOS section below — installing
Xcode covers this). No extra system deps needed on macOS.

### Windows (Tauri)

- **WebView2** — preinstalled on Windows 10/11; otherwise install the
  [Evergreen Runtime](https://developer.microsoft.com/microsoft-edge/webview2/)
- **Visual Studio Build Tools** with "Desktop development with C++" workload
- **Rust MSVC** toolchain (`x86_64-pc-windows-msvc`) — the default on rustup

## 3️⃣ Expo / React Native (Mobile only)

```bash
# EAS CLI for cloud builds
npm install -g eas-cli

# Verify
eas --version
```

### Android setup

1. Install [Android Studio](https://developer.android.com/studio)
2. Android Studio → More Actions → **SDK Manager** → install:
   - Android 14 (API 34) SDK
   - Android SDK Build-Tools 34
   - Android Emulator (if you want the emulator)
3. Set environment variables (`~/.bashrc` / `~/.zshrc` / Windows env):

```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/emulator
```

4. Verify with a device or emulator connected:

```bash
adb devices
```

### iOS setup (macOS only)

1. Install **Xcode 15+** from the Mac App Store (or `xcode-select --install`
   for just the CLI tools — full Xcode is required for simulators)
2. Accept the license: `sudo xcodebuild -license accept`
3. Install CocoaPods: `sudo gem install cocoapods`
4. Open a simulator: `open -a Simulator`

## 4️⃣ Clone & Install

```bash
# Clone
git clone https://github.com/DTEMONEY448/demon-time-exotics.git
cd demon-time-exotics

# Install ALL workspaces (apps + packages)
pnpm install

# If you only care about JS targets (skip optional native postinstalls):
# pnpm install --ignore-scripts
```

The install wires up all workspaces defined in `pnpm-workspace.yaml`:
`apps/*`, `packages/*`, `packages/config/*`.

## 5️⃣ Environment Variables

Copy the example and fill in values if you need them:

```bash
cp .env.example .env
```

| Variable | Used By | Purpose |
|---|---|---|
| `DTE_YOUTUBE_CHANNEL_ID` | core/landing | Channel ID for live embeds |
| `DTE_YOUTUBE_API_KEY` | core | YouTube Data API (optional stats) |
| `DTE_ANALYTICS_ID` | landing | Analytics tracking ID (optional) |
| `DTE_KOFI_USERNAME` | landing | Ko-fi username for support links |

> **Never commit `.env`** — it's gitignored. `.env.example` is the template.

## 6️⃣ Verify Your Setup

Run the whole verification suite:

```bash
pnpm lint         # ESLint across workspaces
pnpm typecheck    # TypeScript across workspaces
pnpm build        # Build every target you have tooling for
```

Or verify a single target:

```bash
pnpm --filter @dte/landing build      # landing site
pnpm --filter @dte/electron build     # electron app
pnpm --filter @dte/mobile export      # mobile (JS bundle)
pnpm --filter @dte/tauri tauri build  # tauri (needs Rust)
```

## 🏃 Quick Reference — Run Each App

| App | Command | Opens |
|---|---|---|
| 🌐 Landing | `pnpm dev:landing` | http://localhost:5173 |
| 🖥️ Tauri | `pnpm dev:tauri` | native desktop window |
| 🖥️ Electron | `pnpm dev:electron` | native desktop window |
| 📱 Mobile | `pnpm dev:mobile` | Expo Devtools (press `i`/`a`) |
| 🚀 All at once | `pnpm dev` | everything (needs full toolchain) |

## 🧹 Troubleshooting Installs

| Symptom | Fix |
|---|---|
| `ERR_PNPM_UNSUPPORTED_ENGINE` | Upgrade Node: `nvm install` |
| `corepack: not found` | Node < 16.13 — upgrade Node |
| Tauri: `webkit2gtk-4.1 not found` | Install Linux deps above (Ubuntu 22.04+) |
| Tauri: `linker cc not found` | Install `build-essential` (Linux) |
| Electron: `Sandbox is not available` | Linux: run `pnpm dev:electron -- --no-sandbox` or install chrome-sandbox setuid |
| Expo: `ANDROID_HOME not set` | Set env vars per Android section above |
| Expo: `No devices connected` | Start emulator or plug in device with USB debugging |
| Lockfile conflicts on pull | `git pull --rebase` then `pnpm install` |
| Weird caches | `pnpm clean && pnpm store prune && pnpm install` |

## ✅ Setup Complete Checklist

- [ ] Node 20.18+ installed
- [ ] pnpm 9.12+ active
- [ ] `pnpm install` completed cleanly
- [ ] `pnpm dev:landing` shows the site
- [ ] (Tauri) Rust + webkit2gtk installed; `pnpm dev:tauri` opens a window
- [ ] (Electron) `pnpm dev:electron` opens a window
- [ ] (Mobile) `adb devices` lists a device; `pnpm dev:mobile` runs

---

Next: [BUILD.md](BUILD.md) • [DEPLOYMENT.md](DEPLOYMENT.md) • [USAGE.md](USAGE.md)
