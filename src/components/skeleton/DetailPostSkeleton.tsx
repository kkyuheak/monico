import React from "react";

const DetailPostSkeleton = () => {
  return (
    <div className="p-1 animate-pulse mt-[18px]">
      {/* 제목 */}
      <div className="w-3/4 h-7 bg-gray-300 rounded mb-4" />

      {/* 유저 정보 */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-full bg-gray-300" />
        <div className="w-20 h-4 bg-gray-300 rounded" />
        <div className="w-24 h-3 bg-gray-200 rounded" />
      </div>

      {/* 본문 내용 */}
      <div className="space-y-2 mb-4">
        <div className="w-full h-4 bg-gray-200 rounded" />
        <div className="w-5/6 h-4 bg-gray-200 rounded" />
        <div className="w-4/6 h-4 bg-gray-200 rounded" />
      </div>

      {/* 이미지 */}
      <div className="flex gap-2 overflow-auto mb-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="w-[240px] h-[360px] bg-gray-300 rounded" />
        ))}
      </div>

      {/* 해시태그 */}
      <div className="flex gap-2 h-[25px] mb-6">
        <div className="w-14 h-5 bg-gray-300 rounded-full" />
        <div className="w-12 h-5 bg-gray-300 rounded-full" />
        <div className="w-16 h-5 bg-gray-300 rounded-full" />
      </div>

      {/* 좋아요, 댓글 */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-300 rounded" />
          <div className="w-6 h-4 bg-gray-300 rounded" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-300 rounded" />
          <div className="w-6 h-4 bg-gray-300 rounded" />
        </div>
      </div>

      {/* 댓글 */}
      <div className="mb-2">
        <div className="w-20 h-5 bg-gray-300 rounded mb-4" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-start gap-2 py-4">
            <div className="w-10 h-10 bg-gray-300 rounded-full shrink-0" />
            <div className="space-y-2">
              <div className="w-24 h-4 bg-gray-300 rounded" />
              <div className="w-72 h-4 bg-gray-200 rounded" />
              <div className="w-60 h-4 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailPostSkeleton;
