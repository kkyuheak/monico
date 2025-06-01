import HashTag from "@/components/community/HashTag";
import PostLikeComment from "@/components/community/PostLikeComment";
import { getPost } from "@/utils/community/getPost";
import dayjs from "dayjs";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface DetailCoinPostPageProps {
  params: Promise<{ id: string }>;
}

const DetailCoinPostPage = async ({ params }: DetailCoinPostPageProps) => {
  const { id } = await params;

  const postData: PostData = await getPost(id, "coin");

  return (
    <div className="p-1">
      <Link
        href={"/community"}
        className="w-[150px] cursor-pointer flex items-center gap-1 hover:underline"
      >
        <ArrowLeft className="w-5" />
        <p className="font-semibold">목록으로 돌아가기</p>
      </Link>

      {/* 유저 정보 */}
      <div className="flex items-center gap-2 text-[#6E8566] mt-[18px] mb-3">
        <Image
          src={postData.usersinfo.profile_img}
          alt="userProfileImage"
          width={28}
          height={28}
          className="w-7 h-7 rounded-full"
        />
        <p className="text-[15px] font-bold">{postData.usersinfo.nickname}</p>
        <p className="text-[13px] text-[#6E8566]">
          {dayjs(postData.created_at).format("YYYY년 MM월 DD일")}
        </p>
      </div>

      <h1 className="text-[30px] font-bold">{postData.title}</h1>

      {/* 게시글 내용 */}
      <p className="text-[#121712] mt-2">{postData.description}</p>

      {/* 이미지 */}
      {postData.images.length > 0 && (
        <ul className="flex gap-2 mt-5 overflow-auto">
          {postData.images.map((image, index) => (
            <li key={index}>
              <Image src={image} alt="postImage" width={240} height={620} />
            </li>
          ))}
        </ul>
      )}

      {/* 해시태그 */}
      {postData.hashTags.length > 0 && (
        <ul className="flex gap-2 mt-2 h-[25px]">
          {postData.hashTags.map((hashTag, index) => (
            <HashTag key={index} hashTag={hashTag} />
          ))}
        </ul>
      )}

      {/* 좋아요, 댓글 */}
      <PostLikeComment id={id} type="coin" />
    </div>
  );
};

export default DetailCoinPostPage;
