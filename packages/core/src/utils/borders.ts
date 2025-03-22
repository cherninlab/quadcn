import type { BorderWidthToken } from "../tokens/borders";
import { borderWidths } from "../tokens/borders";

/**
 * Calculate adjusted dimensions to maintain grid alignment with borders
 * This is critical for maintaining the 4px grid even with 1px or 2px borders
 */
export function calculateBorderCompensation({
  desiredHeight,
  borderTop = 0,
  borderBottom = 0,
  borderLeft = 0,
  borderRight = 0,
  desiredPaddingY = 0,
  desiredPaddingX = 0,
}: {
  desiredHeight: number;
  borderTop?: number | BorderWidthToken;
  borderBottom?: number | BorderWidthToken;
  borderLeft?: number | BorderWidthToken;
  borderRight?: number | BorderWidthToken;
  desiredPaddingY?: number;
  desiredPaddingX?: number;
}) {
  // Convert token to actual pixel value if needed
  const topWidth =
    typeof borderTop === "number"
      ? borderTop
      : borderTop
        ? borderWidths[borderTop]
        : 0;

  const bottomWidth =
    typeof borderBottom === "number"
      ? borderBottom
      : borderBottom
        ? borderWidths[borderBottom]
        : 0;

  const leftWidth =
    typeof borderLeft === "number"
      ? borderLeft
      : borderLeft
        ? borderWidths[borderLeft]
        : 0;

  const rightWidth =
    typeof borderRight === "number"
      ? borderRight
      : borderRight
        ? borderWidths[borderRight]
        : 0;

  // Calculate the inner height and width after accounting for borders
  const totalBorderHeight = topWidth + bottomWidth;
  const totalBorderWidth = leftWidth + rightWidth;

  const innerHeight = desiredHeight - totalBorderHeight;
  const innerWidth = desiredPaddingX
    ? desiredPaddingX * 2 - totalBorderWidth
    : 0;

  // Calculate padding adjustment to maintain grid alignment
  const paddingTop = Math.max(0, desiredPaddingY - topWidth);
  const paddingBottom = Math.max(0, desiredPaddingY - bottomWidth);
  const paddingLeft = Math.max(0, desiredPaddingX - leftWidth);
  const paddingRight = Math.max(0, desiredPaddingX - rightWidth);

  return {
    innerHeight,
    innerWidth,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    totalBorderHeight,
    totalBorderWidth,
  };
}
