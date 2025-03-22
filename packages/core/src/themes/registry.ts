import type { BaseTheme } from "./base";
import { darkTheme } from "./dark";
import { lightTheme } from "./light";

// Initialize theme registry with default themes
const themeRegistry: Record<string, BaseTheme> = {
  light: lightTheme,
  dark: darkTheme,
};

/**
 * Register a new theme
 * @param name Theme name
 * @param theme Theme object
 */
export function registerTheme(name: string, theme: BaseTheme): void {
  themeRegistry[name] = theme;
}

/**
 * Get a theme by name
 * @param name Theme name
 * @returns Theme object or undefined if not found
 */
export function getTheme(name: string): BaseTheme | undefined {
  return themeRegistry[name];
}

/**
 * Get all registered themes
 * @returns Record of all themes
 */
export function getAllThemes(): Record<string, BaseTheme> {
  return { ...themeRegistry };
}
