import { FC, useState, useRef } from "react";
import NumberStepper from "../../molecules/NumberStepper";
import SegmentedControl from "../../atoms/SegmentedControl";
import {
  Unit,
  normalizeInput,
  parseAndValidateNumber,
  shouldDisableMinusButton,
  shouldDisablePlusButton,
  adjustValueForUnitSwitch,
  incrementValue,
  decrementValue,
} from "../../../utils/unit-converter";

const UnitConverter: FC = () => {
  const [unit, setUnit] = useState<Unit>("%");
  const [value, setValue] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("0");
  const [isFocused, setIsFocused] = useState(false);
  const previousValidValueRef = useRef<number>(0);

  const handleUnitChange = (newUnit: string) => {
    const unitValue = newUnit as Unit;
    const adjustedValue = adjustValueForUnitSwitch(value, unitValue);
    setUnit(unitValue);
    setValue(adjustedValue);
    setInputValue(adjustedValue.toString());
    previousValidValueRef.current = adjustedValue;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const normalized = normalizeInput(e.target.value);
    setInputValue(normalized);
  };

  const handleBlur = () => {
    setIsFocused(false);
    const validatedValue = parseAndValidateNumber(
      inputValue,
      unit,
      previousValidValueRef.current
    );
    setValue(validatedValue);
    setInputValue(validatedValue.toString());
    previousValidValueRef.current = validatedValue;
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleIncrement = () => {
    const newValue = incrementValue(value, unit);
    setValue(newValue);
    setInputValue(newValue.toString());
    previousValidValueRef.current = newValue;
  };

  const handleDecrement = () => {
    const newValue = decrementValue(value);
    setValue(newValue);
    setInputValue(newValue.toString());
    previousValidValueRef.current = newValue;
  };

  if (value !== previousValidValueRef.current && !isFocused) {
    setInputValue(value.toString());
    previousValidValueRef.current = value;
  }

  const isMinusDisabled = shouldDisableMinusButton(value);
  const isPlusDisabled = shouldDisablePlusButton(value, unit);

  return (
    <div className="w-[280px] bg-[#151515] p-4 space-y-4">
      <div className="w-full flex flex-col md:flex-row justify-center items-start md:items-center md:justify-between gap-2">
        <span className="inline-block min-w-[100px] shrink-0 text-xs text-[#AAAAAA] self-center">Unit</span>
        <SegmentedControl
          options={[
            { label: "%", value: "%" },
            { label: "px", value: "px" },
          ]}
          selectedValue={unit}
          onChange={handleUnitChange}
        />
      </div>
      <div className="w-full flex flex-col md:flex-row justify-center items-start md:items-center md:justify-between gap-2">
        <span className="inline-block min-w-[100px] shrink-0 text-xs text-[#AAAAAA] self-center">Value</span>
        <NumberStepper
          inputValue={inputValue}
          onInputChange={handleInputChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          isMinusDisabled={isMinusDisabled}
          isPlusDisabled={isPlusDisabled}
        />
      </div>
    </div>
  );
};

export default UnitConverter;
