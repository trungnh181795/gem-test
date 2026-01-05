import { FC, ReactNode } from "react";

interface TooltipProps {
  label: string;
  children: ReactNode;
  disabled?: boolean;
}

const Tooltip: FC<TooltipProps> = ({ label, children, disabled = false }) => {
  return (
    <div
      className="group inline-flex flex-col items-center relative"
      data-testid="tooltip-wrapper"
    >
      {!disabled && (
        <div
          className="absolute invisible group-hover:visible transition-opacity duration-300 bottom-full mb-0.5 whitespace-nowrap z-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
          data-testid="tooltip-label"
        >
          <div className="bg-[#212121] text-white text-xs font-normal text-center rounded-lg py-[3px] px-2 shadow-lg">
            {label}
          </div>
          <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[#212121]" />
        </div>
      )}
      {children}
    </div>
  );
};

export default Tooltip;
