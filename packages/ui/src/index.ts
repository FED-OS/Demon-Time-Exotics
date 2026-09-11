/**
 * @dte/ui — barrel export.
 *
 * The DTE brand UI kit: theme tokens, DOM primitives, semantic icons
 * and composed components. Surfaces import from here:
 *
 *   import { applyThemeVars, hubGrid, supportPanel } from "@dte/ui";
 *
 * Deep imports via package.json exports:
 *   @dte/ui/components, /primitives, /icons, /themes
 */

// Themes.
export {
  dteTheme,
  dteThemeHighContrast,
  THEME_CSS_VARS,
  applyThemeVars,
  themeVar
} from "./themes/index.js";

// Primitives.
export {
  button,
  badge,
  statBlock,
  card,
  iconBullet
} from "./primitives/index.js";
export type { ButtonVariant, ButtonSize } from "./primitives/index.js";

// Icons.
export { ICONS, icon, iconLabel, iconEntries } from "./icons/index.js";
export type { IconName } from "./icons/index.js";

// Components.
export {
  statsRow,
  hubGrid,
  rosterChips,
  pillarGrid,
  topContentList,
  supportPanel,
  heroCtas,
  fireTicker
} from "./components/index.js";
