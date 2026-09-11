/**
 * @dte/core — content pillars service.
 *
 * Wraps PILLARS from @dte/shared: adds slugs and matching logic used
 * by the pillars grid and the search/browse affordances.
 */

import { PILLARS, slugId, type Pillar } from "@dte/shared";

export interface PillarEntry extends Pillar {
  id: string;
}

/** All pillars with stable ids. */
export function allPillars(): PillarEntry[] {
  return PILLARS.map((pillar) => ({ ...pillar, id: slugId(pillar.title) }));
}

/** Find a pillar by slug id. */
export function findPillar(id: string): PillarEntry | undefined {
  return allPillars().find((pillar) => pillar.id === id);
}

/**
 * Match a video title against pillars (keyword scoring). Used to tag
 * top-content cards with the pillar they belong to.
 */
const PILLAR_KEYWORDS: Record<string, string[]> = {
  "hip-hop-news-drama": ["beef", "drama", "feud", "cut off", "chased", "revenge", "breakdown"],
  "no-jumper-chaos": ["no jumper", "adam22", "wack 100", "wack100"],
  "podcast-beef": ["podcast", "call", "ended", "silence"],
  "street-politics": ["compton", "south central", "bang", "rampage", "street"],
  "industry-exposes": ["caught", "expos", "backdoor", "snitch", "don't want you to see", "don’t want you to see"],
  "live-coverage": ["live", "stream", "reaction"]
};

export function matchPillar(videoTitle: string): PillarEntry | undefined {
  const title = videoTitle.toLowerCase();
  let best: { pillar: PillarEntry; score: number } | undefined;
  for (const pillar of allPillars()) {
    const keywords = PILLAR_KEYWORDS[pillar.id] ?? [];
    const score = keywords.reduce((acc, kw) => acc + (title.includes(kw) ? 1 : 0), 0);
    if (score > 0 && (!best || score > best.score)) best = { pillar, score };
  }
  return best?.pillar;
}
