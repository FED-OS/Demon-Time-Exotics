name: ✨ Feature Request
description: Suggest a feature for the DTE ecosystem apps or site
labels: ["enhancement", "triage"]
body:
  - type: markdown
    attributes:
      value: |
        ## ✨ Feature Request — The Messy Show

        Got an idea to make the DTE ecosystem even messier (in a good way)? 😈

        > 💡 Check [ROADMAP.md](../../ROADMAP.md) first — your idea might already
        > be on the list. Big/architectural ideas may get routed to
        > [Discussions](https://github.com/DTEMONEY448/demon-time-exotics/discussions)
        > per [GOVERNANCE.md](../../GOVERNANCE.md).

  - type: textarea
    id: problem
    attributes:
      label: The Problem
      description: What doesn't work or what's missing? Ex: "I'm always frustrated when […]"
      placeholder: "I'm always frustrated when […]""
    validations:
      required: true

  - type: textarea
    id: solution
    attributes:
      label: The Solution You'd Like
      description: A clear description of what you want to happen.
    validations:
      required: true

  - type: dropdown
    id: target
    attributes:
      label: Affected Target
      options:
        - 🌐 apps/landing — GitHub Pages site
        - 🖥️ apps/tauri — Tauri desktop app
        - 🖥️ apps/electron — Electron desktop app
        - 📱 apps/mobile — Expo mobile app
        - 🧩 packages/ui — shared UI
        - ⚙️ packages/core — brand data / logic
        - 🤝 packages/shared — constants & helpers
        - 🔧 tooling / CI
        - 📚 Documentation
        - 🌍 All apps (shared feature)
    validations:
      required: true

  - type: textarea
    id: alternatives
    attributes:
      label: Alternatives You've Considered
      description: Other solutions or features you thought about.

  - type: dropdown
    id: scope
    attributes:
      label: Scope (best guess)
      options:
        - 🕐 Small — tweak / small addition (one app)
        - 🕑 Medium — new component or section
        - 🕒 Large — cross-app feature (needs Discussion)
        - 🕓 Huge — architectural change (needs Discussion + ADR)

  - type: textarea
    id: mockups
    attributes:
      label: Mockups / References
      description: Links, sketches, screenshots, or examples from other apps.

  - type: textarea
    id: context
    attributes:
      label: Additional Context
      description: Why now, who it helps, tie-ins with the channel strategy.

  - type: checkboxes
    id: preflight
    attributes:
      label: Preflight
      options:
        - label: I searched existing issues and ROADMAP.md and this is not a duplicate
          required: true
