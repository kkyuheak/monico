"use client";

import { supabase } from "@/lib/supabase/supabase";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { showToast } from "@/utils/showToast";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/utils/getUserInfo";
import { queryClient } from "../provider/QueryProvider";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

// 메뉴
const HEADER_MENU = [
  {
    name: "코인",
    href: "/coin",
  },
  {
    name: "주식",
    href: "/stock",
  },
  {
    name: "뉴스룸",
    href: "/news",
  },
  {
    name: "커뮤니티",
    href: "/community",
  },
];

const Header = () => {
  const router = useRouter();

  // 로그아웃 함수
  const logOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
      showToast("error", "로그아웃 도중 에러가 발생했습니다.");
      return;
    }

    queryClient.invalidateQueries({
      queryKey: ["userInfo"],
    });

    router.push("/");
  };

  // 로그인 인증여부
  const { data: userInfo, isLoading: userInfoLoading } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
  });

  const handleFavoriteClick = () => {
    router.push(`/favorites`);
  };

  // 다크모드
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDarkModeClick = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <header className="h-[53px] flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-[#17171c]">
      <div className="flex items-center gap-8">
        <Link href={"/"} className="flex items-center">
          {mounted ? (
            <Image
              src={
                resolvedTheme === "dark"
                  ? "/assets/dark_monico_logo.svg"
                  : "/assets/monico_logo.svg"
              }
              alt="header_logo"
              width={100}
              height={40}
              className="cursor-pointer"
            />
          ) : (
            <Image
              src={"/assets/monico_logo.svg"}
              alt="header_logo"
              width={100}
              height={40}
              className="cursor-pointer"
            />
          )}
        </Link>

        {/* 메뉴 */}
        <ul className="flex gap-6 text-[16px] items-center">
          {HEADER_MENU.map((menu) => (
            <li key={menu.name} className="cursor-pointer font-semibold">
              <Link href={menu.href}>{menu.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-6">
        <button
          type="button"
          className="relative w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 group
          flex items-center justify-center cursor-pointer"
          onClick={handleDarkModeClick}
        >
          {mounted &&
            (resolvedTheme === "dark" ? <Sun size={25} /> : <Moon size={25} />)}

          <span
            className="absolute w-[70px] -bottom-6 left-1/2 -translate-x-1/2 
            opacity-0 group-hover:opacity-100 text-[12px] font-semibold
          bg-gray-100 dark:bg-gray-600 px-[6px] py-[2px] rounded-[6px]"
          >
            {mounted &&
              (resolvedTheme === "dark" ? "라이트 모드" : "다크 모드")}
          </span>
        </button>

        {/* 로그인, 회원가입 */}
        <ul className="flex gap-6 text-[16px] items-center">
          {!userInfoLoading ? (
            !userInfo ? (
              <>
                <li className="cursor-pointer">
                  <Link href={"/login"} className="block">
                    로그인
                  </Link>
                </li>
                <li className="cursor-pointer">
                  <Link href={"/signup"} className="block">
                    회원가입
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="flex items-center">
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger className="w-10 h-10 bg-gray-200 rounded-full cursor-pointer outline-none">
                      <Image
                        src={userInfo?.profile_img}
                        alt="프로필 이미지"
                        className="rounded-full w-10 h-10"
                        width={40}
                        height={40}
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[160px] mr-1">
                      <DropdownMenuLabel>내 계정</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => router.push("/profile")}>
                        프로필
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleFavoriteClick}>
                        즐겨찾기
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-600"
                        onClick={logOut}
                      >
                        로그아웃
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              </>
            )
          ) : (
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
