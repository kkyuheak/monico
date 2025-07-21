"use client";

import AuthButton from "@/components/common/buttons/AuthButton";
import { googleSignUp } from "@/utils/auth/login/googleSignUp";
import { kakaoLogin } from "@/utils/auth/login/kakaoLogin";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();

  return (
    <div className="max-w-[850px] bg-gray-50 dark:bg-[#1C2126] m-auto mt-[53px] h-[calc(100vh-53px)] flex flex-col justify-center gap-15">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-[27px] font-bold">
          Monico에 오신 것을 환영합니다!
        </h1>
        <h2 className="text-[20px] font-semibold">로그인</h2>
      </div>

      {/* 카카오, 구글 소셜 로그인 */}
      <div className="flex flex-col gap-4 items-center text-[14px] font-semibold">
        <AuthButton
          text="구글로 로그인하기"
          iconImgSrc="/assets/authIcon/google.svg"
          css="bg-white border border-[#e5e5e5] dark:bg-[#1d1e20] dark:border-[#686868]"
          onClick={() => googleSignUp()}
        />
        <AuthButton
          text="카카오로 로그인하기"
          css="bg-[#FEE500] dark:bg-[#FEE500] dark:text-black"
          iconImgSrc={"/assets/authIcon/kakao_logo.png"}
          onClick={() => kakaoLogin()}
        />
        <p className="font-semibold text-gray-500 text-[13px]">
          아직 회원이 아니신가요?{" "}
          <span
            className="cursor-pointer hover:underline"
            onClick={() => router.push("/signup")}
          >
            회원가입
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
