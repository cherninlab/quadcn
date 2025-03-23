import { GRID_UNIT } from "../constants";

/**
 * Standard component heights (all multiples of 4px)
 */
export const heights = {
	xs: GRID_UNIT * 6, // 24px (6 grid units)
	sm: GRID_UNIT * 8, // 32px (8 grid units)
	md: GRID_UNIT * 10, // 40px (10 grid units) - standard button
	lg: GRID_UNIT * 12, // 48px (12 grid units)
	xl: GRID_UNIT * 14, // 56px (14 grid units)
	"2xl": GRID_UNIT * 16, // 64px (16 grid units)
} as const;

export type HeightToken = keyof typeof heights;

/**
 * Component-specific tokens
 */
export const components = {
	button: {
		minWidth: GRID_UNIT * 16, // 64px
		height: {
			sm: heights.sm, // 32px
			md: heights.md, // 40px
			lg: heights.lg, // 48px
		},
		padding: {
			sm: [0, GRID_UNIT * 3], // 0 12px
			md: [0, GRID_UNIT * 4], // 0 16px
			lg: [0, GRID_UNIT * 6], // 0 24px
		},
	},
	input: {
		height: {
			sm: heights.sm, // 32px
			md: heights.md, // 40px
			lg: heights.lg, // 48px
		},
		padding: {
			sm: [0, GRID_UNIT * 3], // 0 12px
			md: [0, GRID_UNIT * 3], // 0 12px
			lg: [0, GRID_UNIT * 4], // 0 16px
		},
	},
	// Add more component tokens as needed
};
