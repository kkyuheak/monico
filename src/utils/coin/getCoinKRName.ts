import { getAllKRWCoin } from "./getUpDownCoinLists";

export const getCoinKRName = async (coinName: string) => {
  try {
    const allCoins = await getAllKRWCoin();

    const coinKRName = allCoins?.find((coin) => coin.market === coinName);

    return coinKRName?.korean_name;
  } catch (error) {
    console.error(error);
  }
};
