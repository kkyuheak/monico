import { newsApi } from "@/api/axiosInstance";
import dayjs from "dayjs";

const fromDate = dayjs().subtract(6, "month").format("YYYY-MM-DD");
const nowDate = dayjs().format("YYYY-MM-DD");

export const getNewsData = async (
  page: number,
  type: string
): Promise<NewsDataType[]> => {
  try {
    const response = await newsApi.get("/v1/articles", {
      params: {
        page,
        page_size: 10,
        keyword: type === "stock" ? "코스피 OR 코스닥 OR 증권시장" : "비트코인",
        date_from: fromDate,
        date_to: nowDate,
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
