import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import SegmentedControl from "./SegmentedControl";

afterEach(() => {
  cleanup();
});

describe("SegmentedControl", () => {
  const defaultOptions = [
    { label: "%", value: "%" },
    { label: "px", value: "px" },
  ];

  it("should render all options", () => {
    render(
      <SegmentedControl
        options={defaultOptions}
        selectedValue="%"
        onChange={vi.fn()}
      />
    );
    expect(screen.getByTestId("segment-%")).toBeTruthy();
    expect(screen.getByTestId("segment-px")).toBeTruthy();
  });

  it("should highlight the selected option", () => {
    render(
      <SegmentedControl
        options={defaultOptions}
        selectedValue="%"
        onChange={vi.fn()}
      />
    );
    const percentButton = screen.getByTestId("segment-%");
    const pxButton = screen.getByTestId("segment-px");
    
    expect(percentButton.className).toContain("bg-[#424242]");
    expect(pxButton.className).toContain("bg-[#212121]");
  });

  it("should call onChange with correct value when option is clicked", () => {
    const onChange = vi.fn();
    render(
      <SegmentedControl
        options={defaultOptions}
        selectedValue="%"
        onChange={onChange}
      />
    );
    
    fireEvent.click(screen.getByTestId("segment-px"));
    expect(onChange).toHaveBeenCalledWith("px");
  });

  it("should call onChange when clicking the already selected option", () => {
    const onChange = vi.fn();
    render(
      <SegmentedControl
        options={defaultOptions}
        selectedValue="%"
        onChange={onChange}
      />
    );
    
    fireEvent.click(screen.getByTestId("segment-%"));
    expect(onChange).toHaveBeenCalledWith("%");
  });

  it("should render with multiple options", () => {
    const multipleOptions = [
      { label: "Option 1", value: "opt1" },
      { label: "Option 2", value: "opt2" },
      { label: "Option 3", value: "opt3" },
    ];
    
    render(
      <SegmentedControl
        options={multipleOptions}
        selectedValue="opt2"
        onChange={vi.fn()}
      />
    );
    
    expect(screen.getByTestId("segment-opt1")).toBeTruthy();
    expect(screen.getByTestId("segment-opt2")).toBeTruthy();
    expect(screen.getByTestId("segment-opt3")).toBeTruthy();
  });

  it("should update selected state when selectedValue prop changes", () => {
    const { rerender } = render(
      <SegmentedControl
        options={defaultOptions}
        selectedValue="%"
        onChange={vi.fn()}
      />
    );
    
    expect(screen.getByTestId("segment-%").className).toContain("bg-[#424242]");
    expect(screen.getByTestId("segment-px").className).toContain("bg-[#212121]");
    
    rerender(
      <SegmentedControl
        options={defaultOptions}
        selectedValue="px"
        onChange={vi.fn()}
      />
    );
    
    expect(screen.getByTestId("segment-%").className).toContain("bg-[#212121]");
    expect(screen.getByTestId("segment-px").className).toContain("bg-[#424242]");
  });

  it("should render buttons for each option", () => {
    render(
      <SegmentedControl
        options={defaultOptions}
        selectedValue="%"
        onChange={vi.fn()}
      />
    );
    
    expect(screen.getByTestId("segment-%")).toBeTruthy();
    expect(screen.getByTestId("segment-px")).toBeTruthy();
  });

  it("should apply correct text color to active and inactive options", () => {
    render(
      <SegmentedControl
        options={defaultOptions}
        selectedValue="%"
        onChange={vi.fn()}
      />
    );
    
    const percentButton = screen.getByTestId("segment-%");
    const pxButton = screen.getByTestId("segment-px");
    
    expect(percentButton.className).toContain("text-white");
    expect(pxButton.className).toContain("text-[#AAAAAA]");
  });
});
