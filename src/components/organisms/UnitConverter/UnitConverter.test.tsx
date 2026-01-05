import { describe, it, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import UnitConverter from "./UnitConverter";

afterEach(() => {
  cleanup();
});

describe("UnitConverter", () => {
  it("should render with default values", () => {
    render(<UnitConverter />);
    
    expect(screen.getByText("Unit")).toBeTruthy();
    expect(screen.getByText("Value")).toBeTruthy();
    expect((screen.getByTestId("number-input") as HTMLInputElement).value).toBe("0");
  });

  it("should render SegmentedControl with % and px options", () => {
    render(<UnitConverter />);
    
    expect(screen.getByTestId("segment-%")).toBeTruthy();
    expect(screen.getByTestId("segment-px")).toBeTruthy();
  });

  it("should have % as default unit", () => {
    render(<UnitConverter />);
    
    const percentButton = screen.getByTestId("segment-%");
    expect(percentButton.className).toContain("bg-[#424242]");
  });

  it("should switch unit when clicking px", () => {
    render(<UnitConverter />);
    
    fireEvent.click(screen.getByTestId("segment-px"));
    
    const pxButton = screen.getByTestId("segment-px");
    expect(pxButton.className).toContain("bg-[#424242]");
  });

  it("should increment value when plus button is clicked", () => {
    render(<UnitConverter />);
    
    const plusButton = screen.getByTestId("increment-button");
    
    fireEvent.click(plusButton);
    
    expect((screen.getByTestId("number-input") as HTMLInputElement).value).toBe("1");
  });

  it("should decrement value when minus button is clicked", () => {
    render(<UnitConverter />);
    
    const plusButton = screen.getByTestId("increment-button");
    const minusButton = screen.getByTestId("decrement-button");
    
    fireEvent.click(plusButton);
    fireEvent.click(plusButton);
    expect((screen.getByTestId("number-input") as HTMLInputElement).value).toBe("2");
    
    fireEvent.click(minusButton);
    expect((screen.getByTestId("number-input") as HTMLInputElement).value).toBe("1");
  });

  it("should disable minus button when value is 0", () => {
    render(<UnitConverter />);
    
    const minusButton = screen.getByTestId("decrement-button") as HTMLButtonElement;
    
    expect(minusButton.disabled).toBe(true);
  });

  it("should disable plus button when value is 100 and unit is %", () => {
    render(<UnitConverter />);
    
    const input = screen.getByTestId("number-input");
    
    fireEvent.change(input, { target: { value: "100" } });
    fireEvent.blur(input);
    
    const plusButton = screen.getByTestId("increment-button") as HTMLButtonElement;
    
    expect(plusButton.disabled).toBe(true);
  });

  it("should not disable plus button when value is 100 and unit is px", () => {
    render(<UnitConverter />);
    
    fireEvent.click(screen.getByTestId("segment-px"));
    
    const input = screen.getByTestId("number-input");
    fireEvent.change(input, { target: { value: "100" } });
    fireEvent.blur(input);
    
    const plusButton = screen.getByTestId("increment-button") as HTMLButtonElement;
    
    expect(plusButton.disabled).toBe(false);
  });

  it("should handle input change", () => {
    render(<UnitConverter />);
    
    const input = screen.getByTestId("number-input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "50" } });
    
    expect(input.value).toBe("50");
  });

  it("should validate input on blur", () => {
    render(<UnitConverter />);
    
    const input = screen.getByTestId("number-input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "abc" } });
    fireEvent.blur(input);
    
    expect(input.value).toBe("0");
  });

  it("should cap value at 100 when switching from px to % with value > 100", () => {
    render(<UnitConverter />);
    
    fireEvent.click(screen.getByTestId("segment-px"));
    
    const input = screen.getByTestId("number-input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "150" } });
    fireEvent.blur(input);
    
    expect(input.value).toBe("150");
    
    fireEvent.click(screen.getByTestId("segment-%"));
    
    expect(input.value).toBe("100");
  });

  it("should not go below 0 when decrementing", () => {
    render(<UnitConverter />);
    
    const input = screen.getByTestId("number-input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "1" } });
    fireEvent.blur(input);
    
    const minusButton = screen.getByTestId("decrement-button") as HTMLButtonElement;
    
    fireEvent.click(minusButton);
    expect(input.value).toBe("0");
    
    expect(minusButton.disabled).toBe(true);
  });

  it("should not exceed 100 when incrementing in % mode", () => {
    render(<UnitConverter />);
    
    const input = screen.getByTestId("number-input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "99" } });
    fireEvent.blur(input);
    
    const plusButton = screen.getByTestId("increment-button") as HTMLButtonElement;
    
    fireEvent.click(plusButton);
    expect(input.value).toBe("100");
    
    expect(plusButton.disabled).toBe(true);
  });

  it("should handle decimal values", () => {
    render(<UnitConverter />);
    
    const input = screen.getByTestId("number-input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "12.5" } });
    fireEvent.blur(input);
    
    expect(input.value).toBe("12.5");
  });

  it("should convert comma to dot in input", () => {
    render(<UnitConverter />);
    
    const input = screen.getByTestId("number-input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "12,5" } });
    
    expect(input.value).toBe("12.5");
  });

  it("should revert to previous valid value when entering value > 100 in % mode", () => {
    render(<UnitConverter />);
    
    const input = screen.getByTestId("number-input") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "50" } });
    fireEvent.blur(input);
    expect(input.value).toBe("50");
    
    fireEvent.change(input, { target: { value: "150" } });
    fireEvent.blur(input);
    
    expect(input.value).toBe("50");
  });

  it("should set value to 0 when entering negative value", () => {
    render(<UnitConverter />);
    
    const input = screen.getByTestId("number-input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "-10" } });
    fireEvent.blur(input);
    
    expect(input.value).toBe("0");
  });
});
