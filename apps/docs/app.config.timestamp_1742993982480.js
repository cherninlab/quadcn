// app.config.ts
import mdx from "@mdx-js/rollup";
import { defineConfig } from "@tanstack/react-start/config";
import { resolve } from "path";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { cloudflare } from "unenv";
import tsConfigPaths from "vite-tsconfig-paths";
var app_config_default = defineConfig({
	tsr: {
		appDirectory: "src",
	},
	server: {
		preset: "cloudflare-pages",
		esbuild: { options: { supported: { "top-level-await": true } } },
		unenv: cloudflare,
		prerender: {
			routes: ["/"],
			crawlLinks: true,
		},
	},
	vite: {
		plugins: [
			tsConfigPaths({
				projects: ["./tsconfig.json"],
			}),
			mdx({
				providerImportSource: "@mdx-js/react",
				remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
			}),
		],
		resolve: {
			alias: {
				"@quadcn/core": resolve(__dirname, "../../packages/core/src"),
				"@quadcn/components": resolve(
					__dirname,
					"../../packages/components/src",
				),
			},
		},
	},
});
export { app_config_default as default };
