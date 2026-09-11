/**
 * @dte/core — figures (roster) service.
 *
 * Wraps the ROSTER constant from @dte/shared with lookup and grouping
 * logic used by the roster grids (landing + desktop + mobile).
 */

import { ROSTER, slugId, type RosterFigure } from "@dte/shared";

export type RosterGroup = "boxing" | "viral" | "music" | "media" | "street";

/** Groups the covered figures fall into (display order). */
const GROUP_ORDER: RosterGroup[] = ["boxing", "viral", "music", "media", "street"];

/** Which group a figure belongs to (by name/tag keywords). */
export function groupOf(figure: RosterFigure): RosterGroup {
  const text = `${figure.name} ${figure.tag}`.toLowerCase();
  if (text.includes("boxer") || text.includes("champion")) return "boxing";
  if (text.includes("viral")) return "viral";
  if (
    text.includes("rapper") ||
    text.includes("singer") ||
    text.includes("west coast") ||
    text.includes("houston")
  ) {
    return "music";
  }
  if (text.includes("podcast") || text.includes("manager") || text.includes("media") || text.includes("host")) {
    return "media";
  }
  return "street";
}

/** Full roster with group + stable slug ids. */
export interface Figure extends RosterFigure {
  id: string;
  group: RosterGroup;
}

export function allFigures(): Figure[] {
  return ROSTER.map((figure) => ({
    ...figure,
    id: slugId(figure.name),
    group: groupOf(figure)
  }));
}

/** Roster grouped by category (boxes the roster section renders). */
export function figuresByGroup(): Array<{ group: RosterGroup; label: string; figures: Figure[] }> {
  const buckets = new Map<RosterGroup, Figure[]>();
  for (const figure of allFigures()) {
    const bucket = buckets.get(figure.group) ?? [];
    bucket.push(figure);
    buckets.set(figure.group, bucket);
  }
  return GROUP_ORDER.map((group) => ({
    group,
    label: GROUP_LABELS[group],
    figures: buckets.get(group) ?? []
  })).filter((entry) => entry.figures.length > 0);
}

const GROUP_LABELS: Record<RosterGroup, string> = {
  boxing: "Boxing",
  viral: "Viral Stars",
  music: "Music",
  media: "Media & Podcasts",
  street: "Street Figures"
};

/** Find a figure by slug id. */
export function findFigure(id: string): Figure | undefined {
  return allFigures().find((figure) => figure.id === id);
}

/** Search roster by free text (name + tag). */
export function searchFigures(query: string): Figure[] {
  const q = query.trim().toLowerCase();
  if (q.length === 0) return allFigures();
  return allFigures().filter((figure) =>
    `${figure.name} ${figure.tag}`.toLowerCase().includes(q)
  );
}
