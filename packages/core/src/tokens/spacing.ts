import { scales } from "./scales";

/**
 * Spacing tokens for margins, padding, and layout
 * All values are multiples of the grid unit (4px)
 */
export const spacing = {
  0: scales[0], // 0px
  1: scales[1], // 4px
  2: scales[2], // 8px
  3: scales[3], // 12px
  4: scales[4], // 16px
  5: scales[5], // 20px
  6: scales[6], // 24px
  8: scales[8], // 32px
  10: scales[10], // 40px
  12: scales[12], // 48px
  16: scales[16], // 64px
  20: scales[20], // 80px
  24: scales[24], // 96px
  32: scales[32], // 128px
  40: scales[40], // 160px
  48: scales[48], // 192px
  56: scales[56], // 224px
  64: scales[64], // 256px
} as const;

export type SpacingToken = keyof typeof spacing;

// Create string versions with pixel units
export const spacingValues = Object.entries(spacing).reduce(
  (acc, [key, value]) => {
    acc[key] = `${value}px`;
    return acc;
  },
  {} as Record<SpacingToken, string>
);
