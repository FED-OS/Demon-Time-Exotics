name: 📋 Custom / Other
description: Anything that doesn't fit bug reports or feature requests
labels: ["triage"]
body:
  - type: markdown
    attributes:
      value: |
        ## 📋 Custom Issue — The Messy Show

        For anything that isn't a 🐛 bug or a ✨ feature request — questions
        about structure, docs corrections, general observations, etc.

        > 💡 **Best practice:** questions usually fit better in
        > [Discussions](https://github.com/DTEMONEY448/demon-time-exotics/discussions).
        > Security topics NEVER go here — see [SECURITY.md](../../SECURITY.md).

  - type: input
    id: title-idea
    attributes:
      label: One-line summary
      description: If you had to title this issue in one line, what would it be?
      placeholder: "e.g. Docs cross-link typo between BUILD.md and DEPLOYMENT.md"

  - type: dropdown
    id: category
    attributes:
      label: Category
      options:
        - ❓ Question about the repo / structure
        - 📚 Documentation issue
        - 🎨 Branding / design observation
        - 🔧 Build or CI question
        - 🌐 Website content observation
        - 💡 Idea too rough to be a formal feature request
        - 🔀 Something else entirely
    validations:
      required: true

  - type: textarea
    id: body
    attributes:
      label: The Full Story
      description: Lay it out — the messier the details, the better we can help.
      placeholder: "What's up? Give us the full context…"
    validations:
      required: true

  - type: textarea
    id: related
    attributes:
      label: Related Links
      description: URLs, issue numbers, discussions, docs pages, or channel content that relates.

  - type: checkboxes
    id: preflight
    attributes:
      label: Preflight
      options:
        - label: I searched existing issues and this is not a duplicate
          required: true
        - label: This is about the repository — not channel content feedback
          required: true
