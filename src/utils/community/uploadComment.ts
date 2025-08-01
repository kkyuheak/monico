import { supabase } from "@/lib/supabase/supabase";

export const uploadComment = async (
  postId: string,
  comment: string,
  type: "coin" | "stock"
) => {
  const { data: userInfo, error: userInfoError } =
    await supabase.auth.getUser();

  if (userInfoError) {
    console.error(userInfoError);
    return;
  }

  const { id: userId } = userInfo.user;

  const { data: commentData, error: commentError } = await supabase
    .from(`${type}_post_comments`)
    .insert({
      postId,
      content: comment,
      userId,
    })
    .select()
    .single();

  if (commentError) {
    console.error(commentError);
    return;
  }

  return commentData;
};
