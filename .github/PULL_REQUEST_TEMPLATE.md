<!-- GitHub-rendered PR template — a root-level copy lives at PULL_REQUEST_TEMPLATE.md; edit both together -->

## 📝 Description

<!-- What does this PR do? Link related issues: "Closes #123" -->

**Related Issue(s):**

## 🧩 Type of Change

- [ ] 🐛 Bug fix (non-breaking change that fixes an issue)
- [ ] ✨ New feature (non-breaking change that adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📚 Documentation update
- [ ] 🔧 Chore (deps, configs, tooling)
- [ ] 🎨 Design/branding change (**requires owner sign-off**)

## 🎯 Affected Targets

- [ ] 🌐 `apps/landing` — GitHub Pages site
- [ ] 🖥️ `apps/tauri` — Tauri desktop app
- [ ] 🖥️ `apps/electron` — Electron desktop app
- [ ] 📱 `apps/mobile` — Expo mobile app
- [ ] 🧩 `packages/ui`
- [ ] ⚙️ `packages/core` (**brand data — owner sign-off required**)
- [ ] 🤝 `packages/shared`
- [ ] 🎨 `packages/assets` (**brand imagery — owner sign-off required**)
- [ ] ⚙️ `packages/config`
- [ ] 🔧 `tooling/` / CI workflows
- [ ] 📚 Docs only (no code)

## ✅ Pre-Merge Checklist

**Code:**

- [ ] Branch follows naming convention (`feat/…`, `fix/…`, `docs/…`)
- [ ] Commits follow Conventional Commits
- [ ] `pnpm lint` passes locally
- [ ] `pnpm typecheck` passes locally
- [ ] Affected app(s) build locally
- [ ] No hardcoded brand links/stats — imported from `@dte/core`
- [ ] No secrets, no `.env`, no build artifacts committed

**Review:**

- [ ] Self-review completed
- [ ] PR description complete and accurate
- [ ] Changes match linked issue scope (no scope creep)
- [ ] Screenshots/videos attached for UI changes

**Docs:**

- [ ] `CHANGELOG.md` `[Unreleased]` updated (user-facing changes)
- [ ] `ROADMAP.md` updated (if a planned item shipped)
- [ ] New ADR added (if architectural — see `ADR.md`)

## 📸 Screenshots / Video

<!-- UI changes: before/after, desktop + mobile. Delete section if N/A. -->

## 🧪 Testing

<!-- How did you verify? What couldn't you verify (missing toolchain)? Be honest — the show has no filters, neither do we. -->

- [ ] Tested locally on affected target(s)
- [ ] Cross-checked shared package changes against ALL apps that import them

## ℹ️ Additional Notes

<!-- Follow-ups, gotchas, TODOs for reviewers -->

---

*No scripts. No filters. Just facts, jokes, and real talk — and clean PRs.* 😈
