import { supabase } from "@/lib/supabase/supabase";
import { getUserInfo } from "../getUserInfo";
import { showToast } from "../showToast";

interface PostingParams {
  title: string;
  description: string;
  tags: string;
  category: string;
  images: FileList;
}

export const posting = async ({
  title,
  description,
  tags,
  category,
  images,
}: PostingParams) => {
  const userInfo = await getUserInfo();

  const { id: user_id } = userInfo;

  const hashTags =
    tags.trim().length > 0 ? tags.split(",").map((tag) => tag.trim()) : [];

  // 이미지 업로드

  const uploadImagePath: string[] = [];

  if (images.length > 0) {
    for (const imageFile of Array.from(images)) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${user_id}-${Date.now()}.${fileExt}`;
      const filePath = `${category}-community-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(`${category}-community-images`)
        .upload(filePath, imageFile);

      if (uploadError) {
        showToast("error", "이미지 업로드에 실패했습니다.");
        console.error(uploadError);
        throw new Error(uploadError.message);
      }

      const { data: uploadImageUrl } = supabase.storage
        .from(`${category}-community-images`)
        .getPublicUrl(filePath);

      uploadImagePath.push(uploadImageUrl.publicUrl);
    }
  }

  const { data, error } = await supabase
    .from(`${category}_community`)
    .insert({
      user_id,
      title,
      description,
      hashTags,
      images: uploadImagePath,
    })
    .select()
    .single();

  if (error) {
    console.error(error);
    showToast("error", "게시글 작성에 실패했습니다. 다시 시도해주세요.");
    throw new Error(error.message);
  }

  return { data, category };
};
