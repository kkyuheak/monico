import { twMerge } from "tailwind-merge";

interface SpinnerProps {
  className?: string;
}

const Spinner = ({ className }: SpinnerProps) => {
  return (
    <div className="flex justify-center items-center h-full">
      <div
        className={twMerge(
          "w-10 h-10 border-4 border-[#1E90FF] border-t-transparent rounded-full animate-spin",
          className
        )}
      ></div>
    </div>
  );
};

export default Spinner;
