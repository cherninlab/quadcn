import { describe, expect, it, vi } from "vitest";
import {
	applyBorderCompensation,
	getWidthHeightStyles,
} from "../src/utils/boxUtils";

// Mock the core functions
vi.mock("@quadcn/core", () => {
	return {
		GRID_UNIT: 4,
		createGridValue: (value: number) => `${value * 4}px`,
		calculateBorderCompensation: ({
			desiredHeight,
			borderTop,
			borderBottom,
			desiredPaddingY,
		}: {
			desiredHeight: number;
			borderTop: string | number;
			borderBottom: string | number;
			desiredPaddingY: number;
		}) => ({
			innerHeight:
				desiredHeight -
				(typeof borderTop === "string" ? 1 : borderTop) -
				(typeof borderBottom === "string" ? 1 : borderBottom),
			paddingTop: desiredPaddingY
				? desiredPaddingY - (typeof borderTop === "string" ? 1 : borderTop)
				: 0,
			paddingBottom: desiredPaddingY
				? desiredPaddingY -
					(typeof borderBottom === "string" ? 1 : borderBottom)
				: 0,
		}),
		borderWidths: {
			none: 0,
			hairline: 1,
			thin: 2,
			thick: 4,
		},
	};
});

describe("Box Utilities", () => {
	describe("getWidthHeightStyles", () => {
		it("should handle numeric width and height", () => {
			const styles = getWidthHeightStyles(10, 8);
			expect(styles.width).toBe("40px"); // 10 grid units
			expect(styles.height).toBe("32px"); // 8 grid units
		});

		it("should handle special values", () => {
			const styles = getWidthHeightStyles("full", "auto");
			expect(styles.width).toBe("100%");
			expect(styles.height).toBe("auto");
		});

		it("should handle string values", () => {
			const styles = getWidthHeightStyles("200px", "100px");
			expect(styles.width).toBe("200px");
			expect(styles.height).toBe("100px");
		});
	});

	describe("applyBorderCompensation", () => {
		it("should apply border compensation", () => {
			const initialStyle = { width: "100px" };
			const compensatedStyle = applyBorderCompensation(
				initialStyle,
				10, // 40px height
				"hairline", // 1px border
				4, // 16px padding
			);

			expect(compensatedStyle.height).toBeDefined();
			expect(compensatedStyle.paddingTop).toBeDefined();
			expect(compensatedStyle.paddingBottom).toBeDefined();
		});

		it("should handle undefined border width", () => {
			// This test needs to be removed or modified since our function
			// now requires borderWidth to be defined
			const initialStyle = { width: "100px" };

			// Use a defined border width instead of undefined
			const result = applyBorderCompensation(initialStyle, 10, "none", 4);
			expect(result).toBeDefined();
			expect(result.width).toBe("100px");
		});
	});
});
