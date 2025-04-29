import { api } from "@/api/axiosInstance";

export const getAllUpCoinLists = async ({
  pageParam = 1,
}: {
  pageParam: number;
}) => {
  try {
    const response = await api.get("ticker/all", {
      params: {
        quote_currencies: "KRW",
      },
    });

    const { data }: { data: CoinTickerType[] } = response;

    const upCoinList = data
      .filter((coin) => coin.change === "RISE")
      .sort((a, b) => b.change_rate - a.change_rate);

    const itemsPerPage = 20;
    const start = (pageParam - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    const paginatedData = upCoinList.slice(start, end);

    return {
      coins: paginatedData,
      nextPage: end < upCoinList.length ? pageParam + 1 : undefined,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
