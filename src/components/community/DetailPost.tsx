import BackButton from "@/components/common/buttons/BackButton";
import HashTag from "@/components/community/HashTag";
import PostImages from "@/components/community/PostImages";
import PostLikeComment from "@/components/community/PostLikeComment";
import PostMoreBtn from "@/components/community/PostMoreBtn";
import { getPost } from "@/utils/community/getPost";
import { diffDay } from "@/utils/diffDay";
import Image from "next/image";
import { notFound } from "next/navigation";

interface DetailPostProps {
  id: string;
  type: "coin" | "stock";
}

const DetailPost = async ({ id, type }: DetailPostProps) => {
  const postData: PostData = await getPost(id, type);

  if (!postData) {
    return notFound();
  }

  return (
    <div className="p-1">
      <BackButton name="목록으로 돌아가기" />

      {/* 유저 정보 */}
      <div className="flex justify-between items-center gap-2 text-[#6E8566] dark:text-[#ededed] mt-[18px] mb-3">
        <div className="flex items-center gap-2">
          <Image
            src={postData.usersinfo.profile_img}
            alt="userProfileImage"
            width={28}
            height={28}
            className="w-7 h-7 rounded-full"
          />
          <p className="text-[15px] font-bold">{postData.usersinfo.nickname}</p>
          <p className="text-[13px]">{diffDay(postData.created_at)}</p>
        </div>

        <div className="">
          <PostMoreBtn postData={postData} type={type} />
        </div>
      </div>

      <h1 className="text-[30px] font-bold">{postData.title}</h1>

      {/* 게시글 내용 */}
      <p className="text-[#121712] dark:text-[#ededed] mt-2">
        {postData.description}
      </p>

      {/* 이미지 */}
      {postData.images.length > 0 && <PostImages postData={postData} />}

      {/* 해시태그 */}
      {postData.hashTags.length > 0 && (
        <ul className="flex gap-2 mt-2 h-[25px]">
          {postData.hashTags.map((hashTag, index) => (
            <HashTag key={index} hashTag={hashTag} />
          ))}
        </ul>
      )}

      {/* 좋아요, 댓글 */}
      <PostLikeComment
        id={id}
        type={type}
        isLike={postData.likes}
        comments={
          type === "coin"
            ? postData.coin_post_comments
            : postData.stock_post_comments
        }
      />
    </div>
  );
};

export default DetailPost;
