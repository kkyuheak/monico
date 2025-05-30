import { twMerge } from "tailwind-merge";

interface SimpleButtonProps {
  children: React.ReactNode;
  css?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const SimpleButton = ({
  children,
  css,
  onClick,
  type = "button",
}: SimpleButtonProps) => {
  return (
    <button
      className={twMerge(
        "bg-gray-200 w-[70px] h-[35px] rounded-lg text-[15px] font-semibold cursor-pointer",
        css
      )}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default SimpleButton;
