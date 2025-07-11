"use client";

import SimpleButton from "@/components/common/buttons/SimpleButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/utils/getUserInfo";
import Image from "next/image";
import { useEffect, useState } from "react";
import { checkNickName } from "@/utils/profile/checkNickName";
import { twMerge } from "tailwind-merge";
import { updateUserInfo } from "@/utils/profile/updateUserInfo";
import { showToast } from "@/utils/showToast";
import { queryClient } from "@/components/provider/QueryProvider";

const ProfilePage = () => {
  const { data: userInfo, isLoading: userInfoLoading } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
  });
  // 유저가 변경할 프로필 이미지
  const [profileImage, setProfileImage] = useState<File | null>(null);

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
    setProfileImage(file);
  };

  // 유저 닉네임
  const [userNickName, setUserNickName] = useState<string>("");

  useEffect(() => {
    if (userInfo) {
      setUserNickName(userInfo.nickname || userInfo.original_name);
    }
  }, [userInfo]);

  const [isNickNameEdit, setIsNickNameEdit] = useState<boolean>(false);

  // 닉네임 중복검사
  const [isNickNameDuplicate, setIsNickNameDuplicate] = useState<
    boolean | null
  >(null);

  // 닉네임 중복검사 함수
  const checkNicknameFn = async () => {
    if (userNickName.trim() === "") {
      showToast("error", "닉네임을 입력해주세요.");
      return;
    }
    const result = await checkNickName(userNickName);
    if (result !== undefined) {
      setIsNickNameDuplicate(result);
    }
  };

  useEffect(() => {
    setIsNickNameDuplicate(null);
  }, [userNickName]);

  // 닉네임 input border
  const inputBorder = () => {
    if (isNickNameDuplicate === true) {
      return "border-red-500 dark:border-red-600 border-2";
    } else if (isNickNameDuplicate === false) {
      return "border-green-600 dark:border-green-600 border-2";
    } else {
      return "border-gray-300 dark:border-gray-600";
    }
  };

  // 유저 정보 업데이트 함수
  const updateUserInfoFn = async () => {
    // 닉네임 중복 체크
    if (isNickNameEdit) {
      if (isNickNameDuplicate === null || isNickNameDuplicate === true) {
        showToast("warning", "닉네임 중복확인을 해주세요.");
        throw new Error("닉네임 중복확인을 해주세요.");
      }
    }

    try {
      await updateUserInfo(profileImage, userNickName);
    } catch (error) {
      console.error(error);
      showToast("error", "프로필 업데이트에 실패했습니다.");
      return;
    }
  };

  const { mutate: updateUserInfoMutation } = useMutation({
    mutationFn: updateUserInfoFn,
    onSuccess: () => {
      showToast("success", "프로필 업데이트에 성공했습니다.");
      queryClient.invalidateQueries({
        queryKey: ["userInfo"],
      });
      setIsNickNameEdit(false);
      setUserNickName(userInfo?.nickname || userInfo?.original_name);
      setIsNickNameDuplicate(null);
    },
  });

  return (
    <div className="flex-1 py-6 px-10 flex flex-col gap-5">
      <h1 className="text-[24px] font-bold">프로필</h1>

      <div>
        <p className="font-semibold text-[20px] text-gray-800 dark:text-gray-100 mt-2">
          프로필 이미지
        </p>
        <div className="flex items-center gap-4 mt-2">
          {!userInfoLoading ? (
            <Image
              src={tempProfileImage || userInfo.profile_img}
              alt="profileImage"
              width={80}
              height={80}
              className="w-20 h-20 rounded-full border-2 border-gray-500 dark:border-gray-200"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-200 animate-pulse shadow"></div>
          )}
          <label
            htmlFor="profileImage"
            className="cursor-pointer text-[15px] font-semibold text-gray-700 bg-gray-200 dark:bg-gray-600 dark:text-gray-100 px-2 py-1 rounded-md"
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
        <p className="font-semibold text-[20px] text-gray-800 dark:text-gray-100 mt-2">
          닉네임
        </p>
        <div className="flex items-center gap-2 mt-2">
          <input
            type="text"
            placeholder="닉네임"
            className={twMerge(`w-[200px] h-[40px] border border-gray-300 dark:border-gray-600 rounded-md px-3 text-[15px]
              disabled:bg-gray-200 dark:disabled:bg-gray-600 ${inputBorder()}`)}
            value={userNickName}
            disabled={!isNickNameEdit || userInfoLoading}
            onChange={(e) => setUserNickName(e.target.value)}
          />
          {!isNickNameEdit && (
            <SimpleButton
              css="bg-gray-500 text-white w-[50px] h-[40px]"
              onClick={() => setIsNickNameEdit(true)}
            >
              수정
            </SimpleButton>
          )}
          {isNickNameEdit && (
            <>
              <SimpleButton
                css="bg-gray-500 text-white w-[50px] h-[40px]"
                onClick={() => {
                  setIsNickNameEdit(false);
                  setUserNickName(
                    userInfo?.nickname || userInfo?.original_name
                  );
                  setIsNickNameDuplicate(null);
                }}
              >
                취소
              </SimpleButton>
              {(isNickNameDuplicate === null ||
                isNickNameDuplicate === true) && (
                <SimpleButton
                  css="bg-green-900 text-white w-[70px] h-[40px]"
                  onClick={checkNicknameFn}
                >
                  중복 검사
                </SimpleButton>
              )}
            </>
          )}
        </div>
        {isNickNameDuplicate === false && (
          <p className="text-green-600 text-[13px] ml-1">
            사용 가능한 닉네임 입니다.
          </p>
        )}
        {isNickNameDuplicate === true && (
          <p className="text-red-600 text-[13px] ml-1">
            이미 사용중인 닉네임 입니다.
          </p>
        )}
      </div>

      <SimpleButton
        css="bg-gray-900 dark:bg-gray-700 text-white w-[80px]"
        onClick={updateUserInfoMutation}
      >
        저장하기
      </SimpleButton>
    </div>
  );
};

export default ProfilePage;
