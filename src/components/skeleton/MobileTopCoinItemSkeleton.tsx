const MobileTopCoinItemSkeleton = () => {
  return (
    <div className="h-full px-2 flex justify-between items-center gap-2 text-[14px] animate-pulse">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-gray-300" />
        <div className="w-20 h-4 rounded bg-gray-300" />
      </div>

      <div className="flex items-center gap-4">
        <div className="w-16 h-4 rounded bg-gray-300" />
        <div className="w-12 h-4 rounded bg-gray-300" />
      </div>
    </div>
  );
};

export default MobileTopCoinItemSkeleton;
