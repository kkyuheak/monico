"use client";

import { supabase } from "@/lib/supabase/supabase";
import { useAuthStore } from "@/store/authStore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

// 메뉴
const HEADER_MENU = [
  {
    name: "코인",
    href: "/coin",
  },
  {
    name: "커뮤니티",
    href: "/community",
  },
];

const Header = () => {
  const userInfo = useAuthStore((state) => state.userInfo);
  const setUserInfo = useAuthStore((state) => state.setUserInfo);

  const router = useRouter();

  // 로그아웃 함수
  const logOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
      alert("로그아웃 도중 에러가 발생했습니다.");
      return;
    }

    // 로그인 여부 false
    setIsLoggedIn(false);

    // zustand 유저 정보 Null
    setUserInfo(null);
  };

  const [isLoading, setIsLoading] = useState(true);

  // 로그인 인증여부
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getIsLoggedIn = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error(error);
      return;
    }

    if (data.session !== null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  useEffect(() => {
    getIsLoggedIn();
  }, []);

  const handleFavoriteClick = async () => {
    const { data: getUser, error } = await supabase.auth.getUser();
    if (error) {
      console.error(error);
      return;
    }
    console.log(getUser);

    const { id: userId } = getUser.user;

    // 추후에 usersinfo 테이블에서 해당 유저의 일치하는 이름을 가져와야함

    router.push(`/${userId}/favorite`);
  };

  return (
    <header className="h-[53px] flex items-center justify-between px-6 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-8">
        <Link href={"/"} className="flex items-center">
          <Image
            src={"/assets/monico_logo.svg"}
            alt="header_logo"
            width={100}
            height={40}
            className="bg-white cursor-pointer"
          />
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

      {/* 로그인, 회원가입 */}
      <ul className="flex gap-6 text-[16px] items-center">
        {!isLoading ? (
          !isLoggedIn ? (
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
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-10 h-10 bg-gray-200 rounded-full cursor-pointer outline-none">
                    <img
                      src={userInfo?.profile_img}
                      alt="프로필 이미지"
                      className="rounded-full w-10 h-10"
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
        ) : null}
      </ul>
    </header>
  );
};

export default Header;
