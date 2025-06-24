import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface AuthButtonProps {
  css?: string;
  text: string;
  iconImgSrc?: string;
  onClick?: () => Promise<void>;
}

const AuthButton = ({ css, text, iconImgSrc, onClick }: AuthButtonProps) => {
  return (
    <button
      type="button"
      className={twMerge(
        `w-[350px] h-[40px] flex gap-2 justify-center items-center rounded-lg bg-blue-100 cursor-pointer`,
        css
      )}
      onClick={onClick}
    >
      {iconImgSrc && <Image src={iconImgSrc} width={20} height={20} alt="" />}
      {text}
    </button>
  );
};

export default AuthButton;
