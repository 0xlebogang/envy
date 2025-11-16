import { uiConfig } from "@repo/vitest-config";
import { defineConfig, mergeConfig } from "vitest/config";

export default mergeConfig(
	uiConfig,
	defineConfig({
		test: {
			exclude: [
				"**/node_modules/**",
				"node_modules",
				"**/.turbo/**",
				"src/__mocks__",
			],
			include: ["src/**/*.{test,spec}.{ts,tsx}"],
			setupFiles: ["./vitest.setup.ts"],
		},
	}),
);
