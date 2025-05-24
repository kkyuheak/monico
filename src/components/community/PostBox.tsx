const PostBox = () => {
  return (
    <>
      <div className="w-full p-2 rounded-md hover:bg-gray-100 cursor-pointer">
        {/* 유저 프로필사진, 이름, 올린 시간 */}
        <div className="flex items-center gap-2 ">
          <div className="w-7 h-7 rounded-full bg-gray-300"></div>
          <p className="font-semibold">이름</p>
          <p className="text-[14px] text-[#6e8566]">2025년 05월 14일</p>
        </div>

        {/* 게시글 제목 */}
        <p className="font-medium">게시글 제목</p>

        {/* 게시글 내용 */}
        <p className="text-[14px] text-[#6e8566]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi
          rem praesentium at nulla deleniti iure. Voluptates eos totam ullam
          nam, quas repellat velit assumenda, modi quia, voluptatibus nobis in
          nulla!
        </p>
      </div>
      <div className="h-[1px] w-full bg-gray-200"></div>
    </>
  );
};

export default PostBox;
