# Seeded thread: first idea (Ideas)

> Paste as the first post in **Ideas** when Discussions is enabled. Its job is to model the category's contract: rough is fine, refinement is the process, and graduation to a Feature Request happens when the idea has a problem statement and a shape. This file is the source of truth for its wording.

Title: **💡 Idea demo: a "messy meter" on the roster chips**

Rough idea, posted rough on purpose — this category exists so a half-thought can get refined before it pretends to be a spec.

**The spark:** every roster figure on the landing site gets a chip — name, tag, icon, group. What if the chip also carried a one-glance "messy meter": how much drama that figure generated recently, fed by the same `@dte/shared` data spine as everything else, so it updates everywhere at once?

**The problem it would solve:** right now the roster is flat — every figure reads equally "covered." But the channel's whole editorial energy is that some people are *in* the mess and some people are *adjacent* to it, and the landing page can't tell that story today. A messy meter would make the roster page feel like the channel sounds: hierarchy, heat, who's hot right now.

**The obvious hard parts, stated honestly:** "recently" needs a definition — messy this week? this month? — and whatever we pick has to live in `@dte/shared` as data, not as per-surface opinions, or ADR-0005's one-edit-heals-everything story breaks. The meter itself needs to be one emoji or a tiny bar, not a dashboard widget, or the chip stops being a chip. And "how much drama" is a judgment call the channel makes editorially — the repo would carry the number, the channel decides it, which means the meter lands with whatever data-entry ritual the channel already does for roster updates.

**What graduation would look like:** if the community and the owner like the direction, the next step is a Feature Request with the problem statement sharpened ("the roster reads flat; heat is the channel's product and the site can't show it"), the data shape proposed (`RosterFigure` grows a `heat` field, raw integer, display form computed like every other stat), and the alternatives named (a separate "hot right now" section vs. annotating the chips; computed from video categories vs. editorially assigned). None of that is written yet — that's the point of posting here first.

**How to reply:** push on the hard parts, not the polish. "Heat needs a time window" is useful; "the meter should be a bar not a dot" is a detail for after the idea graduates. If you've got a different take on the same problem — the roster reads flat — post that too; a rival idea beating this one in refinement is the category working exactly as designed.
