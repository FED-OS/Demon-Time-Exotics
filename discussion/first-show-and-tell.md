# Seeded thread: first show and tell (Show and tell)

> Paste as the first post in **Show and tell** when Discussions is enabled. Its job is to model the category's invitation: your fork, your derivative, your build — link it, tell the story, keep the license pointers in view. This file is the source of truth for its wording.

Title: **🙌 Show and tell demo: forking the repo for a second channel**

The demo post for this category, using the most likely fork story there is — someone taking this monorepo and running their own channel brand on it.

**The story:** this repo ships one brand across four surfaces from a single data spine, and the entire point of that architecture is that the brand is data. Fork it, and the fastest path to "my channel's version of this" is not redesigning anything — it's replacing the constants. The channel identity lives in `@dte/shared` (`CHANNEL`, `CHANNEL_STATS`, `YOUTUBE_IDS`, `LINKS`, `PLATFORMS`, `TOP_VIDEOS`, `ROSTER`, `PILLARS`, `AFFILIATES` in `packages/shared/src/constants/index.ts`), the brand look lives in the theme tokens (`@dte/ui`'s `dteTheme` and the CSS variables it sets), and the surfaces render whatever the spine says. A fork with different constants, different tokens, and a different `manifest.json` in `@dte/assets` is a different channel's entire platform — same engine, new voice.

**What the fork keeps and what it changes:** keeps the architecture — the `@dte/shared → @dte/core → @dte/ui` ladder, the URL allowlist with `isAllowedUrl` failing closed, the hardened Electron flags, the scoped Tauri capabilities, the artifact contract the release workflows consume. Changes the content: the constants, the tokens, the assets, and probably the platform list (a gaming channel's links aren't a hip-hop drama channel's links). The allowlist deserves a slow read on any fork — the `ALLOWED_URL_PREFIXES` in `@dte/shared` and the Electron mirror are the fork's security surface now, and each new domain is a deliberate decision, not a copy-paste.

**The license pointers, stated up front:** the repo is MIT-licensed — see [LICENSE](https://github.com/DTEMONEY448/demon-time-exotics/blob/main/LICENSE) and [NOTICE](https://github.com/DTEMONEY448/demon-time-exotics/blob/main/NOTICE). Keep the notice, keep the license terms, and beyond that: run. A fork that ships is the compliment this repo was built to receive.

**How to post yours:** link the fork or the build, tell the story — what you changed, what you kept, what bit you — and screenshots if you've got them (the repo's own screenshot conventions are in `docs/screenshots/README.md` if you want a head start). Questions about *how* to fork belong in Q&A; this category is for showing the thing once it exists. And if your fork fixes something the upstream should absorb, that's a PR — the best show-and-tell posts end with a "and I upstreamed the fix" line.
