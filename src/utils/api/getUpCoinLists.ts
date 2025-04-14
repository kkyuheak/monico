import { api } from "@/api/axiosInstance";

export const getAllCoin = async () => {
  try {
    const response = await api.get("market/all?is_details=true");
    const { data }: { data: AllCoinNameType[] } = response;

    const KRWData = data.filter((coin) => coin.market.startsWith("KRW-"));

    console.log(KRWData);
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
    let tickers: CoinTickerType[] = [];

    if (KRWCoinData) {
      tickers = await getTickers(KRWCoinData.map((coin) => coin.market));
    }

    const upCoinList = tickers
      .filter((ticker) => ticker.change === "RISE")
      .sort((a, b) => b.change_rate - a.change_rate);

    console.log(upCoinList);

    return upCoinList;
  } catch (error) {
    console.log(error);
  }
};
