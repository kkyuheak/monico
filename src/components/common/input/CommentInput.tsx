"use client";

import { Dispatch, SetStateAction, useRef } from "react";
import SimpleButton from "../buttons/SimpleButton";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { uploadComment } from "@/utils/community/uploadComment";
import { inputTrimValidationFn } from "@/utils/inputTrimValidationFn";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/utils/getUserInfo";
import { showToast } from "@/utils/showToast";

interface CommentInputFormData {
  comment: string;
}

interface CommentInputProps {
  postId: string;
  setCommentsList: Dispatch<SetStateAction<PostComment[]>>;
  type: "coin" | "stock";
}

const CommentInput = ({ postId, setCommentsList, type }: CommentInputProps) => {
  const { data: userInfo } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
  });

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
    setValue,
  } = useForm<CommentInputFormData>();

  const { ref, ...rest } = register("comment", {
    required: "댓글을 입력해주세요",
    validate: inputTrimValidationFn,
  });

  const { mutate: commentMutate } = useMutation({
    mutationFn: (data: CommentInputFormData) =>
      uploadComment(postId, data.comment.trim(), type),
    onSuccess: (data) => {
      showToast("success", "댓글이 성공적으로 작성되었습니다.");
      const updateCommentState = { ...data, usersinfo: userInfo };
      setCommentsList((prev) => [updateCommentState, ...prev]);
      setValue("comment", "");
    },
    onError: () => {
      showToast("error", "댓글 작성에 실패했습니다.");
    },
  });

  const onSubmit = async (data: CommentInputFormData) => {
    commentMutate(data);
  };

  return (
    <>
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
          placeholder={
            userInfo
              ? "댓글을 입력해주세요"
              : "로그인 후 댓글을 작성할 수 있습니다."
          }
          ref={(e) => {
            ref(e);
            textareaRef.current = e;
          }}
          {...rest}
          onInput={resizeTextarea}
          disabled={!userInfo}
        />
        <SimpleButton
          css="w-[75px] h-[45px] bg-[#dee3db] text-[#121712]"
          type="submit"
          disabled={!userInfo}
        >
          등록
        </SimpleButton>
      </form>
      <p className="text-red-500 text-[12px] ml-2">{errors.comment?.message}</p>
    </>
  );
};

export default CommentInput;
