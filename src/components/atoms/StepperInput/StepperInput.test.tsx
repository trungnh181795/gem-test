import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import StepperInput from "./StepperInput";

afterEach(() => {
  cleanup();
});

describe("StepperInput", () => {
  const defaultProps = {
    value: "50",
    onChange: vi.fn(),
    onBlur: vi.fn(),
    onFocus: vi.fn(),
  };

  it("should render the input with correct value", () => {
    render(<StepperInput {...defaultProps} testId="stepper-input" />);
    const input = screen.getByTestId("stepper-input") as HTMLInputElement;
    expect(input.value).toBe("50");
  });

  it("should call onChange when input value changes", () => {
    const onChange = vi.fn();
    render(
      <StepperInput {...defaultProps} onChange={onChange} testId="stepper-input" />
    );
    const input = screen.getByTestId("stepper-input");
    fireEvent.change(input, { target: { value: "75" } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("should call onBlur when input loses focus", () => {
    const onBlur = vi.fn();
    render(
      <StepperInput {...defaultProps} onBlur={onBlur} testId="stepper-input" />
    );
    const input = screen.getByTestId("stepper-input");
    fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it("should call onFocus when input gains focus", () => {
    const onFocus = vi.fn();
    render(
      <StepperInput {...defaultProps} onFocus={onFocus} testId="stepper-input" />
    );
    const input = screen.getByTestId("stepper-input");
    fireEvent.focus(input);
    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it("should render with different values", () => {
    const { rerender } = render(
      <StepperInput {...defaultProps} value="0" testId="stepper-input" />
    );
    expect(
      (screen.getByTestId("stepper-input") as HTMLInputElement).value
    ).toBe("0");

    rerender(<StepperInput {...defaultProps} value="100" testId="stepper-input" />);
    expect(
      (screen.getByTestId("stepper-input") as HTMLInputElement).value
    ).toBe("100");

    rerender(<StepperInput {...defaultProps} value="12.5" testId="stepper-input" />);
    expect(
      (screen.getByTestId("stepper-input") as HTMLInputElement).value
    ).toBe("12.5");
  });

  it("should have type text", () => {
    render(<StepperInput {...defaultProps} testId="stepper-input" />);
    const input = screen.getByTestId("stepper-input") as HTMLInputElement;
    expect(input.type).toBe("text");
  });

  it("should render with custom testId", () => {
    render(<StepperInput {...defaultProps} testId="custom-input" />);
    expect(screen.getByTestId("custom-input")).toBeTruthy();
  });
});
