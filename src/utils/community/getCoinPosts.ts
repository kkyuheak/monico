import { supabase } from "@/lib/supabase/supabase";

export const getCoinPosts = async () => {
  const { data, error } = await supabase
    .from("coin_community")
    .select("*, usersinfo(*)");

  if (error) {
    console.error(error);
    return;
  }

  return data;
};
