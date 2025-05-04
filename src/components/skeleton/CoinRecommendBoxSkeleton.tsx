const CoinRecommendBoxSkeleton = () => {
  return (
    <div className="w-[250px] h-[150px] bg-[#f3f3f3] rounded-md flex flex-col gap-3 justify-center px-3 py-2 shadow animate-pulse">
      <div className="flex items-center gap-2">
        <div className="rounded-full bg-gray-300 w-[35px] h-[35px]"></div>
        <div className="flex flex-col justify-center w-[150px]">
          <div className="bg-gray-300 h-4 w-3/4 rounded"></div>
          <div className="bg-gray-300 h-3 w-1/2 rounded mt-1"></div>
        </div>
      </div>
      <div className="flex items-baseline gap-1 mt-2">
        <div className="bg-gray-300 h-6 w-1/3 rounded"></div>
        <div className="bg-gray-300 h-4 w-1/4 rounded"></div>
      </div>
      <div className="flex items-center mt-2">
        <div className="bg-gray-300 h-4 w-1/4 rounded"></div>
      </div>
    </div>
  );
};

export default CoinRecommendBoxSkeleton;
