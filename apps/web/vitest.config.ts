import { uiConfig } from "@repo/vitest-config";
import { mergeConfig } from "vitest/config";

export default mergeConfig(uiConfig, {
	test: {
		setupFiles: ["./vitest.setup.ts"],
	},
});
