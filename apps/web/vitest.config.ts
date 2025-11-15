import { uiConfig } from "@repo/vitest-config";
import { defineConfig, mergeConfig } from "vitest/config";

export default mergeConfig(
	uiConfig,
	defineConfig({
		test: {
			exclude: ["src/__mocks__"],
			setupFiles: ["./vitest.setup.ts"],
		},
	}),
);
