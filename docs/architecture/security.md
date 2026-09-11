# Security & Trust Model

The DTE apps are viewers and launchers, not servers: they render channel facts from `@dte/shared` and open a fixed set of external destinations. That simplicity is the security posture, and this page documents the four layers that keep it true as the app grows: the URL allowlist, the Electron process hardening, the Tauri capability scoping, and the content-security policies.

Read `overview.md` for the system shape first; the package APIs involved here are documented in `packages.md`, and the pipeline that enforces quality on every change is in `build-pipeline.md`.

## The URL allowlist — one rule, three enforcers

Every outbound link in every surface must pass the same test: does it start with one of the prefixes in `ALLOWED_URL_PREFIXES`? The list is exported from `@dte/shared` and is intentionally short — thirteen entries: the YouTube pair (`https://www.youtube.com/`, `https://youtube.com/`), Instagram, Twitch, the merch store (`shopdemontimeexotics.com`), Ko-fi, the three affiliate gear retailers (REI, Sweetwater, Guitar Center), Best Buy, the GitHub repo and Pages host, and the `mailto:` contact address. The `isAllowedUrl` helper is the single function every surface calls before handing a URL to a browser, a webview or the OS.

The list is the whole trust decision, so changing it is a deliberate act: add a prefix in `@dte/shared`, and the landing page's hub links, the Electron open-external IPC and the Tauri opener calls all widen together. There is no per-surface escape hatch — that's the point of making the list a shared export rather than three private copies. (The one intentional mirror lives in the Electron main process, described below, and its comment points back at `@dte/shared` as the source of truth.)

Why prefixes rather than exact URLs: the hub links to channel pages, videos, playlists and store categories — deep paths under a handful of trusted domains. Prefix matching admits those deep paths while keeping the domain set closed. The trade-off is documented in the helper's header: the list must never include a prefix whose host is user-writable at any path (which is why there's no `https://bit.ly/`-style shortener on it).

## Electron — three-process hardening

The Electron app runs the strictest defaults the platform allows, set explicitly in the main process's `BrowserWindow` config: `contextIsolation: true` (the preload script is the *only* bridge between renderer and Node), `nodeIntegration: false` (the renderer cannot touch Node, period), and `sandbox: true` (the preload itself runs in a sandboxed context). A compromised renderer gets a DOM and nothing else.

The preload exposes exactly one namespace — `window.dte` — via `contextBridge.exposeInMainWorld`, carrying typed, validated wrappers for the three IPC channels the main process registers: `dte:app-info` (version/platform/electron strings), `dte:open-external` (the guarded link opener), and `dte:channel-stats` (the stats mirror). The renderer never builds an IPC call itself; it calls `dte.openExternal(url)` and gets an `{ ok, error? }` result back.

The guard lives in the main process, not the renderer — which matters, because a compromised renderer can lie about what it asked for. The main process's `dte:open-external` handler validates the payload (`typeof url === "string"`), then checks it against its own mirror of the platform prefixes — the six domains the desktop app should ever open: YouTube (both forms), Instagram, Twitch, the merch store and Ko-fi. Anything else returns `{ ok: false, error: "URL not on the DTE allowlist" }` and `shell.openExternal` is never reached. The mirror is deliberately *narrower* than the shared list (the gear retailers and GitHub are web-destinations, not desktop-app-destinations), and the file's comment points at `@dte/shared` as the canonical source so the relationship stays discoverable. Both lists only ever shrink-or-stay-put per release; widening either one is a reviewable diff in tracked code.

The renderer document carries its own CSP meta tag: `default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data:; script-src 'self'`. Scripts and connections are `'self'`-only; the only external allowances are the Google Fonts hosts for styles and fonts, and `data:` for inline images. `unsafe-inline` appears for `style-src` only — the DOM factories in `@dte/ui` set styles programmatically, which does not trip CSP, but the inline style attribute usage in a few legacy paths does; script-src has no such allowance.

## Tauri — capability scoping

Tauri's security model is capabilities-based: the app can only invoke what a capability file grants. The DTE desktop window declares exactly one capability, `default`, scoped to the `main` window with a permission set sized for what the app actually does: `core:default` plus window dragging and devtools toggling, `opener:default` and `opener:allow-open-url` for opening platform links externally, and `shell:allow-spawn` / `shell:allow-execute` for the stream-status checks the app shells out for. Anything not on that list — filesystem access, HTTP APIs, notifications — is simply not granted, so the Rust core would refuse it even if a webview bug tried to invoke it.

The webview content runs under the CSP declared in `tauri.conf.json`: `default-src 'self'; img-src 'self' asset: http://asset.localhost data:; style-src 'self' 'unsafe-inline'; font-src 'self' data: https://fonts.googleapis.com https://fonts.gstatic.com; script-src 'self'; connect-src 'self' https://api.github.com; ipc: http://ipc.localhost`. Same shape as Electron's policy — scripts and default sources pinned to `'self'`, Google Fonts allowed for style/font, `data:` images — with the Tauri-specific additions: the `asset:`/`http://asset.localhost` image sources for the custom protocol, `connect-src` narrowed to `self` plus `api.github.com` (the one network call the desktop app makes, for repo stars), and the `ipc:` scheme so the webview can talk to the Rust core over Tauri's IPC channel.

The one deliberate sharp edge in the capability set is `shell:allow-execute` — a real grant, needed for the stream-status probes, and the single permission that would matter most if the webview were ever compromised. It is scoped: the commands the app runs are hardcoded status checks, not user input. But it is the entry in the file that deserves scrutiny on every review, and it is called out here so reviewers know where to look.

## The mobile and web surfaces

The mobile app is the simplest case: Expo Router views over the same `@dte/shared` data, no native modules beyond the defaults, and every external link routed through `Linking.openURL` after the same `isAllowedUrl` check. The landing page has no runtime privileges at all — it is static HTML/CSS/JS served from GitHub Pages, so its security surface is exactly the CSP-shaped reality of "there is no server": the page fetches nothing, stores nothing, and every link it renders was allowlisted at build time by construction (they all come from the `LINKS` constant).

Across all four surfaces the invariant is the same: **user input never becomes a URL, a shell command, or an IPC payload without passing a typed, shared guard first.** The guards are small, the lists are short, and the review surface for a security change is one diff in `@dte/shared` plus the one intentional mirror in the Electron main process.

## What this model does not cover

Honest boundaries: the allowlist protects *outbound* trust, not inbound payloads — when the live-stats API client in `@dte/core` gets a real backend, its responses will need their own validation story (the `safeParse` util is the seam for that). CodeQL (`codeql.yml`) scans the JS/TS and Rust sources on every push and weekly, which catches known vulnerability classes in the dependency tree, but it is a net, not a wall. And the auto-update story for the desktop apps is still manual download-for-now — signed updates would bring key management into scope, at which point this page grows a section.
