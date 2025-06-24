import { supabase } from "@/lib/supabase/supabase";

export const kakaoLogin = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
    options: {
      redirectTo: "http://localhost:3000",
    },
  });

  if (error) {
    console.error(error);
    alert("에러가 발생했습니다");
    return;
  }
};
