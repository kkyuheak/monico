import { newsApi } from "@/api/axiosInstance";
import dayjs from "dayjs";

const fromDate = dayjs().subtract(1, "year").format("YYYY-MM-DD");
const nowDate = dayjs().format("YYYY-MM-DD");

export const getNewsData = async () => {
  try {
    const response = await newsApi.get("/v1/articles", {
      params: {
        page_size: 20,
        keyword: "비트코인",
        date_from: fromDate,
        date_to: nowDate,
      },
    });
    const { data }: { data: NewsDataType[] } = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
