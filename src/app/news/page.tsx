import NewsBox from "@/components/news/NewsBox";
import { getNewsData } from "@/utils/news/getNewsData";

const NewsPage = async () => {
  const newsData = await getNewsData();

  return (
    <div className="w-[608px]">
      <h1 className="text-[28px] font-bold mt-4">뉴스룸</h1>
      <p className="text-[16px] font-medium text-[#6e8566] my-2">
        최신 뉴스를 확인할 수 있습니다.
      </p>

      <div className="flex flex-col gap-1">
        {newsData?.map((newsItem) => {
          return (
            <NewsBox
              key={newsItem.id}
              title={newsItem.title}
              thumbnail_url={newsItem.thumbnail_url}
              content_url={newsItem.content_url}
              summary={newsItem.summary}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NewsPage;
