import { supabase } from "@/lib/supabase/supabase";

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
  const { data, error } = await supabase.from(`${category}_community`).insert({
    title,
    description,
    tags,
  });
};
