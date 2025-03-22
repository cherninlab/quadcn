import { describe, expect, it } from "vitest";
import { createGridValue, GRID_UNIT, isGridAligned } from "../src/constants";

describe("Grid Constants", () => {
  it("GRID_UNIT should be 4", () => {
    expect(GRID_UNIT).toBe(4);
  });

  describe("isGridAligned", () => {
    it("should return true for values divisible by 4", () => {
      expect(isGridAligned(0)).toBe(true);
      expect(isGridAligned(4)).toBe(true);
      expect(isGridAligned(8)).toBe(true);
      expect(isGridAligned(12)).toBe(true);
      expect(isGridAligned(100)).toBe(true);
    });

    it("should return false for values not divisible by 4", () => {
      expect(isGridAligned(1)).toBe(false);
      expect(isGridAligned(2)).toBe(false);
      expect(isGridAligned(3)).toBe(false);
      expect(isGridAligned(5)).toBe(false);
      expect(isGridAligned(15)).toBe(false);
    });
  });

  describe("createGridValue", () => {
    it("should convert grid units to pixels", () => {
      expect(createGridValue(1)).toBe("4px");
      expect(createGridValue(2)).toBe("8px");
      expect(createGridValue(4)).toBe("16px");
      expect(createGridValue(10)).toBe("40px");
    });

    it("should handle decimal values", () => {
      expect(createGridValue(1.5)).toBe("6px");
      expect(createGridValue(2.5)).toBe("10px");
    });
  });
});
