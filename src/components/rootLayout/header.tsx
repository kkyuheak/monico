"use client";

import { supabase } from "@/lib/supabase/supabase";
import { useAuthStore } from "@/store/authStore";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const Header = () => {
  const logOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
      alert("로그아웃 도중 에러가 발생했습니다.");
      return;
    }
  };

  const userInfo = useAuthStore((state) => state.userInfo);

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

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

      <ul className="flex gap-6 text-[16px]">
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
        <li onClick={logOut} className="cursor-pointer">
          로그아웃
        </li>
      </ul>
    </header>
  );
};

export default Header;
