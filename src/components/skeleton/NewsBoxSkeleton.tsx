const NewsBoxSkeleton = () => {
  return (
    <div className="w-[960px] h-[203px] px-3 py-4 flex gap-4 animate-pulse bg-white rounded-lg border border-gray-200">
      <div className="w-[608px] flex flex-col gap-3">
        <div className="h-5 bg-gray-300 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-[90%]" />
        <div className="h-4 bg-gray-200 rounded w-[80%]" />
      </div>
      <div className="flex-1 h-full bg-gray-200 rounded-lg" />
    </div>
  );
};

export default NewsBoxSkeleton;
