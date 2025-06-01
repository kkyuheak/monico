"use client";

import { postLike } from "@/utils/community/postLike";
import { Heart, MessageCircleMore } from "lucide-react";
import { useState } from "react";

interface PostLikeCommentProps {
  type: "coin" | "stock";
  id: string;
}

const PostLikeComment = ({ type, id }: PostLikeCommentProps) => {
  const [like, setLike] = useState(false);

  const handleLikeClick = async () => {
    setLike((prev) => !prev);
    await postLike(id, type);
  };

  console.log(type, id);

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
            onClick={handleLikeClick}
          />
          <p>123</p>
        </div>
        <div className="flex items-center gap-2">
          <MessageCircleMore size={24} />
          <p>123</p>
        </div>
      </div>

      {/* 댓글 */}
      <div className="mt-5">
        <p className="font-bold text-[22px] text-[#121712]">댓글</p>
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
