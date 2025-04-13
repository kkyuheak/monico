import { api } from "@/api/axiosInstance";

const getAllCoin = async () => {
  try {
    const response = await api.get("market/all?is_details=true");
    const { data }: { data: AllCoinNameType[] } = response;

    const KRWData = data
      .filter((coin) => coin.market.startsWith("KRW-"))
      .map((coin) => coin.market);
    return KRWData;
  } catch (error) {
    console.error(error);
  }
};

const getTickers = async (allCoins: string[]) => {
  try {
    const allCoinString = allCoins.join(",");
    const response = await api.get(`ticker?markets=${allCoinString}`);

    console.log("getTickers", response);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getUpCoinList = async () => {
  try {
    const KRWCoinData = await getAllCoin();
    let tickers: CoinInfoType[] = [];

    if (KRWCoinData) {
      tickers = await getTickers(KRWCoinData);
    }

    const upCoinList = tickers
      .filter((ticker) => ticker.change === "RISE")
      .sort((a, b) => a.change_rate - b.change_rate);
    console.log(upCoinList);

    return upCoinList;
  } catch (error) {
    console.log(error);
  }
};
