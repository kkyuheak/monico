"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface ModeBoxProps {
  mode: string;
}

const THEME_MODE: { [key: string]: { text: string; css: string } } = {
  light: {
    text: "라이트 모드",
    css: "bg-[#fafafa] border border-[#d8d8d8] ",
  },
  dark: { text: "다크 모드", css: "bg-[#1C2126] border border-[#545454]" },
  system: {
    text: "시스템 설정",
    css: "border border-[#d8d8d8] dark:border-[#545454]",
  },
};

const ModeBox = ({ mode }: ModeBoxProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive =
    mounted && (theme === mode || (theme === "system" && mode === "system"));

  const handleModeClick = () => {
    if (!mounted) return;
    setTheme(mode);
  };

  return (
    <div
      className="flex flex-col items-center gap-2 cursor-pointer"
      onClick={handleModeClick}
    >
      <div
        className={twMerge(
          "relative w-[140px] h-[140px] px-3 py-4 rounded-[6px] overflow-hidden flex flex-col items-start gap-2",
          THEME_MODE[mode].css,
          isActive && "ring-2 ring-green-400 shadow-md"
        )}
      >
        {mode === "system" && (
          <>
            <div className="absolute top-0 left-0 w-1/2 h-full bg-gray-200" />
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[#1C2126]" />
          </>
        )}

        <div className="relative z-10 w-[100px] h-[10px] bg-[#11a111] rounded-full"></div>
        <div
          className={twMerge(
            "relative z-10 w-[70px] h-[10px] rounded-full",
            mode === "light"
              ? "bg-[#121712]"
              : mode === "dark"
              ? "bg-[#eaeaea]"
              : "bg-[#999999]"
          )}
        ></div>
      </div>
      <p className="font-semibold text-[15px]">{THEME_MODE[mode].text}</p>
    </div>
  );
};

export default ModeBox;
