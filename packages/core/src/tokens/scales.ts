import { GRID_UNIT } from "../constants";

/**
 * Scale tokens - direct multiples of 4px
 * These are the raw numerical values used throughout the system
 */
export const scales = {
	0: 0,
	1: GRID_UNIT * 1, // 4px
	2: GRID_UNIT * 2, // 8px
	3: GRID_UNIT * 3, // 12px
	4: GRID_UNIT * 4, // 16px
	5: GRID_UNIT * 5, // 20px
	6: GRID_UNIT * 6, // 24px
	8: GRID_UNIT * 8, // 32px
	10: GRID_UNIT * 10, // 40px
	12: GRID_UNIT * 12, // 48px
	16: GRID_UNIT * 16, // 64px
	20: GRID_UNIT * 20, // 80px
	24: GRID_UNIT * 24, // 96px
	32: GRID_UNIT * 32, // 128px
	40: GRID_UNIT * 40, // 160px
	48: GRID_UNIT * 48, // 192px
	56: GRID_UNIT * 56, // 224px
	64: GRID_UNIT * 64, // 256px
} as const;

export type ScaleToken = keyof typeof scales;

/**
 * Generate strings with pixel units for all scale values
 */
export const scaleValues: Record<ScaleToken, string> = Object.fromEntries(
	Object.entries(scales).map(([key, value]) => [key, `${value}px`]),
) as Record<ScaleToken, string>;
