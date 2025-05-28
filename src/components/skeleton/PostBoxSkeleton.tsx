const PostBoxSkeleton = () => {
  return (
    <>
      <div className="w-full p-2 rounded-lg animate-pulse">
        {/* 프로필 영역 */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-full bg-gray-300" />
          <div className="w-24 h-4 bg-gray-300 rounded" />
        </div>

        {/* 제목 */}
        <div className="w-3/4 h-5 bg-gray-300 rounded mb-2" />

        {/* 설명 */}
        <div className="w-full h-4 bg-gray-200 rounded mb-1" />
        <div className="w-5/6 h-4 bg-gray-200 rounded mb-1" />

        {/* 해시태그 */}
        <div className="mt-3 flex gap-2">
          <div className="w-14 h-5 bg-gray-300 rounded-full" />
          <div className="w-12 h-5 bg-gray-300 rounded-full" />
          <div className="w-16 h-5 bg-gray-300 rounded-full" />
        </div>
      </div>
      <div className="h-[1px] w-full bg-gray-200"></div>
    </>
  );
};

export default PostBoxSkeleton;
