import NewsBox from "@/components/news/NewsBox";
import { getNewsData } from "@/utils/news/getNewsData";

const NewsPage = async () => {
  const newsData = await getNewsData();

  return (
    <div className="w-[608px]">
      <div className="flex flex-col gap-1">
        {newsData?.map((newsItem) => {
          return (
            <NewsBox
              key={newsItem.id}
              title={newsItem.title}
              thumbnail_url={newsItem.thumbnail_url}
              content_url={newsItem.content_url}
              summary={newsItem.summary}
              publishedAt={newsItem.published_at}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NewsPage;
