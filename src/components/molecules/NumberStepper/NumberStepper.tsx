import { FC } from "react";
import IconButton from "../../atoms/IconButton";
import StepperInput from "../../atoms/StepperInput";
import Tooltip from "../../atoms/Tooltip";
import MinusIcon from "../../icons/MinusIcon";
import PlusIcon from "../../icons/PlusIcon";

interface NumberStepperProps {
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  onFocus: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
  isMinusDisabled: boolean;
  isPlusDisabled: boolean;
  unit?: "%" | "px";
}

const NumberStepper: FC<NumberStepperProps> = ({
  inputValue,
  onInputChange,
  onBlur,
  onFocus,
  onIncrement,
  onDecrement,
  isMinusDisabled,
  isPlusDisabled,
  unit = "%",
}) => {
  const minusTooltipLabel = "Value must be greater than 0";
  const plusTooltipLabel = unit === "%" ? "Value must be smaller than 100" : "";

  return (
    <div
      data-testid="number-stepper-wrapper"
      className="group/stepper bg-[#212121] rounded-lg flex transition-all focus-within:outline focus-within:outline-[#3C67FF] min-width-[140px]"
    >
      <Tooltip label={minusTooltipLabel} disabled={!isMinusDisabled}>
        <IconButton
          className="rounded-tl-lg rounded-bl-lg"
          testId="decrement-button"
          onClick={onDecrement}
          disabled={isMinusDisabled}
          groupHoverClass="group-has-[input:hover]/stepper:bg-[#3B3B3B]"
          icon={
            <MinusIcon
              className={
                isMinusDisabled ? "fill-[#AAAAAA] fill-opacity-[0.67]" : "fill-[#F9F9F9]"
              }
            />
          }
        />
      </Tooltip>
      <StepperInput
        testId="number-input"
        value={inputValue}
        onChange={onInputChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      <Tooltip label={plusTooltipLabel} disabled={!isPlusDisabled}>
        <IconButton
          testId="increment-button"
          onClick={onIncrement}
          disabled={isPlusDisabled}
          groupHoverClass="group-has-[input:hover]/stepper:bg-[#3B3B3B]"
          className="rounded-tr-lg rounded-br-lg"
          icon={
            <PlusIcon
              className={
                isPlusDisabled ? "fill-[#AAAAAA] fill-opacity-[0.67]" : "fill-[#F9F9F9]"
              }
            />
          }
        />
      </Tooltip>
    </div>
  );
};

export default NumberStepper;
