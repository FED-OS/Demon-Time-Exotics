# COPYING — License & Redistribution Terms 📄

## Summary (Not Legal Advice)

This project's **code** is licensed under the **MIT License** — the full text
lives in [LICENSE](LICENSE). In short, you may use, copy, modify, merge,
publish, distribute, sublicense, and/or sell copies of the software, provided
you include the original copyright notice and license text.

## The MIT License — Full Text

MIT License

Copyright (c) 2025 Demon Time Exotics

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## What the MIT License Covers

**✅ Covered (free to reuse, even commercially):**
- Source code in `apps/*`, `packages/*`, `tooling/*`
- Build scripts, CI workflow definitions in `.github/workflows/*`
- Documentation text in the root `.md` files, `docs/`, `wiki/`, `discussion/`,
  `prompts/`
- The repository structure and file organization as a template

**⚠️ Not covered — brand property, all rights reserved:**
- The "DEMON TIME EXOTICS" name and "THE MESSY SHOW" tagline as brand marks
- The demon logo / favicon images and social banner art
  (`social-image.png`, `packages/assets/branding/*`,
  `apps/landing/public/images/logo.png`, icon sets)
- Channel statistics, links, and covered-figure data as packaged brand data
  (`packages/core/src` brand constants) — facts aren't copyrightable, but
  the assembled brand identity is the brand's
- References to third parties (channel subjects) — those names/trademarks
  belong to them

## Forking for Your Own Channel

This repo is explicitly designed as a template for creator ecosystems. To
fork it cleanly:

1. **Replace brand assets** — swap everything in `packages/assets/branding/`
   and `apps/*/public`/`resources`/`icons` image folders with your own
2. **Replace brand data** — edit `packages/core/src/links.ts`,
   `stats.ts`, `figures.ts`, and `pillars.ts` with your channel's data
3. **Update identifiers** — package names (`@dte/*`), bundle IDs
   (`com.demontimeexotics.*` in Tauri/Electron/Expo configs), repo URLs
4. **Keep the LICENSE copyright line** pointing at Demon Time Exotics for
   the original code (or add your own line beneath it)

## Third-Party Licenses

Dependencies carry their own licenses (MIT, Apache-2.0, BSD, etc.) — see each
package's license in `node_modules` after install. Notable stack components:

| Project | License |
|---|---|
| TypeScript | Apache-2.0 |
| Vite | MIT |
| Tauri | MIT / Apache-2.0 |
| Electron | MIT |
| React Native / Expo | MIT |
| pnpm | MIT |
| Turborepo | MIT |

No project code is incorporated from copyleft (GPL/AGPL) sources.

## Questions

Licensing questions → Bigmoney@demontimeexotics.com

---

Related: [LICENSE](LICENSE) • [NOTICE.md](NOTICE.md) • [PRICING.md](PRICING.md) • [CITATIONS.md](CITATIONS.md)
