import Image from "next/image";
import { useRouter } from "next/navigation";
import HashTag from "./HashTag";
import { diffDay } from "@/utils/diffDay";

interface PostBoxProps {
  created_at: string | Date;
  title: string;
  description: string;
  hashTags: string[];
  usersinfo: UserInfoType;
  id: number;
  type: string;
}

const PostBox = ({
  created_at,
  title,
  description,
  hashTags,
  usersinfo,
  id,
  type,
}: PostBoxProps) => {
  const router = useRouter();

  return (
    <>
      <div
        className="w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#282828] cursor-pointer"
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
          <p className="text-[14px] text-[#6e8566] dark:text-[#9CABBA]">
            {diffDay(created_at)}
          </p>
        </div>

        {/* 게시글 제목 */}
        <p className="font-medium text-[18px] mt-1">{title}</p>

        {/* 게시글 내용 */}
        <p className="text-[14px] text-[#6e8566] dark:text-[#9CABBA]">
          {description}
        </p>

        {/* 해시태그 */}
        {hashTags.length > 0 && (
          <ul className="mt-2 flex gap-2 h-[25px]">
            {hashTags.map((hashTag, index) => (
              <HashTag key={index} hashTag={hashTag} />
            ))}
          </ul>
        )}
      </div>
      <div className="h-[1px] w-full bg-gray-200 dark:bg-[#5c5c5c]"></div>
    </>
  );
};

export default PostBox;
