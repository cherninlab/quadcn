export const GRID_UNIT = 4;

/**
 * Convert grid units to pixel values
 * @param units Number of grid units
 * @returns Pixel value as string (e.g. "16px")
 */
export function createGridValue(units: number): string {
  return `${units * GRID_UNIT}px`;
}

/**
 * Check if a value aligns to the grid
 * @param value Pixel value to check
 * @returns Whether the value is a multiple of the grid unit
 */
export function isGridAligned(value: number): boolean {
  return value % GRID_UNIT === 0;
}

/**
 * Format a value as a CSS pixel value
 * @param value Number to format
 * @returns Formatted pixel value
 */
export function px(value: number): string {
  return `${value}px`;
}
