# Contributing to Demon Time Exotics 💪🏾😈🔥

First off, thank you for considering contributing to **The Messy Show** ecosystem!
Every comment counts — and every contribution counts too.

## 🚀 Ways to Contribute

- 🐛 **Report bugs** — open a [Bug Report](https://github.com/DTEMONEY448/demon-time-exotics/issues/new?template=bug_report.md)
- ✨ **Suggest features** — open a [Feature Request](https://github.com/DTEMONEY448/demon-time-exotics/issues/new?template=feature_request.md)
- 🔧 **Fix issues** — pick from [open issues](../../issues) and submit a PR
- 📖 **Improve docs** — typos, clarifications, new guides
- 🎨 **Design assets** — banners, icons, mockups (see `packages/assets/`)
- 🌍 **Translations** — help localize the landing site

## 🛠️ Development Setup

```bash
# Prerequisites
node >= 20.18   # nvm install
pnpm >= 9.12    # corepack enable && corepack prepare pnpm@latest --activate
rust stable     # only for Tauri

# Clone & install
git clone https://github.com/DTEMONEY448/demon-time-exotics.git
cd demon-time-exotics
pnpm install

# Run what you're working on
pnpm dev:landing    # landing site
pnpm dev:tauri      # tauri desktop
pnpm dev:electron   # electron desktop
pnpm dev:mobile     # expo mobile
```

## 📋 Branch Naming

Use conventional prefixes:

```
feat/<short-description>      # new features
fix/<short-description>       # bug fixes
docs/<short-description>      # documentation
chore/<short-description>     # tooling, deps, configs
refactor/<short-description>  # code restructure
```

## 📝 Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

[optional body]
[optional footer]
```

**Types:** `feat` `fix` `docs` `style` `refactor` `perf` `test` `build` `ci` `chore`

**Example:**

```
feat(landing): add fire ember particle animation to hero section
fix(electron): resolve crash when window minimized during live stream
docs(readme): update quick start with pnpm 9 instructions
```

## 🔄 Pull Request Process

1. **Fork** the repository and create your branch from `main`
2. **Make** your changes — keep commits atomic and well-described
3. **Test** — run `pnpm lint && pnpm typecheck && pnpm test`
4. **Build** — ensure `pnpm build` succeeds for affected apps
5. **PR** — open a pull request using the
   [PR template](.github/PULL_REQUEST_TEMPLATE.md)
6. **Describe** — link related issues with `Closes #123` syntax
7. **Review** — respond to review feedback respectfully

### PR Checklist

- [ ] Branch follows naming convention
- [ ] Commits follow Conventional Commits
- [ ] `pnpm lint` passes
- [ ] `pnpm typecheck` passes
- [ ] `pnpm test` passes
- [ ] `pnpm build` succeeds for affected apps
- [ ] PR description is complete and links issues
- [ ] No unrelated changes included
- [ ] Screenshots for visual changes (landing/mobile)

## 📦 Project Structure

See the [README](README.md) structure section. Key areas:

| Path | What lives here |
|---|---|
| `apps/landing` | GitHub Pages site |
| `apps/tauri` | Tauri desktop app |
| `apps/electron` | Electron desktop app |
| `apps/mobile` | Expo mobile app |
| `packages/ui` | Shared UI components |
| `packages/core` | Shared business logic |
| `packages/shared` | Constants & helpers |
| `packages/assets` | Brand images & icons |
| `packages/config` | Shared lint/TS/Tailwind/Vite configs |

**Rule of thumb:** if code is used by 2+ apps, it belongs in a `packages/*`
package. App-specific code stays in `apps/*`.

## 🐛 Reporting Bugs

Use the [Bug Report template](.github/ISSUE_TEMPLATE/bug_report.md) and include:

- Environment (OS, Node, pnpm, app)
- Exact steps to reproduce
- Expected vs actual behavior
- Screenshots/logs if possible

## ✨ Suggesting Features

Use the [Feature Request template](.github/ISSUE_TEMPLATE/feature_request.md) and include:

- The problem you're solving
- Your proposed solution
- Alternatives considered
- Which app(s) it affects

## 💬 Questions & Discussion

- [GitHub Discussions](../../discussions) — questions, ideas, show & tell
- [Issues](../../issues) — bugs and feature requests only

## 📄 License

By contributing, you agree that your contributions will be licensed under the
[MIT License](LICENSE).

---

**No scripts. No filters. Just facts, jokes, and real talk — and good PRs.** 😈
