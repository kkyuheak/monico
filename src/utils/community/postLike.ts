import { supabase } from "@/lib/supabase/supabase";

export const postLike = async (id: string, type: "coin" | "stock") => {
  const { data: userInfo, error: getUserError } = await supabase.auth.getUser();

  if (getUserError) {
    throw new Error("로그인이 필요한 서비스입니다.");
  }

  const userId = userInfo.user.id;

  // 해당 게시글 좋아요 여부 확인
  const { data: postLikeData, error: postLikeError } = await supabase
    .from(`${type}_community`)
    .select("likes")
    .eq("id", id)
    .single();

  if (postLikeError) {
    throw new Error("잠시 후 다시 시도해주세요.");
  }

  const { likes } = postLikeData;

  // 좋아요 여부 확인 후 업데이트 likes 배열
  const updateLikes = likes.includes(userId)
    ? likes.filter((like: string) => like !== userId)
    : [...likes, userId];

  // 게시글 좋아요 업데이트
  const { data: updatePostLikeData, error: updatePostLikeError } =
    await supabase
      .from(`${type}_community`)
      .update({ likes: updateLikes })
      .eq("id", id)
      .select()
      .single();

  if (updatePostLikeError) {
    throw new Error("잠시 후 다시 시도해주세요.");
  }

  return updatePostLikeData;
};
