import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineProject, mergeConfig } from "vitest/config";
import { baseConfig } from "./base-config.js";

export const uiConfig = mergeConfig(
	baseConfig,
	defineProject({
		plugins: [react(), tsconfigPaths()],
		test: {
			environment: "jsdom",
		},
	}),
);
