import { supabase } from "@/lib/supabase/supabase";

export const getMyPosts = async (tab: string) => {
  // 로그인 정보 가져오기
  const { data: userInfo, error: userInfoError } =
    await supabase.auth.getUser();

  if (userInfoError) {
    throw userInfoError;
  }

  const { data, error } = await supabase
    .from(`${tab}_community`)
    .select("*, usersinfo(*)")
    .eq("user_id", userInfo.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  console.log(data);

  return data;
};
