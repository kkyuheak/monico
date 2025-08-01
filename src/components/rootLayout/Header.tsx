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
import { Menu, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import SimpleButton from "../common/buttons/SimpleButton";

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
    href: "/community?category=coin&page=1",
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
    <header className="w-full h-[53px] fixed top-0 z-50 flex items-center justify-between px-6 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-[#17171c]">
      {/* Logo and Desktop Menu */}
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

        <ul className="hidden md:flex gap-6 text-[16px] items-center">
          {HEADER_MENU.map((menu) => (
            <li key={menu.name} className="cursor-pointer font-semibold">
              <Link href={menu.href} className="block w-full h-full">
                {menu.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop Icons */}
      <div className="hidden md:flex items-center gap-6">
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

        <ul className="flex gap-6 text-[16px] items-center">
          {!userInfoLoading ? (
            !userInfo ? (
              <li className="cursor-pointer">
                <SimpleButton
                  onClick={() => router.push("/login")}
                  css="bg-[#53a83c] w-[64px] h-[32px] rounded-[8px] text-[14px] text-white"
                >
                  로그인
                </SimpleButton>
              </li>
            ) : (
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
            )
          ) : (
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
          )}
        </ul>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <button className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
              <Menu size={24} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mr-1">
            {!userInfoLoading &&
              (userInfo ? (
                <>
                  <DropdownMenuLabel>
                    <div className="flex items-center gap-2">
                      <Image
                        src={userInfo?.profile_img}
                        alt="프로필 이미지"
                        className="rounded-full w-8 h-8"
                        width={32}
                        height={32}
                      />
                      <span>{userInfo.nickname}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/profile")}>
                    프로필
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleFavoriteClick}>
                    즐겨찾기
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuLabel>게스트</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/login")}>
                    로그인
                  </DropdownMenuItem>
                </>
              ))}
            <DropdownMenuSeparator />
            {HEADER_MENU.map((menu) => (
              <DropdownMenuItem
                key={menu.name}
                onClick={() => router.push(menu.href)}
              >
                {menu.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleDarkModeClick}>
              {mounted &&
                (resolvedTheme === "dark" ? (
                  <span className="flex justify-center items-center gap-1">
                    <Sun /> 라이트 모드
                  </span>
                ) : (
                  <span className="flex justify-center items-center gap-1">
                    <Moon />
                    다크 모드
                  </span>
                ))}
            </DropdownMenuItem>
            {userInfo && (
              <DropdownMenuItem
                className="text-red-600 focus:text-red-600"
                onClick={logOut}
              >
                로그아웃
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
