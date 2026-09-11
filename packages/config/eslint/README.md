# @dte/config-eslint

Shared [ESLint 9 flat config](https://eslint.org/docs/latest/use/configure/configuration-files) for every workspace in the **Demon Time Exotics** monorepo.

## Usage

Create `eslint.config.js` in any app/package:

```js
import dteEslint from "@dte/config-eslint";

export default dteEslint;
```

Or extend it with workspace-specific rules:

```js
import dteEslint from "@dte/config-eslint";

export default [
  ...dteEslint,
  {
    rules: {
      "no-console": "off" // scripts may log
    }
  }
];
```

## What's inside

Strict TypeScript-aware rules (`typescript-eslint` recommended), browser globals declared for the framework-free surfaces, `no-console` allowed for `warn`/`error`/`info` only, underscore-prefixed unused args ignored, and build directories (`dist/`, `src-tauri/target/`, `.expo/`, `.turbo/`) globally ignored.
