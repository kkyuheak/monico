import { api } from "@/api/axiosInstance";

export const getAllKRWCoin = async () => {
  try {
    const response = await api.get("market/all?is_details=true");
    const { data }: { data: AllCoinNameType[] } = response;

    const KRWData = data.filter((coin) => coin.market.startsWith("KRW-"));

    return KRWData;
  } catch (error) {
    console.error(error);
  }
};

const getTickers = async (allCoins: string[]) => {
  try {
    const allCoinString = allCoins.join(",");
    const response = await api.get(`ticker?markets=${allCoinString}`);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getUpDownCoinList = async (type: string) => {
  try {
    const KRWCoinData = await getAllKRWCoin();
    let tickers: CoinTickerType[] = [];

    if (KRWCoinData) {
      tickers = await getTickers(KRWCoinData.map((coin) => coin.market));
    }

    if (type === "UP") {
      const upCoinList = tickers
        .filter((ticker) => ticker.change === "RISE")
        .sort((a, b) => b.change_rate - a.change_rate);

      return upCoinList;
    } else {
      const downCoinList = tickers
        .filter((ticker) => ticker.change === "FALL")
        .sort((a, b) => b.change_rate - a.change_rate);

      return downCoinList;
    }
  } catch (error) {
    console.log(error);
  }
};
