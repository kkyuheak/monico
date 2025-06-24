import { supabase } from "@/lib/supabase/supabase";

export const getPost = async (id: string, type: "coin" | "stock") => {
  const { data, error } = await supabase
    .from(`${type}_community`)
    .select(`*, usersinfo(*), ${type}_post_comments(*, usersinfo(*))`)
    .eq("id", id)
    .order("created_at", {
      ascending: false,
      foreignTable: `${type}_post_comments`,
    })
    .single();

  if (error) {
    console.error(error);
    return;
  }

  return data;
};
