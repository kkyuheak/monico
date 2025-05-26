"use client";

import { twMerge } from "tailwind-merge";
import SimpleButton from "../common/buttons/SimpleButton";
import PostingInput from "../common/input/PostingInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";

export interface PostingFormValues {
  title: string;
  description: string;
  tags: string;
}

const PostingForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostingFormValues>();

  const onSubmit: SubmitHandler<PostingFormValues> = (data) => {
    console.log(data);
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <form
      className=" flex flex-col gap-4 mt-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <PostingInput
        placeholder="제목을 입력해주세요"
        register={register}
        label="title"
        errors={errors}
        required
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
          {...register("description", { required: "내용을 입력해주세요" })}
        ></textarea>
        {errors.description && (
          <p className="text-red-500 text-[12px]">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="w-full h-[232px] flex flex-col items-center justify-center gap-3 border border-dashed border-[#dee3db] rounded-[12px]">
        <p className="text-[18px] font-bold text-[#121712]">이미지 추가하기</p>
        <label
          htmlFor="imgUpload"
          className=" w-[84px] h-[40px] flex items-center justify-center font-bold text-[14px] bg-[#f2f5f2] rounded-[20px] cursor-pointer"
        >
          업로드
        </label>
        <input
          type="file"
          id="imgUpload"
          className="hidden"
          accept="image/*"
          multiple
        />
      </div>

      <PostingInput
        placeholder="태그를 쉼표로 구분하여 입력해주세요"
        register={register}
        label="tags"
        required
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
