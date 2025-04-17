"use client";

import AuthButton from "@/components/common/buttons/AuthButton";
import { supabase } from "@/lib/supabase/supabase";

import { googleSignUp } from "@/utils/auth/login/googleSignUp";
import { kakaoLogin } from "@/utils/auth/login/kakaoLogin";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SignUpPage = () => {
  const router = useRouter();

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (data) {
      console.log(data);
    }
  };

  // 로그인 유저 리다이렉트
  // const checkLogin = async () => {
  //   const { data, error } = await supabase.auth.getSession();
  //   if (data.session !== null) {
  //     router.replace("/");
  //   }
  // };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="max-w-[850px] bg-gray-50 m-auto h-[calc(100vh-53px)] flex flex-col justify-center gap-15">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-[27px] font-bold">
          Monico에 오신 것을 환영합니다!
        </h1>
        <h2 className="text-[20px] font-semibold">회원가입</h2>
      </div>

      {/* 카카오, 구글 소셜 로그인 */}
      <div className="flex flex-col gap-4 items-center text-[14px] font-semibold">
        <AuthButton
          text="구글로 시작하기"
          iconImgSrc="/assets/authIcon/google.svg"
          css="bg-white border border-[#e5e5e5]"
          onClick={() => googleSignUp()}
        />
        <AuthButton
          text="카카오로 시작하기"
          css="bg-[#FEE500]"
          iconImgSrc={"/assets/authIcon/kakao_logo.png"}
          onClick={() => kakaoLogin()}
        />
        <p className="font-semibold text-gray-500 text-[13px]">
          이미 회원이신가요?{" "}
          <span className="cursor-pointer hover:underline">로그인</span>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
