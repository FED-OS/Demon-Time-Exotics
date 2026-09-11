# Seeded thread: first question (Q&A)

> Paste as the first post in **Q&A** when Discussions is enabled. Its job is to model the format: environment block, what was tried, exact error — and a marked answer when it lands. This file is the source of truth for its wording.

Title: **🙏 Q&A format demo: "Why does Tauri dev fail if port 1420 is busy?"**

Posting the format this category rewards, using a real question from the repo's design so the demo is also the documentation.

**Environment:**
- OS: any (this one is port behavior, not platform)
- Node: v20.18.0 (`.nvmrc`), pnpm 9.12.0 (Corepack-pinned)
- Surface: Tauri dev (`pnpm dev:tauri`)

**What I tried:** ran `pnpm dev` (all four surfaces in parallel) and one of them — a previous Electron dev run I'd forgotten about — was still holding a port. The Tauri dev run died with a bind error instead of starting.

**The exact behavior:** the Tauri dev server is configured with `strictPort` on port **1420**. Unlike Vite's default behavior of hopping to the next free port when one is busy, strictPort makes the failure loud: if 1420 is taken, the run fails on purpose rather than rebinding. The webview expects exactly that port, so a silent rebind would serve it a stale or wrong window — the loud failure is the safety feature, not the bug.

**The fix:** free the port (`lsof -i :1420`, kill the squatter) or run only the surface you need (`pnpm dev:tauri` alone). The full port map — landing 5173, Tauri 1420, Electron 5174, mobile 8081 — is a repo contract, documented in the wiki's [Getting Started](https://github.com/DTEMONEY448/demon-time-exotics/wiki/Getting-Started) and [Troubleshooting](https://github.com/DTEMONEY448/demon-time-exotics/wiki/Troubleshooting) pages.

**Why this post looks like this:** the environment block lets the answerer rule out drift immediately; "what I tried" shows the work so nobody re-walks it; the exact error or behavior names the thing being asked about instead of making the reader guess. Posts with those three parts get answered fast; posts without them get a reply asking for them first.

**Marked answer when it lands:** replies that add detail (platform-specific `lsof` equivalents, CI notes) get folded back into the docs — accepted answers here are doc candidates, and the wiki's Troubleshooting page already carries the general port-collision story this thread demonstrates.
