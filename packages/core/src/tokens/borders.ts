import { GRID_UNIT } from "../constants";

/**
 * Border width tokens
 * Note: 1px and 2px are exceptions to the 4px grid
 * and require special handling with border compensation
 */
export const borderWidths = {
	none: 0,
	hairline: 1, // 1px (exception to 4px grid)
	thin: 2, // 2px (exception to 4px grid)
	thick: GRID_UNIT, // 4px (1 grid unit)
} as const;

export type BorderWidthToken = keyof typeof borderWidths;

/**
 * Border radius tokens (multiples of 4px)
 */
export const radii = {
	none: 0,
	sm: GRID_UNIT * 1, // 4px (1 grid unit)
	md: GRID_UNIT * 2, // 8px (2 grid units)
	lg: GRID_UNIT * 3, // 12px (3 grid units)
	xl: GRID_UNIT * 4, // 16px (4 grid units)
	full: "9999px", // Circle/pill
} as const;

export type RadiusToken = keyof typeof radii;
