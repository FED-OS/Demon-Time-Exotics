# @dte/config-tailwind

Shared [Tailwind CSS preset](https://tailwindcss.com/docs/presets) carrying the full **Demon Time Exotics** brand system: the fire/inferno/purple/gold palette, Bebas Neue + Inter font stacks, ember shadows and the flicker/reveal/ember-drift animations.

## Usage

```ts
// tailwind.config.ts (any workspace)
import dte from "@dte/config-tailwind";
import type { Config } from "tailwindcss";

export default {
  presets: [dte],
  content: ["./index.html", "./src/**/*.{ts,tsx}"]
} satisfies Config;
```

Named exports are also available when you want just the tokens:

```ts
import { dteColors, dteFonts, dteShadows } from "@dte/config-tailwind";
```

## Tokens

| Token | Value |
| --- | --- |
| `fire` | `#ff5e1a` |
| `inferno` | `#ff2e00` |
| `purple` | `#8b2fd6` |
| `gold` | `#f5a623` |
| `ember` | `#ffb98a` |
| `ink` / `ink-soft` | `#050505` / `#0d0d0d` |
| `paper` / `muted` | `#f4f4f5` / `#a3a3ab` |

> The landing site currently ships framework-free vanilla CSS (ADR-0007); this preset exists so new pages or the desktop frontends can opt into Tailwind without re-inventing the palette. `apps/landing/tailwind.config.ts` mirrors these tokens locally for contributors who enable Tailwind there.
