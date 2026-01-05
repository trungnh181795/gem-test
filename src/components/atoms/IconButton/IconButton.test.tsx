import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import IconButton from "./IconButton";

afterEach(() => {
  cleanup();
});

describe("IconButton", () => {
  const MockIcon = () => <span data-testid="mock-icon">+</span>;

  it("should render the icon", () => {
    render(<IconButton icon={<MockIcon />} onClick={vi.fn()} />);
    expect(screen.getByTestId("mock-icon")).toBeTruthy();
  });

  it("should call onClick when clicked", () => {
    const onClick = vi.fn();
    render(
      <IconButton icon={<MockIcon />} onClick={onClick} testId="icon-button" />
    );
    fireEvent.click(screen.getByTestId("icon-button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("should not call onClick when disabled", () => {
    const onClick = vi.fn();
    render(
      <IconButton
        icon={<MockIcon />}
        onClick={onClick}
        disabled={true}
        testId="icon-button"
      />
    );
    fireEvent.click(screen.getByTestId("icon-button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("should have disabled attribute when disabled is true", () => {
    render(
      <IconButton
        icon={<MockIcon />}
        onClick={vi.fn()}
        disabled={true}
        testId="icon-button"
      />
    );
    const button = screen.getByTestId("icon-button") as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });

  it("should not have disabled attribute by default", () => {
    render(
      <IconButton icon={<MockIcon />} onClick={vi.fn()} testId="icon-button" />
    );
    const button = screen.getByTestId("icon-button") as HTMLButtonElement;
    expect(button.disabled).toBe(false);
  });

  it("should apply cursor-not-allowed class when disabled", () => {
    render(
      <IconButton
        icon={<MockIcon />}
        onClick={vi.fn()}
        disabled={true}
        testId="icon-button"
      />
    );
    const button = screen.getByTestId("icon-button");
    expect(button.className).toContain("cursor-not-allowed");
  });

  it("should apply cursor-pointer class when not disabled", () => {
    render(
      <IconButton
        icon={<MockIcon />}
        onClick={vi.fn()}
        disabled={false}
        testId="icon-button"
      />
    );
    const button = screen.getByTestId("icon-button");
    expect(button.className).toContain("cursor-pointer");
  });

  it("should render with custom testId", () => {
    render(
      <IconButton
        icon={<MockIcon />}
        onClick={vi.fn()}
        testId="custom-test-id"
      />
    );
    expect(screen.getByTestId("custom-test-id")).toBeTruthy();
  });
});
