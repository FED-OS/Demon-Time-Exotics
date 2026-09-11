# Security Policy 🔒

## Supported Versions

| Version | Supported | Notes |
|---|---|---|
| 1.0.x | ✅ | Current release line |
| < 1.0 | ❌ | Pre-release prototypes, not supported |

## Reporting a Vulnerability

**Do NOT open a public issue for security vulnerabilities.**

The Demon Time Exotics project takes security seriously. If you discover a
security vulnerability, please report it responsibly:

### How to Report

1. **Email:** Bigmoney@demontimeexotics.com
2. **Subject:** `[SECURITY] <brief description>`
3. **Include:**
   - Type of vulnerability (XSS, RCE, IDOR, etc.)
   - Affected app (`landing`, `tauri`, `electron`, `mobile`)
   - Step-by-step reproduction instructions
   - Potential impact assessment
   - Possible remediation suggestions (optional but appreciated)

### What to Expect

| Stage | Timeframe |
|---|---|
| Acknowledgment of report | 48 hours |
| Initial assessment | 5 business days |
| Fix development | depends on severity |
| Public disclosure | after fix release, coordinated with reporter |

### Scope

**In scope:**
- All apps in this repository (`apps/*`)
- Shared packages as used in production builds (`packages/*`)
- GitHub Actions workflows (`.github/workflows/*`)
- Dependency vulnerabilities in lockfile

**Out of scope:**
- Social media accounts (YouTube, Instagram, Twitch) — report via those platforms
- The shopdemontimeexotics.com storefront — separate system
- Volumetric attacks / DDoS
- Automated scanner reports without a demonstrated impact
- Issues in dependencies that don't affect our apps

## Hardening Notes

- Dependencies are pinned via `pnpm-lock.yaml` — do not commit `--no-lockfile` changes
- GitHub Actions use pinned permissions (`permissions: contents: read`) wherever possible
- Electron app follows the [Electron security checklist](https://electronjs.org/docs/latest/tutorial/security): context isolation on, node integration off, no remote module
- Tauri app follows least-privilege capabilities — see `apps/tauri/src-tauri/capabilities/default.json`
- No secrets in the repo — all signing keys live in GitHub Actions secrets
- `.gitignore` excludes `.env*` files — use `.env.example` for templates

## Dependency Updates

Automated dependency checks run via `pnpm audit`. Dependabot monitors this
repository and opens version-bump PRs; maintainers review and merge them
within one week for `patch` and `minor` updates.

---

Thank you for keeping **The Messy Show** secure. 💪🏾😈🔒
