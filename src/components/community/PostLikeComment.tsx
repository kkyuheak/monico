"use client";

import { postLike } from "@/utils/community/postLike";
import { getUserInfo } from "@/utils/getUserInfo";
import { showToast } from "@/utils/showToast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Heart, MessageCircleMore } from "lucide-react";
import { useEffect, useState } from "react";
import CommentInput from "../common/input/CommentInput";
import Image from "next/image";
import { diffDay } from "@/utils/diffDay";

interface PostLikeCommentProps {
  type: "coin" | "stock";
  id: string;
  isLike: string[];
  comments: CoinPostComment[];
}

const PostLikeComment = ({
  type,
  id,
  isLike,
  comments,
}: PostLikeCommentProps) => {
  const { data: userInfo, isLoading: userInfoLoading } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
  });

  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(isLike.length);

  useEffect(() => {
    if (userInfo && !userInfoLoading) {
      const isLiked = isLike.includes(userInfo.id);
      setLike(isLiked);
    }
  }, [userInfo, isLike, userInfoLoading]);

  const handleLikeClick = async () => {
    // 로딩 시 return
    if (userInfoLoading) {
      throw new Error("잠시 후 다시 시도해주세요.");
    }

    // 비로그인 시 return
    if (!userInfo) {
      throw new Error("로그인이 필요한 서비스입니다.");
    }

    await postLike(id, type);
  };

  const { mutate: likeClickMutate } = useMutation({
    mutationFn: () => handleLikeClick(),
    onSuccess: () => {
      if (like) {
        setLikeCount((prev) => prev - 1);
      } else {
        setLikeCount((prev) => prev + 1);
      }
      setLike((prev) => !prev);
    },
    onError: (error) => {
      showToast("error", error.message);
    },
  });

  // 댓글
  const [commentsList, setCommentsList] = useState(comments);

  return (
    <>
      {/* 좋아요, 댓글 아이콘 */}
      <div className="text-[#6E8566] font-bold text-[13px] flex items-center gap-4 mt-5">
        <div className="flex items-center gap-2">
          <Heart
            size={24}
            fill={like ? "red" : "white"}
            stroke={like ? "red" : "#6E8566"}
            className="cursor-pointer"
            onClick={() => likeClickMutate()}
          />
          <p>{likeCount}</p>
        </div>
        <div className="flex items-center gap-2">
          <MessageCircleMore size={24} />
          <p>{commentsList.length}</p>
        </div>
      </div>

      {/* 댓글 */}
      <div className="mt-5">
        <p className="font-bold text-[22px] text-[#121712]">댓글</p>
        <CommentInput postId={id} setCommentsList={setCommentsList} />

        <div className="mt-4">
          {commentsList.map((comment) => {
            return (
              <div
                key={comment.id}
                className="flex items-start gap-3 min-h-[70px] py-2 mt-1"
              >
                <Image
                  src={comment.usersinfo.profile_img}
                  alt="userProfileImage"
                  width={35}
                  height={35}
                  className="rounded-full"
                />

                <div className="text-[#121712]">
                  <div className="flex items-center gap-2">
                    <p className="text-[16px] font-bold">
                      {comment.usersinfo.nickname ||
                        comment.usersinfo.original_name}
                    </p>

                    <p className="text-[13px] text-[#6E8566]">
                      {diffDay(comment.created_at)}
                    </p>
                  </div>
                  <p className="text-[14px] whitespace-pre-line">
                    {comment.content}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PostLikeComment;
