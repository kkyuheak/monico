import { PostingFormValues } from "@/components/community/PostingForm";
import { inputTrimValidationFn } from "@/utils/inputTrimValidationFn";
import { FieldErrors, Path, UseFormRegister } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface PostingInputProps {
  placeholder: string;
  css?: string;
  register: UseFormRegister<PostingFormValues>;
  label: Path<PostingFormValues>;
  errors: FieldErrors<PostingFormValues>;
}

const PostingInput = ({
  placeholder,
  css,
  register,
  label,
  errors,
}: PostingInputProps) => {
  const errorInputMessage =
    label === "title" ? "제목은 필수로 입력해주세요" : false;

  return (
    <div>
      <label htmlFor={label} className="mb-1 font-bold block">
        {label === "title" ? "제목" : "해시태그"}
      </label>
      <input
        placeholder={placeholder}
        className={twMerge(
          "w-[448px] h-[56px] rounded-[12px] bg-[#f2f5f2] dark:bg-[#444444] px-4 outline-none block",
          css,
          errors[label] ? "border border-red-500" : ""
        )}
        id={label}
        {...register(label, {
          required: errorInputMessage,
          validate: label === "title" ? inputTrimValidationFn : undefined,
        })}
      />
      {errors[label] && (
        <p className="text-red-500 text-[12px] ml-1">{errors[label].message}</p>
      )}
    </div>
  );
};

export default PostingInput;
