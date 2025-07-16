import { supabase } from "@/lib/supabase/supabase";

const POSTS_PER_PAGE = 10;

export const getCoinPosts = async (tab: string, page: number) => {
  const from = (page - 1) * POSTS_PER_PAGE;
  const to = from + POSTS_PER_PAGE - 1;

  const { data, error, count } = await supabase
    .from(`${tab}_community`)
    .select("*, usersinfo(*)", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error(error);
    return;
  }

  return { data, count };
};
