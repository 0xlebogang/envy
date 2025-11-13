import { uiConfig } from "@repo/vitest-config";
import { defineConfig, mergeConfig } from "vitest/config";

export default mergeConfig(
	uiConfig,
	defineConfig({
		test: {
			name: "@repo/ui",
			environment: "jsdom",
			exclude: ["shadcn/**"],
		},
	}),
);
