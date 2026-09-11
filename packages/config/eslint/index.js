/**
 * @dte/config-eslint — shared ESLint flat config.
 *
 * Usage in any workspace package:
 *
 *   // eslint.config.js
 *   import dteEslint from "@dte/config-eslint";
 *   export default dteEslint;
 *
 * Or extend it:
 *   import dteEslint from "@dte/config-eslint";
 *   export default [
 *     ...dteEslint,
 *     { rules: { "no-console": "off" } }
 *   ];
 */

import js from "@eslint/js";
import tseslint from "typescript-eslint";

/** The DTE base flat config (JS + TS, strict, browser/worker aware). */
const config = [
  {
    ignores: [
      "**/dist/**",
      "**/build/**",
      "**/out/**",
      "**/.turbo/**",
      "**/node_modules/**",
      "**/src-tauri/target/**",
      "**/.expo/**",
      "**/coverage/**"
    ]
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        fetch: "readonly",
        AbortController: "readonly",
        URL: "readonly",
        URLSearchParams: "readonly",
        requestAnimationFrame: "readonly",
        cancelAnimationFrame: "readonly",
        IntersectionObserver: "readonly",
        matchMedia: "readonly",
        localStorage: "readonly"
      }
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" }
      ],
      "@typescript-eslint/consistent-type-imports": ["warn", { fixStyle: "inline-type-imports" }],
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
      "prefer-const": "error",
      eqeqeq: ["error", "smart"],
      "no-var": "error"
    }
  },
  {
    files: ["**/*.mjs", "**/*.cjs", "**/scripts/**"],
    rules: {
      "no-console": "off"
    }
  }
];

export default config;
