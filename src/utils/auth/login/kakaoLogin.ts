import { supabase } from "@/lib/supabase/supabase";

export const kakaoLogin = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
    options: {
      redirectTo: "/",
    },
  });

  if (error) {
    console.error(error);
    alert("에러가 발생했습니다");
    return;
  }
};
