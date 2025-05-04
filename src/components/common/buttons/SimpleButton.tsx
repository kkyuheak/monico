import { twMerge } from "tailwind-merge";

interface SimpleButtonProps {
  children: React.ReactNode;
  css?: string;
  onClick?: () => void;
}

const SimpleButton = ({ children, css, onClick }: SimpleButtonProps) => {
  return (
    <button
      className={twMerge(
        "bg-gray-200 w-[70px] h-[35px] rounded-lg text-[15px] font-semibold cursor-pointer",
        css
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default SimpleButton;
