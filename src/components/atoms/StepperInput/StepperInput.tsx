import { FC } from "react";

interface StepperInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  onFocus: () => void;
  testId?: string;
}

const StepperInput: FC<StepperInputProps> = ({
  value,
  onChange,
  onBlur,
  onFocus,
  testId,
}) => {
  return (
    <input
      data-testid={testId}
      type="text"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      className="h-9 w-full text-center border-none outline-none text-white text-xs font-normal px-2 transition-colors bg-[#212121] hover:bg-[#3B3B3B] grow"
    />
  );
};

export default StepperInput;
