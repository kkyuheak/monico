"use client";

import { postLike } from "@/utils/community/postLike";
import { getUserInfo } from "@/utils/getUserInfo";
import { showToast } from "@/utils/showToast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Heart, MessageCircleMore } from "lucide-react";
import { useEffect, useState } from "react";
import CommentInput from "../common/input/CommentInput";

interface PostLikeCommentProps {
  type: "coin" | "stock";
  id: string;
  isLike: string[];
}

const PostLikeComment = ({ type, id, isLike }: PostLikeCommentProps) => {
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
      showToast("info", "잠시 후 다시 시도해주세요.");
      return;
    }

    // 비로그인 시 return
    if (!userInfo) {
      showToast("error", "로그인이 필요한 서비스입니다.");
      return;
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
    onError: () => {
      showToast("error", "잠시 후 다시 시도해주세요.");
    },
  });

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
          <p>123</p>
        </div>
      </div>

      {/* 댓글 */}
      <div className="mt-5">
        <p className="font-bold text-[22px] text-[#121712]">댓글</p>
        <CommentInput />
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-start gap-2 h-[95px] py-4">
            <div className="shrink-0 w-10 h-10 rounded-full bg-[#6E8566]"></div>

            <div className="text-[#121712]">
              <p className=" text-[14px] font-bold">닉네임</p>
              <p className="">
                Great analysis, Ethan! I&apos;ve been following Bitcoin closely
                and agree with your points. The institutional interest is
                definitely a game-changer.
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PostLikeComment;
