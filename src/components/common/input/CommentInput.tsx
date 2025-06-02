"use client";

import { useRef } from "react";
import SimpleButton from "../buttons/SimpleButton";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface CommentInputData {
  comment: string;
}

const CommentInput = () => {
  // 댓글 textarea 자동 높이조절
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentInputData>();

  const { ref, ...rest } = register("comment", {
    required: "댓글을 입력해주세요",
  });

  const onSubmit = (data: CommentInputData) => {
    console.log(data);
  };

  if (errors) {
    console.log(errors);
  }

  return (
    <form
      className={twMerge(
        "flex items-end gap-2 mt-2 p-2 border border-[#dee3db] rounded-[12px]",
        errors.comment && "border-red-500"
      )}
      onSubmit={handleSubmit(onSubmit)}
    >
      <textarea
        className={twMerge(
          "w-full text-[15px] px-1 outline-none resize-none",
          errors.comment && "placeholder:text-red-500"
        )}
        placeholder="댓글을 입력해주세요"
        ref={(e) => {
          ref(e);
          textareaRef.current = e;
        }}
        {...rest}
        onInput={resizeTextarea}
      />
      <SimpleButton css="w-[75px] h-[45px] bg-[#dee3db]" type="submit">
        등록
      </SimpleButton>
    </form>
  );
};

export default CommentInput;
