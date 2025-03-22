import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "tsup";
import { generateCSSVariables } from "./src/css/generator";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  minify: true,
  treeshake: true,
  onSuccess: async () => {
    // Create output directory for CSS files
    const cssOutDir = path.resolve("dist/css");
    if (!fs.existsSync(cssOutDir)) {
      fs.mkdirSync(cssOutDir, { recursive: true });
    }

    // Copy reset.css
    const resetCssPath = path.resolve("src/css/reset.css");
    fs.copyFileSync(resetCssPath, path.join(cssOutDir, "reset.css"));

    // Generate variables.css
    const variablesCss = generateCSSVariables();
    fs.writeFileSync(path.join(cssOutDir, "variables.css"), variablesCss);

    // Create CSS index file
    const indexCss = `@import "./reset.css";\n@import "./variables.css";\n`;
    fs.writeFileSync(path.join(cssOutDir, "index.css"), indexCss);

    console.log("CSS files generated successfully.");
  },
});
