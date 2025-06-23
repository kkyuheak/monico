import { supabase } from "@/lib/supabase/supabase";
import { getUserInfo } from "../getUserInfo";
import dayjs from "dayjs";
import { showToast } from "../showToast";

export const updateUserInfo = async (
  profileImage: File | null,
  nickname: string
) => {
  const userInfo = await getUserInfo();

  // 이미지 업로드
  const fileName = `${userInfo.id}-${dayjs().format("YYYYMMDDHHmmss")}`;
  const filePath = `profile-images/${fileName}`;

  if (profileImage) {
    const { error: uploadError } = await supabase.storage
      .from("user-profile-images")
      .upload(filePath, profileImage);
    if (uploadError) {
      showToast("error", "이미지 업로드에 실패했습니다.");
      console.error(uploadError);
      return;
    }

    const { data: uploadImageUrl } = supabase.storage
      .from("user-profile-images")
      .getPublicUrl(filePath);

    // 닉네임과 이미지 테이블 업데이트
    const { data: allUpdateData, error: allUpdateError } = await supabase
      .from("usersinfo")
      .update({ nickname, profile_img: uploadImageUrl.publicUrl })
      .eq("id", userInfo.id)
      .select()
      .single();

    if (allUpdateError) {
      console.error(allUpdateError);
      showToast("error", "닉네임 업데이트에 실패했습니다.");
      return;
    }

    return allUpdateData;
  }

  // 닉네임만 업데이트
  const { data: nicknameUpdateData, error: nicknameUpdateError } =
    await supabase
      .from("usersinfo")
      .update({ nickname })
      .eq("id", userInfo.id)
      .select()
      .single();

  if (nicknameUpdateError) {
    console.error(nicknameUpdateError);
    showToast("error", "닉네임 업데이트에 실패했습니다.");
    return;
  }

  return nicknameUpdateData;
};
