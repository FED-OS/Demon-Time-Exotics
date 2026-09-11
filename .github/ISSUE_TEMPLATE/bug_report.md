name: 🐛 Bug Report
description: Report a bug in the landing site, desktop apps, or mobile app
labels: ["bug", "triage"]
body:
  - type: markdown
    attributes:
      value: |
        ## 🐛 Bug Report — The Messy Show

        Thanks for keeping **Demon Time Exotics** tight! 💪🏾😈🔥

        > ⚠️ **Security vulnerabilities:** do NOT use this form — see
        > [SECURITY.md](../../SECURITY.md) and email
        > Bigmoney@demontimeexotics.com with `[SECURITY]` in the subject.

        > 💡 **Channel/content feedback?** GitHub issues are for this
        > *repository's software*. Content comments go to
        > [YouTube](https://www.youtube.com/@DTEMONEY448) — every comment counts.

  - type: dropdown
    id: app
    attributes:
      label: What app is bugging out?
      options:
        - 🌐 Landing site (GitHub Pages)
        - 🖥️ Tauri desktop app
        - 🖥️ Electron desktop app
        - 📱 Mobile app (Expo)
        - 🧩 Shared package (@dte/ui, @dte/core, @dte/shared)
        - 🔧 Build / CI / tooling
        - 📚 Documentation
    validations:
      required: true

  - type: textarea
    id: description
    attributes:
      label: Description
      description: A clear and concise description of what the bug is.
      placeholder: "A clear description of what's happening…"
    validations:
      required: true

  - type: textarea
    id: repro
    attributes:
      label: Steps to Reproduce
      description: Minimal steps so we can reproduce the mess ourselves.
      placeholder: |
        1. Go to '…'
        2. Click on '…'
        3. Scroll to '…'
        4. See error
    validations:
      required: true

  - type: textarea
    id: expected
    attributes:
      label: Expected Behavior
      description: What you expected to happen.
    validations:
      required: true

  - type: textarea
    id: actual
    attributes:
      label: Actual Behavior
      description: What actually happened. Paste error text if visible.
    validations:
      required: true

  - type: textarea
    id: logs
    attributes:
      label: Screenshots / Logs
      description: If applicable — screenshots, console output, error logs.
      placeholder: "Paste screenshots or logs here…"

  - type: textarea
    id: env
    attributes:
      label: Environment
      description: "OS, app + version, browser (if web), device (if mobile)."
      placeholder: |
        OS: Windows 11 / macOS 14 / Ubuntu 22.04
        App + version: Electron v1.0.0
        Browser: Chrome 129
        Device: Pixel 8 / iPhone 15

  - type: textarea
    id: context
    attributes:
      label: Additional Context
      description: Workarounds found, when it started, frequency (always / sometimes / rare).

  - type: checkboxes
    id: searches
    attributes:
      label: Preflight
      options:
        - label: I searched existing issues and this is not a duplicate
          required: true
        - label: This is a software bug, not channel content feedback
          required: true
