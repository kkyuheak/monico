import { supabase } from "@/lib/supabase/supabase";
import { getUserInfo } from "../getUserInfo";
import { showToast } from "../showToast";

interface PostingParams {
  title: string;
  description: string;
  tags: string;
  category: string;
}

export const posting = async ({
  title,
  description,
  tags,
  category,
}: PostingParams) => {
  const { id: user_id } = await getUserInfo();

  const hashTags = tags.split(",").map((tag) => tag.trim());

  const { data, error } = await supabase
    .from(`${category}_community`)
    .insert({
      user_id,
      title,
      description,
      hashTags,
    })
    .select()
    .single();

  if (error) {
    console.error(error);
    showToast("error", "에러가 발생했습니다.");
    return;
  }

  console.log(data);

  return data;
};
