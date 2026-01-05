import { describe, it, expect } from "vitest";
import {
  normalizeInput,
  parseAndValidateNumber,
  shouldDisableMinusButton,
  shouldDisablePlusButton,
  adjustValueForUnitSwitch,
  incrementValue,
  decrementValue,
} from "./unit-converter";

describe("normalizeInput", () => {
  it("should replace comma with dot", () => {
    expect(normalizeInput("12,3")).toBe("12.3");
    expect(normalizeInput("1,2,3")).toBe("1.23");
  });

  it("should remove non-numeric characters except dot and minus", () => {
    expect(normalizeInput("123a")).toBe("123");
    expect(normalizeInput("12a3")).toBe("123");
    expect(normalizeInput("a123")).toBe("123");
    expect(normalizeInput("abc")).toBe("");
  });

  it("should handle multiple dots by keeping only first one", () => {
    expect(normalizeInput("12.4.5")).toBe("12.45");
    expect(normalizeInput("1.2.3.4")).toBe("1.234");
  });

  it("should handle negative numbers", () => {
    expect(normalizeInput("-10")).toBe("-10");
    expect(normalizeInput("-12.5")).toBe("-12.5");
  });

  it("should handle multiple minus signs by keeping only the leading one", () => {
    expect(normalizeInput("--10")).toBe("-10");
    expect(normalizeInput("-1-0")).toBe("-10");
    expect(normalizeInput("1-0")).toBe("10");
  });

  it("should handle empty string", () => {
    expect(normalizeInput("")).toBe("");
  });

  it("should handle valid numbers without changes", () => {
    expect(normalizeInput("123")).toBe("123");
    expect(normalizeInput("12.5")).toBe("12.5");
    expect(normalizeInput("0")).toBe("0");
  });
});

describe("parseAndValidateNumber", () => {
  it("should parse valid numbers", () => {
    expect(parseAndValidateNumber("50", "%", 0)).toBe(50);
    expect(parseAndValidateNumber("12.5", "%", 0)).toBe(12.5);
    expect(parseAndValidateNumber("100", "%", 0)).toBe(100);
  });

  it("should return 0 for negative values", () => {
    expect(parseAndValidateNumber("-10", "%", 50)).toBe(0);
    expect(parseAndValidateNumber("-5", "px", 100)).toBe(0);
  });

  it("should return previous valid value for invalid input", () => {
    expect(parseAndValidateNumber("abc", "%", 50)).toBe(50);
    expect(parseAndValidateNumber("", "%", 25)).toBe(25);
  });

  it("should return previous valid value when % value exceeds 100", () => {
    expect(parseAndValidateNumber("150", "%", 50)).toBe(50);
    expect(parseAndValidateNumber("101", "%", 75)).toBe(75);
  });

  it("should allow px values greater than 100", () => {
    expect(parseAndValidateNumber("150", "px", 50)).toBe(150);
    expect(parseAndValidateNumber("1000", "px", 100)).toBe(1000);
  });

  it("should handle edge cases at boundaries", () => {
    expect(parseAndValidateNumber("100", "%", 0)).toBe(100);
    expect(parseAndValidateNumber("0", "%", 50)).toBe(0);
  });
});

describe("shouldDisableMinusButton", () => {
  it("should return true when value is 0", () => {
    expect(shouldDisableMinusButton(0)).toBe(true);
  });

  it("should return true when value is negative", () => {
    expect(shouldDisableMinusButton(-1)).toBe(true);
  });

  it("should return false when value is positive", () => {
    expect(shouldDisableMinusButton(1)).toBe(false);
    expect(shouldDisableMinusButton(50)).toBe(false);
    expect(shouldDisableMinusButton(100)).toBe(false);
  });
});

describe("shouldDisablePlusButton", () => {
  it("should return true when unit is % and value is 100", () => {
    expect(shouldDisablePlusButton(100, "%")).toBe(true);
  });

  it("should return true when unit is % and value is greater than 100", () => {
    expect(shouldDisablePlusButton(101, "%")).toBe(true);
  });

  it("should return false when unit is % and value is less than 100", () => {
    expect(shouldDisablePlusButton(99, "%")).toBe(false);
    expect(shouldDisablePlusButton(50, "%")).toBe(false);
    expect(shouldDisablePlusButton(0, "%")).toBe(false);
  });

  it("should return false when unit is px regardless of value", () => {
    expect(shouldDisablePlusButton(0, "px")).toBe(false);
    expect(shouldDisablePlusButton(100, "px")).toBe(false);
    expect(shouldDisablePlusButton(1000, "px")).toBe(false);
  });
});

describe("adjustValueForUnitSwitch", () => {
  it("should cap value to 100 when switching to % and value exceeds 100", () => {
    expect(adjustValueForUnitSwitch(150, "%")).toBe(100);
    expect(adjustValueForUnitSwitch(200, "%")).toBe(100);
  });

  it("should keep value unchanged when switching to % and value is <= 100", () => {
    expect(adjustValueForUnitSwitch(100, "%")).toBe(100);
    expect(adjustValueForUnitSwitch(50, "%")).toBe(50);
    expect(adjustValueForUnitSwitch(0, "%")).toBe(0);
  });

  it("should keep value unchanged when switching to px", () => {
    expect(adjustValueForUnitSwitch(150, "px")).toBe(150);
    expect(adjustValueForUnitSwitch(100, "px")).toBe(100);
    expect(adjustValueForUnitSwitch(50, "px")).toBe(50);
  });
});

describe("incrementValue", () => {
  it("should increment value by 1", () => {
    expect(incrementValue(0, "px")).toBe(1);
    expect(incrementValue(50, "px")).toBe(51);
    expect(incrementValue(99, "px")).toBe(100);
  });

  it("should cap at 100 when unit is %", () => {
    expect(incrementValue(99, "%")).toBe(100);
    expect(incrementValue(100, "%")).toBe(100);
  });

  it("should not cap when unit is px", () => {
    expect(incrementValue(100, "px")).toBe(101);
    expect(incrementValue(999, "px")).toBe(1000);
  });
});

describe("decrementValue", () => {
  it("should decrement value by 1", () => {
    expect(decrementValue(100)).toBe(99);
    expect(decrementValue(50)).toBe(49);
    expect(decrementValue(1)).toBe(0);
  });

  it("should not go below 0", () => {
    expect(decrementValue(0)).toBe(0);
    expect(decrementValue(-1)).toBe(0);
  });
});
