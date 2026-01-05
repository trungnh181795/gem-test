import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import NumberStepper from "./NumberStepper";

afterEach(() => {
  cleanup();
});

describe("NumberStepper", () => {
  const defaultProps = {
    inputValue: "50",
    onInputChange: vi.fn(),
    onBlur: vi.fn(),
    onFocus: vi.fn(),
    onIncrement: vi.fn(),
    onDecrement: vi.fn(),
    isMinusDisabled: false,
    isPlusDisabled: false,
  };

  it("should render the input with correct value", () => {
    render(<NumberStepper {...defaultProps} />);
    const input = screen.getByTestId("number-input") as HTMLInputElement;
    expect(input.value).toBe("50");
  });

  it("should render increment and decrement buttons", () => {
    render(<NumberStepper {...defaultProps} />);
    expect(screen.getByTestId("increment-button")).toBeTruthy();
    expect(screen.getByTestId("decrement-button")).toBeTruthy();
  });

  it("should call onIncrement when plus button is clicked", () => {
    const onIncrement = vi.fn();
    render(<NumberStepper {...defaultProps} onIncrement={onIncrement} />);
    fireEvent.click(screen.getByTestId("increment-button"));
    expect(onIncrement).toHaveBeenCalledTimes(1);
  });

  it("should call onDecrement when minus button is clicked", () => {
    const onDecrement = vi.fn();
    render(<NumberStepper {...defaultProps} onDecrement={onDecrement} />);
    fireEvent.click(screen.getByTestId("decrement-button"));
    expect(onDecrement).toHaveBeenCalledTimes(1);
  });

  it("should call onInputChange when input value changes", () => {
    const onInputChange = vi.fn();
    render(<NumberStepper {...defaultProps} onInputChange={onInputChange} />);
    const input = screen.getByTestId("number-input");
    fireEvent.change(input, { target: { value: "75" } });
    expect(onInputChange).toHaveBeenCalledTimes(1);
  });

  it("should call onBlur when input loses focus", () => {
    const onBlur = vi.fn();
    render(<NumberStepper {...defaultProps} onBlur={onBlur} />);
    const input = screen.getByTestId("number-input");
    fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it("should call onFocus when input gains focus", () => {
    const onFocus = vi.fn();
    render(<NumberStepper {...defaultProps} onFocus={onFocus} />);
    const input = screen.getByTestId("number-input");
    fireEvent.focus(input);
    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it("should disable minus button when isMinusDisabled is true", () => {
    render(<NumberStepper {...defaultProps} isMinusDisabled={true} />);
    const button = screen.getByTestId("decrement-button") as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });

  it("should disable plus button when isPlusDisabled is true", () => {
    render(<NumberStepper {...defaultProps} isPlusDisabled={true} />);
    const button = screen.getByTestId("increment-button") as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });

  it("should not call onDecrement when minus button is disabled", () => {
    const onDecrement = vi.fn();
    render(
      <NumberStepper
        {...defaultProps}
        onDecrement={onDecrement}
        isMinusDisabled={true}
      />
    );
    fireEvent.click(screen.getByTestId("decrement-button"));
    expect(onDecrement).not.toHaveBeenCalled();
  });

  it("should not call onIncrement when plus button is disabled", () => {
    const onIncrement = vi.fn();
    render(
      <NumberStepper
        {...defaultProps}
        onIncrement={onIncrement}
        isPlusDisabled={true}
      />
    );
    fireEvent.click(screen.getByTestId("increment-button"));
    expect(onIncrement).not.toHaveBeenCalled();
  });

  it("should have both buttons enabled by default", () => {
    render(<NumberStepper {...defaultProps} />);
    expect(
      (screen.getByTestId("decrement-button") as HTMLButtonElement).disabled
    ).toBe(false);
    expect(
      (screen.getByTestId("increment-button") as HTMLButtonElement).disabled
    ).toBe(false);
  });

  it("should render with different input values", () => {
    const { rerender } = render(
      <NumberStepper {...defaultProps} inputValue="0" />
    );
    expect(
      (screen.getByTestId("number-input") as HTMLInputElement).value
    ).toBe("0");

    rerender(<NumberStepper {...defaultProps} inputValue="100" />);
    expect(
      (screen.getByTestId("number-input") as HTMLInputElement).value
    ).toBe("100");

    rerender(<NumberStepper {...defaultProps} inputValue="12.5" />);
    expect(
      (screen.getByTestId("number-input") as HTMLInputElement).value
    ).toBe("12.5");
  });

  describe("Tooltip behavior", () => {
    it("should render minus tooltip in DOM when minus button is disabled", () => {
      render(<NumberStepper {...defaultProps} isMinusDisabled={true} />);
      const tooltipLabel = screen.getAllByTestId("tooltip-label");
      expect(tooltipLabel.length).toBeGreaterThan(0);
      expect(screen.getByText("Value must be greater than 0")).toBeTruthy();
    });

    it("should not render minus tooltip when minus button is enabled", () => {
      render(<NumberStepper {...defaultProps} isMinusDisabled={false} />);
      expect(screen.queryByText("Value must be greater than 0")).toBeNull();
    });

    it("should render plus tooltip in DOM when plus button is disabled and unit is %", () => {
      render(
        <NumberStepper {...defaultProps} isPlusDisabled={true} unit="%" />
      );
      const tooltipLabel = screen.getAllByTestId("tooltip-label");
      expect(tooltipLabel.length).toBeGreaterThan(0);
      expect(screen.getByText("Value must be smaller than 100")).toBeTruthy();
    });

    it("should not render plus tooltip when plus button is enabled", () => {
      render(
        <NumberStepper {...defaultProps} isPlusDisabled={false} unit="%" />
      );
      expect(screen.queryByText("Value must be smaller than 100")).toBeNull();
    });

    it("should render both tooltips in DOM when both buttons are disabled", () => {
      render(
        <NumberStepper
          {...defaultProps}
          isMinusDisabled={true}
          isPlusDisabled={true}
          unit="%"
        />
      );
      const tooltipLabels = screen.getAllByTestId("tooltip-label");
      expect(tooltipLabels.length).toBe(2);
      expect(screen.getByText("Value must be greater than 0")).toBeTruthy();
      expect(screen.getByText("Value must be smaller than 100")).toBeTruthy();
    });

    it("should not render any tooltips when both buttons are enabled", () => {
      render(
        <NumberStepper
          {...defaultProps}
          isMinusDisabled={false}
          isPlusDisabled={false}
        />
      );
      expect(screen.queryByText("Value must be greater than 0")).toBeNull();
      expect(screen.queryByText("Value must be smaller than 100")).toBeNull();
      expect(screen.queryAllByTestId("tooltip-label").length).toBe(0);
    });

    it("should render tooltip wrapper for both buttons", () => {
      render(<NumberStepper {...defaultProps} />);
      const tooltipWrappers = screen.getAllByTestId("tooltip-wrapper");
      expect(tooltipWrappers.length).toBe(2);
    });
  });
});
