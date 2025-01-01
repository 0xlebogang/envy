import { config as baseConfig } from "@envyper/eslint-config/base";

export default [
  ...baseConfig,
  { ignores: ["node_modules/", "dist/"] },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
