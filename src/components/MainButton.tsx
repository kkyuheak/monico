"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { twMerge } from "tailwind-merge";

interface MainButtonProps {
  css?: string;
  children?: React.ReactNode;
  link: string;
}

const MainButton = ({ css, children, link }: MainButtonProps) => {
  const router = useRouter();

  return (
    <button
      type="button"
      className={twMerge(
        "w-[150px] h-[56px]  cursor-pointer rounded-[12px] text-white text-[17px] font-semibold",
        css
      )}
      onClick={() => router.push(link)}
    >
      {children}
    </button>
  );
};

export default MainButton;
