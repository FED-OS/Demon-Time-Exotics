# discussion/ — Discussions templates & docs

This folder is the source of truth for the repo's **GitHub Discussions** hub — the category descriptions, the seeded threads that make an empty forum feel alive, and the templates that teach new posters the house format. The Discussions tab itself is GitHub-hosted; this folder is where its content is drafted, reviewed, and versioned before it's posted, so a category rename or a reworded welcome post goes through the same PR discipline as any code change.

The five categories, as configured in GitHub and documented in `.github/DISCUSSION_WELCOME_README.md`, are **General** (everything DTE), **Ideas** (feature proposals too rough for a formal Feature Request), **Q&A** (questions about running, building, or forking), **Show and tell** (your forks and derivatives — always welcome), and **Polls** (community votes). Each has a description file and a seeded first post in this folder, ready to paste when the Discussions tab is enabled.

## What's in here

**[categories.md](categories.md)** — the five category descriptions written for GitHub's category settings, plus the reasoning behind each category's shape and its boundaries against Issues (bugs) and SECURITY.md (security reports, never public).

**[welcome-thread.md](welcome-thread.md)** — the seeded General post: who this repo is for, how the hub works, and the tap-in energy that makes a first-time visitor post instead of lurking.

**[first-question.md](first-question.md)** — the seeded Q&A post, demonstrating the format the category rewards: environment block, what was tried, exact error, and a marked answer when it lands.

**[first-idea.md](first-idea.md)** — the seeded Ideas post, showing how a rough half-thought becomes a refinable proposal without pretending to be a spec.

**[first-show-and-tell.md](first-show-and-tell.md)** — the seeded Show and tell post, the category that exists because forks are what this repo is for.

**[first-poll.md](first-poll.md)** — the seeded Poll, demonstrating a vote that actually informs a decision rather than measuring vibes.

## How to use this folder

When Discussions is first enabled, post the seeds in order — welcome-thread first, then the category first-posts — so no category greets its first visitor empty. After that, this folder becomes the drafting desk: new pinned posts, category rewordings, and recurring thread formats get drafted here, reviewed like any PR, and then posted. The same rule as the wiki applies: if a thread's reality and this folder drift apart, the folder gets fixed in the same change, because a template that doesn't match reality is worse than no template at all.

One boundary worth repeating from the welcome README: bugs go to Issues with the bug-report template, security goes to SECURITY.md privately, and drama coverage belongs on the channel — the Discussions hub is for *this repository* and its community. The seeds below all model that boundary instead of just stating it.
