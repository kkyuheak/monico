"use client";

import SimpleButton from "@/components/common/buttons/SimpleButton";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/utils/getUserInfo";
import Image from "next/image";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const { data: userInfo, isLoading: userInfoLoading } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
  });

  // 유저가 프로필 이미지 변경 시 미리보기
  const [tempProfileImage, setTempProfileImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (tempProfileImage) {
      URL.revokeObjectURL(tempProfileImage);
    }
    const file = e.target.files?.[0];
    if (!file) return;

    const previewImg = URL.createObjectURL(file);
    setTempProfileImage(previewImg);
  };

  useEffect(() => {
    console.log(tempProfileImage);
  }, [tempProfileImage]);

  return (
    <div className="flex-1 py-6 px-10 flex flex-col gap-5">
      <h1 className="text-[24px] font-bold">프로필</h1>

      <div>
        <p className="font-semibold text-[20px] text-gray-800 mt-2">
          프로필 이미지
        </p>
        <div className="flex items-center gap-4 mt-2">
          {!userInfoLoading ? (
            <Image
              src={tempProfileImage || userInfo.profile_img}
              alt="profileImage"
              width={80}
              height={80}
              className="w-20 h-20 rounded-full"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-200 animate-pulse shadow"></div>
          )}
          <label
            htmlFor="profileImage"
            className="cursor-pointer text-[15px] font-semibold text-gray-700 bg-gray-200 px-2 py-1 rounded-md"
          >
            이미지 변경
          </label>
          <input
            type="file"
            accept="image/*"
            id="profileImage"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
      </div>

      <div>
        <p className="font-semibold text-[20px] text-gray-800 mt-2">닉네임</p>
        <div className="flex items-center gap-2 mt-2">
          <input
            type="text"
            placeholder="닉네임"
            className="w-[200px] h-[40px] border border-gray-300 rounded-md px-3 text-[15px]
            disabled:bg-gray-200"
          />
          <SimpleButton css="bg-gray-500 text-white w-[50px] h-[40px]">
            수정
          </SimpleButton>
          <SimpleButton css="bg-green-900 text-white w-[70px] h-[40px]">
            중복 검사
          </SimpleButton>
        </div>
      </div>

      <SimpleButton css="bg-gray-900 text-white w-[80px]">
        저장하기
      </SimpleButton>
    </div>
  );
};

export default ProfilePage;
