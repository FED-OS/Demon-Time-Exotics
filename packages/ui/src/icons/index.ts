/**
 * @dte/ui — icons.
 *
 * The DTE icon set. Channel-emoji glyphs (framework-free, zero-dep)
 * with named exports so surfaces can reference icons semantically
 * instead of pasting emoji strings around the codebase.
 */

/** Semantic icon names used across surfaces. */
export type IconName =
  | "fire"
  | "demon"
  | "subscribe"
  | "bell"
  | "member"
  | "merch"
  | "play"
  | "clips"
  | "camera"
  | "twitch"
  | "email"
  | "github"
  | "external"
  | "rocket"
  | "star"
  | "boxing"
  | "mic"
  | "money";

/** The glyph map (channel-emoji visual language). */
export const ICONS: Record<IconName, string> = {
  fire: "🔥",
  demon: "😈",
  subscribe: "✅",
  bell: "🔔",
  member: "💜",
  merch: "👕",
  play: "▶",
  clips: "✂",
  camera: "📸",
  twitch: "🎮",
  email: "✉",
  github: "🐙",
  external: "↗",
  rocket: "🚀",
  star: "⭐",
  boxing: "🥊",
  mic: "🎙",
  money: "💸"
};

/** Get a glyph by semantic name. */
export function icon(name: IconName): string {
  return ICONS[name];
}

/** Icon + label pair (buttons, nav items, hub cards). */
export function iconLabel(name: IconName, label: string): { icon: string; label: string } {
  return { icon: ICONS[name], label };
}

/** All icons as entries (debug/picker UIs). */
export function iconEntries(): Array<{ name: IconName; glyph: string }> {
  return Object.entries(ICONS).map(([name, glyph]) => ({ name: name as IconName, glyph }));
}
