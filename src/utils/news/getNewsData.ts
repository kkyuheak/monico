import { newsApi } from "@/api/axiosInstance";
import dayjs from "dayjs";

const fromDate = dayjs().subtract(6, "month").format("YYYY-MM-DD");
const nowDate = dayjs().format("YYYY-MM-DD");

export const getNewsData = async (page: number): Promise<NewsDataType[]> => {
  try {
    const response = await newsApi.get("/v1/articles", {
      params: {
        page,
        page_size: 10,
        keyword: "블록체인 OR 비트코인",
        date_from: fromDate,
        date_to: nowDate,
        // order: "published_at",
      },
    });
    const { data }: { data: NewsDataType[] } = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
