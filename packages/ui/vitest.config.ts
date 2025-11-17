import { uiConfig } from "@repo/vitest-config";
import { defineConfig, mergeConfig } from "vitest/config";

export default mergeConfig(
	uiConfig,
	defineConfig({
		test: {
			name: "@repo/ui",
			exclude: ["shadcn/**"],
			setupFiles: ["./vitest.setup.ts"],
		},
	}),
);
