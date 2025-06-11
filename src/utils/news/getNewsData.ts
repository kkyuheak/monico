import { newsApi } from "@/api/axiosInstance";

export const getNewsData = async () => {
  try {
    const response = await newsApi.get("/v1/articles", {
      params: {
        page_size: 20,
        keyword: "cripto OR 비트코인 OR 이더리움",
      },
    });
    const { data }: { data: NewsDataType[] } = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
