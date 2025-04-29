import { api } from "@/api/axiosInstance";

export const getAllUpCoinLists = async (
  {
    pageParam = 1,
  }: {
    pageParam: number;
  },
  type: "UP" | "DOWN"
) => {
  try {
    const response = await api.get("ticker/all", {
      params: {
        quote_currencies: "KRW",
      },
    });

    const { data }: { data: CoinTickerType[] } = response;

    const coinList =
      type === "UP"
        ? data
            .filter((coin) => coin.change === "RISE")
            .sort((a, b) => b.change_rate - a.change_rate)
        : data
            .filter((coin) => coin.change === "FALL")
            .sort((a, b) => b.change_rate - a.change_rate);

    const itemsPerPage = 20;
    const start = (pageParam - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    const paginatedData = coinList.slice(start, end);

    return {
      coins: paginatedData,
      nextPage: end < coinList.length ? pageParam + 1 : undefined,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
