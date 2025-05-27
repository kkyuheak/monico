import { supabase } from "@/lib/supabase/supabase";
import { getUserInfo } from "../getUserInfo";

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

  const { data, error } = await supabase
    .from(`${category}_community`)
    .insert({
      user_id,
      title,
      description,
      hashTags: [tags],
    })
    .select()
    .single();

  if (error) {
    console.error(error);
    return;
  }

  console.log(data);

  return data;
};
