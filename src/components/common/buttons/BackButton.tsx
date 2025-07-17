"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

interface BackButtonProps {
  name: string;
  css?: string;
}

const BackButton = ({ name, css }: BackButtonProps) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <button
      type="button"
      onClick={handleBackClick}
      className={twMerge(
        "flex items-center gap-1 hover:underline cursor-pointer",
        css
      )}
    >
      <ArrowLeft className="w-5" />
      <p className="font-semibold">{name}</p>
    </button>
  );
};

export default BackButton;
