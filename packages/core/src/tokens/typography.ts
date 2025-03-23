import { GRID_UNIT } from "../constants";

/**
 * Font size tokens
 * Note: Not all font sizes need to be multiples of 4px,
 * but line heights MUST be multiples of 4px
 */
export const fontSizes = {
	xs: 12, // 12px
	sm: 14, // 14px (exception to 4px grid)
	md: 16, // 16px
	lg: 20, // 20px
	xl: 24, // 24px
	"2xl": 32, // 32px
	"3xl": 40, // 40px
	"4xl": 48, // 48px
	"5xl": 64, // 64px
} as const;

export type FontSizeToken = keyof typeof fontSizes;

/**
 * Line height tokens (all MUST be multiples of 4px)
 * This ensures text aligns to the vertical rhythm of the grid
 */
export const lineHeights = {
	xs: 16, // 16px (4 grid units)
	sm: 20, // 20px (5 grid units)
	md: 24, // 24px (6 grid units)
	lg: 28, // 28px (7 grid units)
	xl: 32, // 32px (8 grid units)
	"2xl": 40, // 40px (10 grid units)
	"3xl": 48, // 48px (12 grid units)
	"4xl": 56, // 56px (14 grid units)
	"5xl": 72, // 72px (18 grid units)
} as const;

export type LineHeightToken = keyof typeof lineHeights;

/**
 * Font weights for text elements
 */
export const fontWeights = {
	thin: 100,
	extralight: 200,
	light: 300,
	normal: 400,
	medium: 500,
	semibold: 600,
	bold: 700,
	extrabold: 800,
	black: 900,
} as const;

export type FontWeightToken = keyof typeof fontWeights;

/**
 * Get grid-aligned line height for a font size
 * @param fontSize Font size in pixels
 * @returns Line height in pixels, aligned to the grid
 */
export function getGridAlignedLineHeight(fontSize: number): number {
	// Round up to the nearest grid unit
	return Math.ceil(fontSize / GRID_UNIT) * GRID_UNIT;
}
