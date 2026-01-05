/**
 * Utils to:
 * Cho phép nhập các giá trị integer và float
Nếu input chứa dấu phẩy -> Thay thế thành dấu chấm
12,3 -> 12.3
Nếu input chứa các kí tự khác giá trị số phù hợp => tự động loại bỏ các giá trị:
123a -> Chuyển về 123 khi out focus
12a3 -> Chuyển về 12 khi out focus
a123 -> Chuyển về giá trị đúng gần nhất khi out focus
12.4.5 → Chuyển về giá trị đúng gần nhất khi out focus
User nhập < 0 và out focus sẽ tự động nhảy về 0
Nếu Unit là %:
User nhập > 100 và out focus sẽ tự động nhảy về giá trị hợp lệ trước khi nhập
Nếu giá trị trong ô input hiện tại là 0 => Disable button “-”
Nếu giá trị trong ô input hiện tại là 100 => Disable button “+”
Nếu switch từ px sang % và giá trị hiện tại lớn hơn 100 => Update về 100
 */
export type Unit = "px" | "%";

export const normalizeInput = (input: string): string => {
  let normalized = input.replace(/,/g, ".");

  normalized = normalized.replace(/[^\d.-]/g, "");

  const parts = normalized.split(".");
  if (parts.length > 2) {
    normalized = parts[0] + "." + parts.slice(1).join("");
  }

  const minusCount = (normalized.match(/-/g) || []).length;
  if (minusCount > 0) {
    const hasMinusAtStart = normalized[0] === "-";
    normalized = normalized.replace(/-/g, "");
    if (hasMinusAtStart) {
      normalized = "-" + normalized;
    }
  }

  return normalized;
};

export const parseAndValidateNumber = (
  input: string,
  unit: Unit,
  previousValidValue: number
): number => {
  const normalized = normalizeInput(input);

  const parsed = parseFloat(normalized);

  if (isNaN(parsed)) {
    return previousValidValue;
  }

  if (parsed < 0) {
    return 0;
  }

  if (unit === "%" && parsed > 100) {
    return previousValidValue;
  }

  return parsed;
};

export const shouldDisableMinusButton = (value: number): boolean => {
  return value <= 0;
};

export const shouldDisablePlusButton = (value: number, unit: Unit): boolean => {
  return unit === "%" && value >= 100;
};

export const adjustValueForUnitSwitch = (
  value: number,
  newUnit: Unit
): number => {
  if (newUnit === "%" && value > 100) {
    return 100;
  }
  return value;
};

export const incrementValue = (value: number, unit: Unit): number => {
  const newValue = value + 1;
  if (unit === "%" && newValue > 100) {
    return 100;
  }
  return newValue;
};

export const decrementValue = (value: number): number => {
  const newValue = value - 1;
  if (newValue < 0) {
    return 0;
  }
  return newValue;
};