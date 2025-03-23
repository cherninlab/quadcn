/**
 * Breakpoints for responsive design
 * All values are divisible by 16px (4 grid units)
 */
export const breakpoints = {
	sm: 640, // 160 grid units
	md: 768, // 192 grid units
	lg: 1024, // 256 grid units
	xl: 1280, // 320 grid units
	"2xl": 1536, // 384 grid units
} as const;

export type BreakpointToken = keyof typeof breakpoints;

/**
 * Container widths for each breakpoint
 * Slightly narrower than the breakpoints to ensure margins
 */
export const containers = {
	sm: 624, // 156 grid units
	md: 752, // 188 grid units
	lg: 1000, // 250 grid units
	xl: 1240, // 310 grid units
	"2xl": 1496, // 374 grid units
} as const;
