import { api } from "@/api/axiosInstance";

export const getAllCoinName = async (
  {
    pageParam = 1,
  }: {
    pageParam: number;
  },
  tab: string
) => {
  try {
    const response = await api.get("market/all?is_details=true");
    console.log(response);
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
