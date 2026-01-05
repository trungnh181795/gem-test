import { FC, ReactNode } from "react";

interface IconButtonProps {
  icon: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  testId?: string;
  groupHoverClass?: string;
  className?: string;
}

const IconButton: FC<IconButtonProps> = ({
  icon,
  onClick,
  disabled = false,
  testId,
  groupHoverClass = "",
  className = "",
}) => {
  return (
    <button
      data-testid={testId}
      onClick={onClick}
      disabled={disabled}
      className={`shrink-0 h-9 w-9 flex items-center justify-center transition-colors ${
        disabled
          ? "cursor-not-allowed bg-[#212121]!"
          : `cursor-pointer bg-[#212121] hover:bg-[#3B3B3B] ${groupHoverClass}`
      } ${className}`}
    >
      {icon}
    </button>
  );
};

export default IconButton;
