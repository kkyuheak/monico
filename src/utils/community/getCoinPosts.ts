import { supabase } from "@/lib/supabase/supabase";

export const getCoinPosts = async (tab: string) => {
  const { data, error } = await supabase
    .from(`${tab}_community`)
    .select("*, usersinfo(*)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  return data;
};
