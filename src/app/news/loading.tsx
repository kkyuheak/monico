import NewsBoxSkeleton from "@/components/skeleton/NewsBoxSkeleton";

const NewsPageLoading = () => {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 10 }).map((_, index) => (
        <NewsBoxSkeleton key={index} />
      ))}
    </div>
  );
};

export default NewsPageLoading;
