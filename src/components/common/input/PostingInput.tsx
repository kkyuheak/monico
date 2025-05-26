import { twMerge } from "tailwind-merge";

interface PostingInputProps {
  placeholder: string;
  css?: string;
}

const PostingInput = ({ placeholder, css }: PostingInputProps) => {
  return (
    <input
      placeholder={placeholder}
      className={twMerge(
        "w-[448px] h-[56px] rounded-[12px] bg-[#f2f5f2] px-4 outline-none block",
        css
      )}
    />
  );
};

export default PostingInput;
