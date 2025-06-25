import { newsApi } from "@/api/axiosInstance";
import dayjs from "dayjs";

const fromDate = dayjs().subtract(6, "month").format("YYYY-MM-DD");
const nowDate = dayjs().format("YYYY-MM-DD");

export const getNewsData = async (
  page: number,
  type: string
): Promise<NewsDataType[]> => {
  const keyword =
    type === "stock" ? "코스피 OR 코스닥 OR 증권시장" : "비트코인 OR 블록체인";

  try {
    const res = await newsApi.get("/articles", {
      params: {
        page,
        page_size: 10,
        keyword,
        date_from: fromDate,
        date_to: nowDate,
      },
    });
    console.log(res);
    const data = await res.data.data;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
