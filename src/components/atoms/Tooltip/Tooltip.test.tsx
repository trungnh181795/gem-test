import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Tooltip from "./Tooltip";

afterEach(() => {
  cleanup();
});

describe("Tooltip", () => {
  it("should render the tooltip label and children", () => {
    render(
      <Tooltip label="Test tooltip">
        <button>Test button</button>
      </Tooltip>
    );
    
    expect(screen.getByTestId("tooltip-label")).toBeTruthy();
    expect(screen.getByTestId("tooltip-wrapper")).toBeTruthy();
    expect(screen.getByText("Test button")).toBeTruthy();
  });

  it("should hide the tooltip when disabled is true", () => {
    render(
      <Tooltip label="Hidden tooltip" disabled={true}>
        <button>Visible button</button>
      </Tooltip>
    );
    
    expect(screen.queryByTestId("tooltip-label")).toBeNull();
    expect(screen.getByText("Visible button")).toBeTruthy();
  });

  it("should show the tooltip when disabled is false", () => {
    render(
      <Tooltip label="Visible tooltip" disabled={false}>
        <button>Visible button</button>
      </Tooltip>
    );
    
    expect(screen.getByTestId("tooltip-label")).toBeTruthy();
    expect(screen.getByText("Visible button")).toBeTruthy();
  });

  it("should show the tooltip by default when disabled prop is not provided", () => {
    render(
      <Tooltip label="Default tooltip">
        <div>Content</div>
      </Tooltip>
    );
    
    expect(screen.getByTestId("tooltip-label")).toBeTruthy();
  });

  it("should render multiple children correctly", () => {
    render(
      <Tooltip label="Multi-child tooltip">
        <button>Button 1</button>
        <span>Text</span>
      </Tooltip>
    );
    
    expect(screen.getByTestId("tooltip-label")).toBeTruthy();
    expect(screen.getByText("Button 1")).toBeTruthy();
    expect(screen.getByText("Text")).toBeTruthy();
  });

  it("should render with complex children", () => {
    render(
      <Tooltip label="Complex tooltip">
        <div>
          <input type="text" placeholder="Enter value" />
          <button>Submit</button>
        </div>
      </Tooltip>
    );
    
    expect(screen.getByTestId("tooltip-label")).toBeTruthy();
    expect(screen.getByPlaceholderText("Enter value")).toBeTruthy();
    expect(screen.getByText("Submit")).toBeTruthy();
  });
});
