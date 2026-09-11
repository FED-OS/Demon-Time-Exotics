/**
 * @dte/core — content service.
 *
 * Wraps TOP_VIDEOS from @dte/shared: sorting, search-links and pillar
 * tagging for the top-content sections across apps.
 */

import { CHANNEL, TOP_VIDEOS, parseCompactViews, topByViews, type TopVideo } from "@dte/shared";
import { matchPillar } from "./pillars.js";
import type { PillarEntry } from "./pillars.js";

export interface ContentCard extends TopVideo {
  id: string;
  rank: number;
  viewsCount: number;
  searchUrl: string;
  pillar?: PillarEntry;
}

/** YouTube search URL for a title (no video ids in the channel study). */
export function searchUrlFor(title: string): string {
  const query = encodeURIComponent(`${CHANNEL.name} ${title}`);
  return `https://www.youtube.com/results?search_query=${query}`;
}

/** Top content ranked by parsed views. */
export function topContent(count?: number): ContentCard[] {
  const ranked = topByViews(TOP_VIDEOS, count ?? TOP_VIDEOS.length);
  return ranked.map((video, index) => {
    const viewsCount = parseCompactViews(video.views);
    return {
      ...video,
      id: `${index + 1}`,
      rank: index + 1,
      viewsCount,
      searchUrl: searchUrlFor(video.title),
      pillar: matchPillar(video.title)
    };
  });
}

/** The single best performer (hero-adjacent feature). */
export function featuredContent(): ContentCard {
  const [first] = topContent(1);
  return first;
}

/** Content filtered by a figure name (roster drill-down). */
export function contentByFigure(figureName: string): ContentCard[] {
  const needle = figureName.toLowerCase();
  return topContent().filter((card) => card.title.toLowerCase().includes(needle) || card.category.toLowerCase().includes(needle));
}

/** Total views across the listed top videos. */
export function topContentTotalViews(): number {
  return topContent().reduce((sum, card) => sum + card.viewsCount, 0);
}
