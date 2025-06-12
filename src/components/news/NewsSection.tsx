"use client";

import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import SimpleButton from "../common/buttons/SimpleButton";
import NewsBox from "./NewsBox";
import { getNewsData } from "@/utils/news/getNewsData";
import NewsBoxSkeleton from "../skeleton/NewsBoxSkeleton";

const NewsSection = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery<NewsDataType[], Error, InfiniteData<NewsDataType[]>>({
      queryKey: ["newsData"],
      queryFn: ({ pageParam = 1 }) => getNewsData(pageParam as number),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        // lastPage가 빈 배열이면 더이상 없음
        if (lastPage.length === 0) return undefined;
        return allPages.length + 1;
      },
    });

  return (
    <div className="flex flex-col gap-1 items-center">
      <div className="flex flex-col gap-1 border border-gray-200 rounded-lg">
        {isLoading &&
          Array.from({ length: 10 }).map((_, index) => (
            <NewsBoxSkeleton key={index} />
          ))}
        {data?.pages.map((page, index) =>
          page.map((newsItem) => (
            <NewsBox
              key={`${index}-${newsItem.id}`}
              title={newsItem.title}
              thumbnail_url={newsItem.thumbnail_url}
              content_url={newsItem.content_url}
              summary={newsItem.summary}
              publishedAt={newsItem.published_at}
            />
          ))
        )}
      </div>
      {isFetchingNextPage &&
        Array.from({ length: 10 }).map((_, index) => (
          <NewsBoxSkeleton key={index} />
        ))}
      {hasNextPage && (
        <SimpleButton
          css="w-full bg-white border h-[48px]"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          더보기
        </SimpleButton>
      )}
    </div>
  );
};

export default NewsSection;
