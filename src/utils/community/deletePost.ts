import { supabase } from "@/lib/supabase/supabase";
import { showToast } from "../showToast";

export const deletePost = async (id: number, type: "coin" | "stock") => {
  const { error } = await supabase
    .from(`${type}_community`)
    .delete()
    .eq("id", id);

  if (error) {
    showToast("error", "잠시 후 다시 시도해주세요.");
    throw error;
  }
};
