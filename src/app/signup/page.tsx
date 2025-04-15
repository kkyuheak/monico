import AuthButton from "@/components/common/buttons/AuthButton";

const SignUpPage = () => {
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
        />
        <AuthButton
          text="카카오로 시작하기"
          css="bg-[#FEE500]"
          iconImgSrc={"/assets/authIcon/kakao_logo.png"}
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
