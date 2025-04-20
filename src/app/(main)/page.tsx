"use client";
import MainButton from "@/components/common/buttons/MainButton";
import { supabase } from "@/lib/supabase/supabase";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const MainPage = () => {
  const router = useRouter();

  const setUserInfo = useAuthStore((state) => state.setUserInfo);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session === null) return;

      router.replace("/");

      const { data: loginUserInfo, error } = await supabase.auth.getUser();
      if (error) {
        console.error(error);
        alert("에러가 발생했습니다");
        return;
      }

      if (loginUserInfo.user !== null) {
        const { data: userInfo, error } = await supabase
          .from("usersinfo")
          .select("*")
          .eq("email", loginUserInfo.user.email)
          .single();
        console.log(userInfo);

        if (error) {
          console.error(error);
          alert("에러가 발생했습니다");
          return;
        }

        setUserInfo(userInfo);
      }
    };

    handleOAuthCallback();
  }, []);

  return (
    <div>
      <section className="h-[calc(100vh-53px)] bg-blue-50 flex flex-col justify-center">
        {/* 소개 멘트 */}
        <div className="font-bold flex flex-col items-center justify-center gap-4 ">
          <h1 className="text-[32px]">
            실시간으로 변하는 시장,{" "}
            <span className="text-[#1E90FF] text-[40px]">모니코</span> 하나로
            추적하세요.
          </h1>
          <h2 className="text-[30px]">
            코인부터 주식까지, 투자 시장의 모든 흐름을 한눈에.
          </h2>
        </div>

        {/* 코인/주식 버튼 */}
        <div className="flex  items-center justify-center gap-10 mt-[150px]">
          <MainButton link="/coin" css="bg-[#1E90FF]">
            코인 보러가기
          </MainButton>
          <MainButton link="/stock" css="bg-[#7B61FF]">
            주식 보러가기
          </MainButton>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
