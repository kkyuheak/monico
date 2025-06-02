"use client";

import { useRef } from "react";
import SimpleButton from "../buttons/SimpleButton";

const CommentInput = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  return (
    <form className="flex items-end gap-2 mt-2 p-2 border rounded-[12px]">
      <textarea
        ref={textareaRef}
        className="w-full text-[15px] px-1 outline-none resize-none"
        placeholder="댓글을 입력해주세요"
        onInput={resizeTextarea}
      />
      <SimpleButton css="w-[75px] h-[45px]">등록</SimpleButton>
    </form>
  );
};

export default CommentInput;
