import { twMerge } from "tailwind-merge";

interface AuthButtonProps {
  css?: string;
  text: string;
  iconImgSrc?: string;
}

const AuthButton = ({ css, text, iconImgSrc }: AuthButtonProps) => {
  return (
    <button
      className={twMerge(
        `w-[350px] h-[40px] flex gap-2 justify-center items-center rounded-lg bg-blue-100 cursor-pointer`,
        css
      )}
    >
      <img src={iconImgSrc} alt="" className="w-5" />
      {text}
    </button>
  );
};

export default AuthButton;
