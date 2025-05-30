"use client";

import { twMerge } from "tailwind-merge";
import SimpleButton from "../common/buttons/SimpleButton";
import PostingInput from "../common/input/PostingInput";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { inputTrimValidationFn } from "@/utils/inputTrimValidationFn";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { posting } from "@/utils/community/posting";
import { useMutation } from "@tanstack/react-query";
import { showToast } from "@/utils/showToast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export interface PostingFormValues {
  title: string;
  description: string;
  tags: string;
  category: string;
  images: FileList;
}

const PostingForm = () => {
  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostingFormValues>();

  const onSubmit: SubmitHandler<PostingFormValues> = (data) => {
    postingMutate(data);
  };

  const { mutate: postingMutate } = useMutation({
    mutationFn: (data: PostingFormValues) => posting(data),
    onSuccess: () => {
      showToast("success", "게시글이 성공적으로 작성되었습니다.");
      // router.push("/");
    },
  });

  // 이미지 미리보기
  const [imgPreview, setImgPreview] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (imgPreview.length > 0) {
      imgPreview.forEach((preview) => URL.revokeObjectURL(preview));
    }

    const files = e.target.files;
    if (files) {
      console.log(files);
      const fileArray = Array.from(files);
      console.log(fileArray);
      const previewArray = fileArray.map((file) => URL.createObjectURL(file));
      setImgPreview((prev) => [...prev, ...previewArray]);
    }
  };

  // 이미지 미리보기 삭제
  const handleImagePreviewDelete = (index: number) => {
    setImgPreview((prev) => {
      const newPreview = [...prev];
      newPreview.splice(index, 1);
      return newPreview;
    });
  };

  useEffect(() => {
    console.log(imgPreview);
  }, [imgPreview]);

  return (
    <form
      className=" flex flex-col gap-4 mt-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <p className="font-bold mb-1 block">카테고리</p>
        <Controller
          name="category"
          control={control}
          rules={{ required: "카테고리를 선택해주세요." }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger
                className={twMerge(
                  "w-[180px] h-[56px] cursor-pointer border-[#dee3db]",
                  errors.category ? "border-red-500" : ""
                )}
              >
                <SelectValue placeholder="커뮤니티" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="coin">코인</SelectItem>
                <SelectItem value="stock">주식</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.category && (
          <p className="text-red-500 text-[12px] ml-1">
            {errors.category.message}
          </p>
        )}
      </div>

      <PostingInput
        placeholder="제목을 입력해주세요"
        register={register}
        label="title"
        errors={errors}
      />

      <div>
        <label htmlFor="description" className="font-bold mb-1 block">
          내용
        </label>
        <textarea
          placeholder="내용을 입력해주세요"
          className={twMerge(
            "w-[448px] h-[200px] rounded-[12px] bg-[#f2f5f2] px-4 py-3 outline-none block resize-none",
            errors.description ? "border border-red-500" : ""
          )}
          {...register("description", {
            required: "내용을 입력해주세요",
            validate: inputTrimValidationFn,
          })}
        ></textarea>
        {errors.description && (
          <p className="text-red-500 text-[12px] ml-1">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* 이미지를 선택 후 추가할 때 */}
      {imgPreview.length > 0 && (
        <div className="flex justify-end">
          <label
            htmlFor="imgUpload"
            className="w-[84px] h-[40px] flex items-center justify-center font-bold text-[14px] bg-[#f2f5f2] rounded-[20px] cursor-pointer"
          >
            이미지 추가
          </label>
          <input
            type="file"
            id="imgUpload"
            className="hidden"
            accept="image/*"
            {...register("images")}
            onChange={handleImageChange}
            multiple
          />
        </div>
      )}

      {/* 이미지를 선택 안했을때 */}
      <div
        className={twMerge(
          "w-full h-[232px] flex flex-col items-center justify-center gap-3 border border-dashed border-[#dee3db] rounded-[12px]",
          imgPreview.length > 0 ? "items-start p-1" : ""
        )}
      >
        {imgPreview.length === 0 ? (
          <>
            <p className="text-[18px] font-bold text-[#121712]">
              이미지 추가하기
            </p>
            <label
              htmlFor="imgUpload"
              className=" w-[84px] h-[40px] flex items-center justify-center font-bold text-[14px] bg-[#f2f5f2] rounded-[20px] cursor-pointer"
            >
              업로드
            </label>
            <Controller
              name="images"
              control={control}
              render={({ field }) => (
                <>
                  <input
                    type="file"
                    id="imgUpload"
                    className="hidden"
                    accept="image/*"
                    {...register("images")}
                    onChange={(e) => {
                      const files = e.target.files;
                      if (!files) return;

                      handleImageChange(e);

                      field.onChange(files);
                    }}
                    multiple
                  />
                </>
              )}
            />
          </>
        ) : (
          <div className="h-full flex gap-2 overflow-scroll scrollbar-none">
            {imgPreview.map((preview, index) => (
              <div
                key={index}
                className="h-full shrink-0 flex items-center justify-center bg-[#f2f5f2] border rounded-[12px] relative
                group"
              >
                <Image
                  src={preview}
                  alt="preview"
                  width={200}
                  height={100}
                  className="h-auto"
                />
                <div
                  className="hidden group-hover:block w-full h-full absolute bg-[#73737382] rounded-[12px] cursor-pointer"
                  onClick={() => handleImagePreviewDelete(index)}
                >
                  <X className="absolute top-2 right-2 cursor-pointer" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <PostingInput
        placeholder="태그를 쉼표로 구분하여 입력해주세요"
        register={register}
        label="tags"
        errors={errors}
      />

      <div className="flex justify-end">
        <SimpleButton css="w-[84px] h-[40px] bg-[#e8f6e8]" type="submit">
          올리기
        </SimpleButton>
      </div>
    </form>
  );
};

export default PostingForm;
