import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		environment: "jsdom",
	},
	resolve: {
		alias: {
			"@quadcn/core": resolve(__dirname, "../core/dist"),
		},
	},
});
