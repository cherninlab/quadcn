import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	format: ["esm", "cjs"],
	dts: {
		resolve: true,
		compilerOptions: {
			jsx: "react-jsx",
			jsxImportSource: "react",
			moduleResolution: "node",
			allowSyntheticDefaultImports: true,
		},
	},
	clean: true,
	external: ["react", "react-dom", "@quadcn/core"],
	sourcemap: true,
	minify: false,
	treeshake: true,
	splitting: true,
	esbuildOptions(options) {
		options.jsx = "automatic";
	},
});
