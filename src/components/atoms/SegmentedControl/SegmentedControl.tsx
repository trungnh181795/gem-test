import { FC } from "react";

interface SegmentedControlProps {
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  selectedValue: string;
}

const SegmentedControl: FC<SegmentedControlProps> = ({
  options,
  onChange,
  selectedValue,
}) => {
  return (
    <div className="bg-[#212121] rounded-lg p-0.5 flex gap-x-0.5 min-w-[140px]">
      {options.map((option) => {
        const isActive = option.value === selectedValue;
        return (
          <button
            key={option.value}
            data-testid={`segment-${option.value}`}
            onClick={() => onChange(option.value)}
            className={`flex-1 h-8 px-4 rounded-md text-xs font-medium transition-all duration-200 ${
              isActive
                ? "bg-[#424242] text-white"
                : "bg-[#212121] text-[#AAAAAA] cursor-pointer hover:bg-[#424242] hover:text-white"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default SegmentedControl;
