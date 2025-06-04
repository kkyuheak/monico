import { twMerge } from "tailwind-merge";

interface SimpleButtonProps {
  children: React.ReactNode;
  css?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const SimpleButton = ({
  children,
  css,
  onClick,
  type = "button",
  disabled = false,
}: SimpleButtonProps) => {
  return (
    <button
      className={twMerge(
        "bg-gray-200 w-[70px] h-[35px] rounded-lg text-[15px] font-semibold cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-200",
        css
      )}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default SimpleButton;
