# GOVERNANCE — How Decisions Get Made 🏛️

## Project Philosophy

**Demon Time Exotics** is a brand-owned open-source project: the code is open
(MIT), but the brand is not a democracy. The owner sets creative direction;
the community shapes everything technical around it. **No scripts. No
filters. Just facts** — and clear decision rules.

## Roles

| Role | Who | What they do |
|---|---|---|
| **Owner (BDFL)** | DTE Bigmoney | Final say on brand, direction, releases, and any disputed call |
| **Maintainers** | listed in [MAINTAINERS.md](MAINTAINERS.md) | Review/merge, triage, CI health, day-to-day decisions |
| **Contributors** | anyone with a merged PR | Code, docs, design, translations |
| **Community** | everyone | Discussions, ideas, bug reports, feature requests |

## Decision Types

| Type | Examples | Decided by |
|---|---|---|
| **Trivial** | typos, refactors, bug fixes matching an issue | any maintainer, normal PR |
| **Standard** | features scoped to one app, dep bumps | maintainer consensus (lazy) |
| **Significant** | new app/package, breaking API change, CI overhaul | RFC in Discussions → owner approval |
| **Brand** | links, stats, imagery, tone, monetization | **owner only** |

## Process

### 1. Trivial & Standard changes
Straight to PR per [CONTRIBUTING.md](CONTRIBUTING.md). A maintainer reviews
and merges. If two maintainers disagree, it escalates to Significant.

### 2. Significant changes
1. Open a **proposal** in [GitHub Discussions](../../discussions) with:
   problem, solution, alternatives, blast radius (which apps/packages)
2. **7-day comment window** minimum
3. Maintainers weigh in; community voice is heard
4. **Owner decides** — approves, modifies, or rejects (with reasoning)
5. Approved proposals become ADRs ([ADR.md](ADR.md)) when architectural

### 3. Brand changes
Any change to `packages/core` canonical data or `packages/assets` brand
imagery requires **owner sign-off** in the PR — even from maintainers.

### 4. Security
Follows [SECURITY.md](SECURITY.md) exclusively — never public debate.
Owner coordinates fixes and disclosure.

## Voting (when actually needed)

Maintainer votes are **lazy consensus** by default: a proposal on the table
for 7 days with no objection passes. If contested:

- Formal vote among maintainers, 72-hour window
- Simple majority of maintainers decides
- **Owner veto** is absolute (and owner vote counts as the tiebreaker)
- Vote outcomes recorded in the relevant Discussion or ADR

## Release Authority

Releases are cut by the owner (see [DEPLOYMENT.md](DEPLOYMENT.md)). A
maintainer may prepare a release PR, but tagging/publishing is owner-only
because releases ship brand assets to the public.

## Conflict Resolution

1. Disagreement stays **in the thread** (public, on-topic, per the
   [Code of Conduct](CODE_OF_CONDUCT.md))
2. If unresolved after 48h, a maintainer flags it to the owner
3. Owner ruling is final — documented in-thread
4. Behavioral issues go straight to the CoC enforcement process

## Succession

This project exists to serve the DTE brand. If the owner steps away:

- **Short-term absence:** maintainers keep `main` green; releases pause
- **Permanent:** ownership transfer is the owner's call, recorded in the repo
  (final commit + updated MAINTAINERS/GOVERNANCE)

## Changes to Governance

This document is a **Significant** change category — propose via Discussions.

---

Related: [MAINTAINERS.md](MAINTAINERS.md) • [CONTRIBUTING.md](CONTRIBUTING.md) • [ADR.md](ADR.md) • [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
