# Discussions categories — descriptions & rationale

The five categories below are what GitHub's Discussions settings get, word for word. They're mirrored in `.github/DISCUSSION_WELCOME_README.md` (the pinned welcome new posters see) and seeded with first posts from this folder. Any change here is a PR that touches all three places at once — the category description, the welcome README's table, and the seeded post if the change alters what the category is *for*.

## 🗣️ General — "Everything DTE — site, apps, the movement"

**Description (paste into GitHub):** Everything Demon Time Exotics that doesn't fit a tighter category — repo news, brand moves, tap-in talk, and whatever the community is chewing on. The tap-in thread lives here.

**Why this shape:** Every forum needs a lobby, and the mistake is usually making the lobby do everything — bug reports in General, security speculation in General, feature requests in General — until the other categories starve. The description's job is to be *attractive but bounded*: everything community-flavored is welcome, and the boundaries are stated as pointers, not walls. A bug posted in General gets a friendly redirect to Issues; it doesn't get answered in place, because an answered bug in General is a bug the tracker lost.

**Boundary vs. Issues:** anything reproducible is a bug and belongs in Issues with the bug-report template; General is for the talk *around* the repo, not the state of it.

## 💡 Ideas — "Feature proposals too rough for a formal Feature Request"

**Description (paste into GitHub):** Feature ideas in any state of roughness. Half-thoughts welcome — this is where they get refined into something filable. The maintainers read everything; the good ones graduate to Feature Requests and the roadmap.

**Why this shape:** The Feature Request template (`.github/ISSUE_TEMPLATE/feature_request.md`) demands a problem statement, a proposed solution, and alternatives — which is the right bar for issues but the wrong bar for a person who had a shower thought about the mobile app. Ideas is deliberately lower-friction: post the spark, the community fans it or doesn't, and the survivors get rewritten into the template. The category description says exactly that so nobody feels their rough idea was posted wrong.

**Boundary vs. Issues:** an Idea graduates to a Feature Request when it has a problem statement and a shape — the seed post in [first-idea.md](first-idea.md) demonstrates the graduation in miniature.

## 🙏 Q&A — "Questions about running, building, or forking the repo"

**Description (paste into GitHub):** Questions about running, building, or forking this monorepo — check [FAQ.md](https://github.com/DTEMONEY448/demon-time-exotics/blob/main/FAQ.md) and the wiki first, and if the answer isn't there, ask here with your environment details. Accepted answers get folded back into the docs.

**Why this shape:** Q&A categories work when two things are true: the format makes answers easy to write, and the good answers don't evaporate. The first is why the seed post models the environment block and the exact error; the second is the last sentence of the description — accepted answers are doc candidates, which is also the reward loop for answering well. The pointer to FAQ.md and the wiki keeps the category from becoming the docs' echo chamber.

**Boundary vs. Issues:** a question is a question; if the answer reveals a reproducible defect, the thread's ending is "that's a bug — file it with the template," and the issue link goes back into the thread.

## 🙌 Show and tell — "You forked it for your own channel? YOU BUILT SOMETHING? Show us."

**Description (paste into GitHub):** Forks, derivatives, ports, and builds on top of this repo — show them off, link them, and tell the story. This is what the repo is FOR. Attribution and the license (see LICENSE and NOTICE) apply; everything else, bring it.

**Why this shape:** This category is the point of the whole open-source posture: the brand built a platform, and the platform is more valuable when other creators run on it. The all-caps energy in the description is deliberate — it's the one category where the description itself is doing marketing, because the behavior it invites (showing your fork) is the behavior the repo most wants. The license pointer is the one rule that isn't energy: it's the line between "show us your fork" and "show us your fork without the NOTICE file," and it's stated gently because the license is permissive.

**Boundary:** none against other categories — anything built from this repo belongs here, even if it's also an Idea or spawned a bug report upstream.

## 😈 Polls — "Community votes — which app next, which feature first"

**Description (paste into GitHub):** Community votes on real decisions — which app gets attention next, which feature ships first, which surface needs love. Polls that inform actual decisions, not vibes checks. The owner chimes in on brand calls.

**Why this shape:** Polls rot when they measure nothing — a "which feature next?" poll whose winner is ignored teaches the community that voting is theater. The description commits to the opposite: polls here inform decisions, and the results are cited when the decision is announced. The owner line is honest about the boundary the repo already documents in GOVERNANCE.md — community input steers, the owner drives brand decisions — so a poll is never a promise the structure can't keep.

**Boundary:** brand-defining decisions (name, tone, platform strategy) get community input and owner decisions, and the poll description says so up front rather than pretending otherwise.
