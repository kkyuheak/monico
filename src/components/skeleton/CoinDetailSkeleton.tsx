const CoinDetailSkeleton = () => {
  return (
    <>
      <div>
        {/* 상단: 아이콘 + 이름 + 심볼 + 즐겨찾기 아이콘 */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
          <div className="flex items-baseline gap-1">
            <div className="w-[80px] h-[24px] rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
            <div className="w-[50px] h-[16px] rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
            <div className="w-5 h-5 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
          </div>
        </div>

        {/* 현재 가격 */}
        <div className="flex items-center gap-4 mt-4">
          <div className="w-[120px] h-[36px] rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
          <div className="w-[40px] h-[20px] rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
        </div>

        {/* 전일 대비 */}
        <div className="flex gap-3 items-center mt-2">
          <div className="w-[60px] h-[16px] rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
          <div className="w-[100px] h-[20px] rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
        </div>
      </div>

      {/* 상세 정보 리스트 */}
      <ul className="mt-[50px] text-[14px] font-bold">
        {Array.from({ length: 6 }).map((_, idx) => (
          <li
            key={idx}
            className="flex items-center justify-between h-[45px] border-b border-gray-200 dark:border-gray-600"
          >
            <div className="w-[80px] h-[16px] rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
            <div className="w-[60px] h-[16px] rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
          </li>
        ))}
      </ul>
    </>
  );
};

export default CoinDetailSkeleton;
