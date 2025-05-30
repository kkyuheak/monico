import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import HashTag from "./HashTag";

interface PostBoxProps {
  createdAt: string | Date;
  title: string;
  description: string;
  hashTags: string[];
  usersinfo: UserInfoType;
  id: number;
  type: string;
}

const PostBox = ({
  createdAt,
  title,
  description,
  hashTags,
  usersinfo,
  id,
  type,
}: PostBoxProps) => {
  const createdAtDate = dayjs(createdAt).format("YYYY년 MM월 DD일");

  const router = useRouter();

  return (
    <>
      <div
        className="w-full p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
        onClick={() => router.push(`/community/${type}/${id}`)}
      >
        {/* 유저 프로필사진, 이름, 올린 시간 */}
        <div className="flex items-center gap-2 ">
          <Image
            src={usersinfo.profile_img}
            alt="userProfileImage"
            width={28}
            height={28}
            className="rounded-full w-7 h-7 shadow"
          />
          <p className="font-semibold">
            {usersinfo.nickname || usersinfo.original_name}
          </p>
          <p className="text-[14px] text-[#6e8566]">{createdAtDate}</p>
        </div>

        {/* 게시글 제목 */}
        <p className="font-medium text-[18px] mt-1">{title}</p>

        {/* 게시글 내용 */}
        <p className="text-[14px] text-[#6e8566]">{description}</p>

        {/* 해시태그 */}
        {hashTags.length > 0 && (
          <ul className="mt-2 flex gap-2 h-[25px]">
            {hashTags.map((hashTag, index) => (
              <HashTag key={index} hashTag={hashTag} />
            ))}
          </ul>
        )}
      </div>
      <div className="h-[1px] w-full bg-gray-200"></div>
    </>
  );
};

export default PostBox;
