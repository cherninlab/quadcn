import { copyFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { defineConfig } from "tsup";
import { generateCSSVariables } from "./src/css/generator";

export default defineConfig({
	entry: ["src/index.ts"],
	format: ["esm", "cjs"],
	dts: true,
	clean: true,
	minify: false, // Changed from true to false for better debugging
	sourcemap: true, // Added source maps
	treeshake: true,
	onSuccess: () => {
		const cssOutDir = resolve("dist/css");
		if (!existsSync(cssOutDir)) {
			mkdirSync(cssOutDir, { recursive: true });
		}

		// Copy reset.css
		const resetCssPath = resolve("src/css/reset.css");
		copyFileSync(resetCssPath, join(cssOutDir, "reset.css"));

		// Generate variables.css
		const variablesCss = generateCSSVariables();
		writeFileSync(join(cssOutDir, "variables.css"), variablesCss);

		// Create CSS index file
		const indexCss = `@import "./reset.css";\n@import "./variables.css";\n`;
		writeFileSync(join(cssOutDir, "index.css"), indexCss);

		// Return promise to satisfy type requirement
		return Promise.resolve();
	},
});
