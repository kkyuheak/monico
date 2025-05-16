const SearchResultCoinSkeleton = () => {
  return (
    <div className="flex items-center gap-2 justify-between px-2 py-2 rounded-md bg-[#fafafa] animate-pulse">
      <div className="flex items-center gap-2">
        <div className="bg-gray-300 rounded-full w-[30px] h-[30px]" />
        <div className="flex flex-col gap-1">
          <div className="bg-gray-300 h-4 w-20 rounded" />
          <div className="bg-gray-300 h-3 w-16 rounded" />
        </div>
      </div>
      <div className="flex flex-col gap-1 items-end">
        <div className="bg-gray-300 h-4 w-24 rounded" />
        <div className="bg-gray-300 h-3 w-14 rounded" />
      </div>
    </div>
  );
};

export default SearchResultCoinSkeleton;
