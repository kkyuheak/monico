import { supabase } from "@/lib/supabase/supabase";
import { getUserInfo } from "../getUserInfo";

export const updateUserInfo = async (nickname: string) => {
  const userInfo = await getUserInfo();

  // 닉네임 업데이트
  const { data, error } = await supabase
    .from("usersinfo")
    .update({ nickname })
    .eq("id", userInfo.id);

  if (error) {
    console.error(error);
    return;
  }

  console.log(data);
};
