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

export interface PostingFormValues {
  title: string;
  description: string;
  tags: string;
  category: string;
}

const PostingForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostingFormValues>();

  const onSubmit: SubmitHandler<PostingFormValues> = (data) => {
    console.log(data);
  };

  if (errors) {
    console.log(errors);
  }

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
