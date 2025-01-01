import * as base from "@envyper/eslint-config/base";

/** @type {import("eslint").Linter.Config} */
export default [
  ...base.config,
  {
    languageOptions: {
      ecmaVersion: 2020,
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
