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

const Header = () => {
  const userInfo = useAuthStore((state) => state.userInfo);
  const setUserInfo = useAuthStore((state) => state.setUserInfo);

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

  return (
    <header className="h-[53px] flex items-center justify-between px-6 border-b border-[#CFCFCF] bg-white">
      <Link href={"/"} className="h-full">
        <Image
          src={"/assets/monico_logo.svg"}
          alt="header_logo"
          width={100}
          height={40}
          className="bg-white cursor-pointer h-full"
        />
      </Link>

      <ul className="flex gap-6 text-[16px] items-center">
        {!isLoading &&
          (!isLoggedIn ? (
            <>
              <li className="cursor-pointer">
                <Link href={"login"} className="block">
                  로그인
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link href={"signup"} className="block">
                  회원가입
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="flex items-center ">
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-10 h-10 bg-red-400 rounded-full cursor-pointer outline-none">
                    <img
                      src={userInfo?.profile_img}
                      alt="프로필 이미지"
                      className="rounded-full w-10 h-10"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[160px] mr-1">
                    <DropdownMenuLabel>내 계정</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>프로필</DropdownMenuItem>
                    <DropdownMenuItem>즐겨찾기</DropdownMenuItem>
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
          ))}
      </ul>
    </header>
  );
};

export default Header;
