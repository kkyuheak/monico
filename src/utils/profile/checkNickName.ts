import { supabase } from "@/lib/supabase/supabase";

export const checkNickName = async (nickName: string) => {
  const { data, error } = await supabase
    .from("usersinfo")
    .select("nickname")
    .eq("nickname", nickName)
    .maybeSingle();

  console.log(data);

  if (error && error.code !== "PGRST116") {
    console.log(error);
    alert("에러가 발생했습니다.");
    return;
  }

  if (data) {
    return true;
  } else {
    return false;
  }
};
