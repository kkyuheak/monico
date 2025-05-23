"use client";

import { useEffect, useState } from "react";
import { queryClient } from "../provider/QueryProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";

const RecentView = () => {
  const router = useRouter();

  const [recentCoinData, setRecentCoinData] = useState<AllCoinNameType[]>([]);

  useEffect(() => {
    const recentlyViewedCoins: string[] = JSON.parse(
      localStorage.getItem("recentlyViewedCoins") || "[]"
    ).slice(0, 3);

    if (recentlyViewedCoins) {
      const coinNames: AllCoinNameType[] | undefined = queryClient.getQueryData(
        ["coinName"]
      );

      if (coinNames) {
        const result = recentlyViewedCoins.map((coin) => {
          const coinData = coinNames.find((item) => item.market === coin);
          if (coinData) {
            return coinData;
          } else {
            return {
              market: "",
              korean_name: "",
              english_name: "",
              market_event: {
                warning: false,
                caution: {
                  PRICE_FLUCTUATIONS: false,
                  TRADING_VOLUME_SOARING: false,
                  DEPOSIT_AMOUNT_SOARING: false,
                  GLOBAL_PRICE_DIFFERENCES: false,
                  CONCENTRATION_OF_SMALL_ACCOUNTS: false,
                },
              },
            };
          }
        });

        setRecentCoinData(result);
      }
    }
  }, []);

  return (
    <>
      <div className="w-[120px] min-h-[330px] bg-[#fafafa] shadow opacity-95 fixed right-5 bottom-5 rounded-lg p-3 flex flex-col max-lg:hidden">
        <h1 className="text-[17px] text-center font-semibold">최근 본 코인</h1>
        <ul className="flex flex-col gap-4 items-center mt-4">
          {recentCoinData.map((coin, index) => {
            const coinSymbol = coin.market.split("-")[1];
            return (
              <li
                key={index}
                className="min-w-[90px] flex flex-col items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-md py-1 px-2"
                onClick={() => router.push(`/coin/${coin.market}`)}
              >
                <Image
                  src={`https://static.upbit.com/logos/${coinSymbol}.png`}
                  alt={coin.korean_name}
                  width={35}
                  height={35}
                />
                <p className="text-[15px] font-semibold text-center">
                  {coin.korean_name}
                </p>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 1024px 이하 */}
      <div
        className="max-lg:flex lg:hidden w-10 hover:w-[120px] h-10 bg-gray-100 border border-gray-500 rounded-full fixed right-5 bottom-5 shadow cursor-pointer transition-all duration-300 ease-in-out flex items-center justify-center overflow-hidden group"
        onClick={() => router.push("/recent")}
      >
        <p className="text-[15px] font-semibold whitespace-nowrap transition-all duration-300">
          <span className="opacity-100 group-hover:opacity-0 inline-block group-hover:hidden">
            최근
          </span>
          <span className="hidden group-hover:inline-block opacity-0 group-hover:opacity-100">
            최근 본 코인
          </span>
        </p>
      </div>
    </>
  );
};

export default RecentView;
