import * as fs from "node:fs";
import * as path from "node:path";
import { GRID_UNIT } from "../constants";
import { darkTheme } from "../themes/dark";
import { lightTheme } from "../themes/light";
import { borderWidths, radii } from "../tokens/borders";
import { breakpoints, containers } from "../tokens/breakpoints";
import { heights } from "../tokens/components";
import { scales } from "../tokens/scales";
import { spacing } from "../tokens/spacing";
import { fontSizes, fontWeights, lineHeights } from "../tokens/typography";

/**
 * Generate CSS variables for the design system
 * @returns CSS string with all variables
 */
export function generateCSSVariables(): string {
  let css = `:root {\n`;

  // Grid unit - the foundation
  css += `  --quad-grid: ${GRID_UNIT}px;\n\n`;

  // Scale tokens
  css += `  /* Scale tokens (multiples of 4px) */\n`;
  Object.entries(scales).forEach(([key, value]) => {
    css += `  --quad-scale-${key}: ${value}px;\n`;
  });

  // Spacing tokens
  css += `\n  /* Spacing tokens */\n`;
  Object.entries(spacing).forEach(([key, value]) => {
    css += `  --quad-space-${key}: ${value}px;\n`;
  });

  // Typography
  css += `\n  /* Typography - font sizes */\n`;
  Object.entries(fontSizes).forEach(([key, value]) => {
    css += `  --quad-font-${key}: ${value}px;\n`;
  });

  css += `\n  /* Typography - line heights (all multiples of 4px) */\n`;
  Object.entries(lineHeights).forEach(([key, value]) => {
    css += `  --quad-line-${key}: ${value}px;\n`;
  });

  css += `\n  /* Typography - font weights */\n`;
  Object.entries(fontWeights).forEach(([key, value]) => {
    css += `  --quad-weight-${key}: ${value};\n`;
  });

  // Borders
  css += `\n  /* Border properties */\n`;
  Object.entries(borderWidths).forEach(([key, value]) => {
    css += `  --quad-border-${key}: ${value}px;\n`;
  });

  Object.entries(radii).forEach(([key, value]) => {
    css += `  --quad-radius-${key}: ${
      typeof value === "number" ? `${value}px` : value
    };\n`;
  });

  // Component heights
  css += `\n  /* Component heights (all multiples of 4px) */\n`;
  Object.entries(heights).forEach(([key, value]) => {
    css += `  --quad-height-${key}: ${value}px;\n`;
  });

  // Breakpoints
  css += `\n  /* Breakpoints */\n`;
  Object.entries(breakpoints).forEach(([key, value]) => {
    css += `  --quad-breakpoint-${key}: ${value}px;\n`;
  });

  // Container widths
  css += `\n  /* Container widths */\n`;
  Object.entries(containers).forEach(([key, value]) => {
    css += `  --quad-container-${key}: ${value}px;\n`;
  });

  // Light theme colors (default)
  css += generateThemeVariables(lightTheme);

  css += `}\n\n`;

  // Dark theme colors (in media query)
  css += `@media (prefers-color-scheme: dark) {\n`;
  css += `  :root {\n`;
  css += generateThemeColorVariables(darkTheme);
  css += `  }\n`;
  css += `}\n\n`;

  // Dark theme class (for manual switching)
  css += `.quad-dark {\n`;
  css += generateThemeColorVariables(darkTheme);
  css += `}\n`;

  return css;
}

/**
 * Generate theme-specific CSS variables
 */
function generateThemeVariables(theme: any): string {
  return (
    `\n  /* Theme colors - ${theme.name} */\n` +
    generateThemeColorVariables(theme)
  );
}

/**
 * Generate just the color variables for a theme
 */
function generateThemeColorVariables(theme: any): string {
  let css = "";

  // Flatten the theme colors for CSS variables
  const flattenColors = (obj: any, prefix = "") => {
    for (const [key, value] of Object.entries(obj)) {
      const propName = prefix ? `${prefix}-${key}` : key;

      if (value && typeof value === "object") {
        flattenColors(value, propName);
      } else {
        css += `  --quad-${propName}: ${value};\n`;
      }
    }
  };

  flattenColors(theme.colors);

  return css;
}

/**
 * Generate utility classes
 * @returns CSS string with utility classes
 */
export function generateUtilityClasses(): string {
  let css = "/* QuadCN Utility Classes */\n\n";

  // Spacing utilities
  css += `/* Spacing utilities */\n`;

  // Margin utilities
  Object.entries(spacing).forEach(([key, value]) => {
    css += `.m-${key} { margin: ${value}px; }\n`;
    css += `.mt-${key} { margin-top: ${value}px; }\n`;
    css += `.mr-${key} { margin-right: ${value}px; }\n`;
    css += `.mb-${key} { margin-bottom: ${value}px; }\n`;
    css += `.ml-${key} { margin-left: ${value}px; }\n`;
    css += `.mx-${key} { margin-left: ${value}px; margin-right: ${value}px; }\n`;
    css += `.my-${key} { margin-top: ${value}px; margin-bottom: ${value}px; }\n`;
  });

  // Padding utilities
  Object.entries(spacing).forEach(([key, value]) => {
    css += `.p-${key} { padding: ${value}px; }\n`;
    css += `.pt-${key} { padding-top: ${value}px; }\n`;
    css += `.pr-${key} { padding-right: ${value}px; }\n`;
    css += `.pb-${key} { padding-bottom: ${value}px; }\n`;
    css += `.pl-${key} { padding-left: ${value}px; }\n`;
    css += `.px-${key} { padding-left: ${value}px; padding-right: ${value}px; }\n`;
    css += `.py-${key} { padding-top: ${value}px; padding-bottom: ${value}px; }\n`;
  });

  // Gap utilities
  Object.entries(spacing).forEach(([key, value]) => {
    css += `.gap-${key} { gap: ${value}px; }\n`;
  });

  // Typography utilities
  css += `\n/* Typography utilities */\n`;
  Object.entries(fontSizes).forEach(([key, value]) => {
    const lineHeight = lineHeights[key as keyof typeof lineHeights] || "normal";
    css += `.text-${key} { font-size: ${value}px; line-height: ${lineHeight}px; }\n`;
  });

  // Font weight utilities
  Object.entries(fontWeights).forEach(([key, value]) => {
    css += `.font-${key} { font-weight: ${value}; }\n`;
  });

  // Comprehensive flex utilities
  css += `\n/* Flex utilities */\n`;
  css += `.flex { display: flex; }\n`;
  css += `.inline-flex { display: inline-flex; }\n`;
  css += `.flex-col { flex-direction: column; }\n`;
  css += `.flex-row { flex-direction: row; }\n`;
  css += `.flex-wrap { flex-wrap: wrap; }\n`;
  css += `.items-start { align-items: flex-start; }\n`;
  css += `.items-center { align-items: center; }\n`;
  css += `.items-end { align-items: flex-end; }\n`;
  css += `.justify-start { justify-content: flex-start; }\n`;
  css += `.justify-center { justify-content: center; }\n`;
  css += `.justify-end { justify-content: flex-end; }\n`;
  css += `.justify-between { justify-content: space-between; }\n`;
  css += `.justify-around { justify-content: space-around; }\n`;

  // Grid utilities
  css += `\n/* Grid utilities */\n`;
  css += `.grid { display: grid; }\n`;
  css += `.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }\n`;
  css += `.grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }\n`;
  css += `.grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }\n`;
  css += `.grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }\n`;
  css += `.grid-cols-6 { grid-template-columns: repeat(6, minmax(0, 1fr)); }\n`;
  css += `.grid-cols-12 { grid-template-columns: repeat(12, minmax(0, 1fr)); }\n`;

  // Color utilities (background)
  css += `\n/* Background color utilities */\n`;
  css += `.bg-base { background-color: var(--quad-bg-base); }\n`;
  css += `.bg-subtle { background-color: var(--quad-bg-subtle); }\n`;
  css += `.bg-sunken { background-color: var(--quad-bg-sunken); }\n`;
  css += `.bg-elevated { background-color: var(--quad-bg-elevated); }\n`;
  css += `.bg-accent { background-color: var(--quad-accent-default); }\n`;

  // Color utilities (text)
  css += `\n/* Text color utilities */\n`;
  css += `.text-primary { color: var(--quad-text-primary); }\n`;
  css += `.text-secondary { color: var(--quad-text-secondary); }\n`;
  css += `.text-tertiary { color: var(--quad-text-tertiary); }\n`;
  css += `.text-disabled { color: var(--quad-text-disabled); }\n`;
  css += `.text-inverse { color: var(--quad-text-inverse); }\n`;
  css += `.text-accent { color: var(--quad-accent-default); }\n`;

  // Border utilities
  css += `\n/* Border utilities */\n`;
  css += `.rounded-none { border-radius: var(--quad-radius-none); }\n`;
  css += `.rounded-sm { border-radius: var(--quad-radius-sm); }\n`;
  css += `.rounded-md { border-radius: var(--quad-radius-md); }\n`;
  css += `.rounded-lg { border-radius: var(--quad-radius-lg); }\n`;
  css += `.rounded-xl { border-radius: var(--quad-radius-xl); }\n`;
  css += `.rounded-full { border-radius: var(--quad-radius-full); }\n`;

  // Container class
  css += `\n/* Container */\n`;
  css += `.container { width: 100%; margin-left: auto; margin-right: auto; padding-left: var(--quad-space-4); padding-right: var(--quad-space-4); }\n`;

  Object.entries(containers).forEach(([key, value]) => {
    css += `@media (min-width: ${breakpoints[key as keyof typeof breakpoints]}px) { .container { max-width: ${value}px; } }\n`;
  });

  // Responsive utilities
  Object.entries(breakpoints).forEach(([key, value]) => {
    css += `\n@media (min-width: ${value}px) {\n`;
    // Display utilities
    css += `  .${key}\\:block { display: block !important; }\n`;
    css += `  .${key}\\:flex { display: flex !important; }\n`;
    css += `  .${key}\\:grid { display: grid !important; }\n`;
    css += `  .${key}\\:hidden { display: none !important; }\n`;

    // Grid columns
    css += `  .${key}\\:grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }\n`;
    css += `  .${key}\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }\n`;
    css += `  .${key}\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }\n`;
    css += `  .${key}\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }\n`;

    // Flex direction
    css += `  .${key}\\:flex-row { flex-direction: row !important; }\n`;
    css += `  .${key}\\:flex-col { flex-direction: column !important; }\n`;

    css += `}\n`;
  });

  return css;
}

/**
 * Generate all CSS files for the design system
 * This is called by the build script
 */
export function generateCSSFiles(outputDir: string): void {
  // Ensure the output directory exists
  fs.mkdirSync(outputDir, { recursive: true });

  // Generate variables.css
  const variablesCss = generateCSSVariables();
  fs.writeFileSync(path.join(outputDir, "variables.css"), variablesCss);

  // Generate utility classes
  const utilitiesCss = generateUtilityClasses();
  fs.writeFileSync(path.join(outputDir, "utilities.css"), utilitiesCss);

  // Copy reset.css
  const resetCssPath = path.resolve(__dirname, "../css/reset.css");
  if (fs.existsSync(resetCssPath)) {
    fs.copyFileSync(resetCssPath, path.join(outputDir, "reset.css"));
  }

  // Create index.css that imports everything
  const indexCss = `@import "./reset.css";\n@import "./variables.css";\n@import "./utilities.css";\n`;
  fs.writeFileSync(path.join(outputDir, "index.css"), indexCss);

  console.log("CSS files generated in", outputDir);
}
