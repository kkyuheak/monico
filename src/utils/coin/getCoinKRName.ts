import { getCoinName } from "./getCoinName";

export const getCoinKRName = async (coinName: string) => {
  try {
    const allCoins = await getCoinName();

    const coinKRName = allCoins?.find(
      (coin: AllCoinNameType) => coin.market === coinName
    );

    return coinKRName?.korean_name;
  } catch (error) {
    console.error(error);
  }
};
