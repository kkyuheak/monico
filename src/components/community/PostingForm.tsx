import SimpleButton from "../common/buttons/SimpleButton";
import PostingInput from "../common/input/PostingInput";

const PostingForm = () => {
  return (
    <form className=" flex flex-col gap-4 mt-4">
      <PostingInput placeholder="제목을 입력해주세요" />

      <textarea
        name=""
        id=""
        placeholder="내용을 입력해주세요"
        className="w-[448px] h-[200px] rounded-[12px] bg-[#f2f5f2] px-4 py-3 outline-none block resize-none"
      ></textarea>

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

      <PostingInput placeholder="태그를 쉼표로 구분하여 입력해주세요" />

      <div className="flex justify-end">
        <SimpleButton css="w-[84px] h-[40px] bg-[#e8f6e8]">올리기</SimpleButton>
      </div>
    </form>
  );
};

export default PostingForm;
