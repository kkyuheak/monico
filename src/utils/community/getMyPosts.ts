import { supabase } from "@/lib/supabase/supabase";

const POSTS_PER_PAGE = 5;

export const getMyPosts = async (tab: string, page: number) => {
  // 로그인 정보 가져오기
  const { data: userInfo, error: userInfoError } =
    await supabase.auth.getUser();

  if (userInfoError) {
    throw userInfoError;
  }

  const from = (page - 1) * POSTS_PER_PAGE;
  const to = from + POSTS_PER_PAGE - 1;

  const { data, error, count } = await supabase
    .from(`${tab}_community`)
    .select("*, usersinfo(*)", { count: "exact" })
    .eq("user_id", userInfo.user.id)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    throw error;
  }

  return { data, count: count ?? 0 };
};
