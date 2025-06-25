import { api } from "@/api/axiosInstance";

export const getAllCoinTicker = async (
  {
    pageParam = 1,
  }: {
    pageParam: number;
  },
  tab: string
) => {
  try {
    const response = await api.get("/ticker/all", {
      params: {
        quote_currencies: "KRW,BTC",
      },
    });

    const { data } = response;

    const KRWfilteredData = data.filter((coin: AllCoinNameType) =>
      coin.market.startsWith(tab)
    );

    const itemsPerPage = 20;
    const start = (pageParam - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    const paginatedData = KRWfilteredData.slice(start, end);

    return {
      coins: paginatedData,
      nextPage: end < KRWfilteredData.length ? pageParam + 1 : undefined,
    };
  } catch (error) {
    console.error("Error fetching coin names:", error);
    throw error;
  }
};
