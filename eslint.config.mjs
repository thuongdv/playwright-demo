// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,

  // Setup parser options
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // Ignore this config file itself
  {
    ignores: ["eslint.config.mjs"],
  },

  // Add import plugin and rules
  {
    plugins: {
      import: importPlugin,
    },
    settings: {
      "import/resolver": {
        typescript: {}, // Uses tsconfig.json for path resolution
      },
    },
    rules: {
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/explicit-function-return-type": "error",

      // Import ordering rules
      "import/order": [
        "error",
        {
          groups: [
            "builtin", // Node.js built-ins
            "external", // NPM packages
            "internal", // Aliased paths like "src/"
            ["parent", "sibling", "index"], // Relative paths
            "object", // import * as
            "type", // import type
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
);
