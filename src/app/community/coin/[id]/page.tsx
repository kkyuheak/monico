import HashTag from "@/components/community/HashTag";
import { getPost } from "@/utils/community/getPost";
import { ArrowLeft, Heart, MessageCircleMore } from "lucide-react";
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

      <h1 className="text-[28px] font-bold mt-[20px]">{postData.title}</h1>

      {/* 유저 정보 */}
      <div className="flex items-center gap-2 text-[#6E8566]">
        <Image
          src={postData.usersinfo.profile_img}
          alt="userProfileImage"
          width={28}
          height={28}
          className="w-7 h-7 rounded-full"
        />
        <p className="text-[17px] font-medium">{postData.usersinfo.nickname}</p>
        <p className="text-[14px] text-[#6E8566]">2025년 5월 29일</p>
      </div>

      {/* 게시글 내용 */}
      <p className="text-[#121712] mt-2">{postData.description}</p>

      {/* 이미지 */}
      {postData.images.length > 0 && (
        <ul className="flex gap-2 mt-5 overflow-auto">
          {postData.images.map((image, index) => (
            <li key={index}>
              {/* <div className="w-[240px] h-[620px] bg-[#28613b]"></div> */}
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
      <div className="text-[#6E8566] font-bold text-[13px] flex items-center gap-4 mt-5">
        <div className="flex items-center gap-2">
          <Heart size={24} />
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
    </div>
  );
};

export default DetailCoinPostPage;
