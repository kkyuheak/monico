"use client";

import {
  getAllKRWCoin,
  getUpDownCoinList,
} from "@/utils/coin/getUpDownCoinLists";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CoinUpDownListProps {
  type: "UP" | "DOWN";
}

const CoinUpDownList = ({ type }: CoinUpDownListProps) => {
  const router = useRouter();

  // 코인 이름 추후 리팩토링
  const { data: coinListsName } = useQuery({
    queryKey: ["coinListsName"],
    queryFn: getAllKRWCoin,
  });

  // 상승/하락 코인 데이터
  const { data: coinListData } = useQuery<CoinTickerType[] | undefined>({
    queryKey: ["filteredCoinLists", type],
    queryFn: () => getUpDownCoinList(type),
  });

  const handleMoreClick = () => {
    router.push(`/coin/${type === "UP" ? "/gainers" : "/losers"}`);
  };

  return (
    <div className="w-[400px] max-md:w-[370px] h-[200px] rounded-lg border border-gray-200 dark:border-gray-600 px-3  pt-4 pb-1 flex flex-col justify-between">
      <div className="flex items-center justify-between px-2">
        <p className="font-bold text-[18px] ">
          {type === "UP" ? "🚀 상승 종목" : "🔥 하락 종목"}
        </p>
        <p
          className="text-[14px] text-right cursor-pointer"
          onClick={handleMoreClick}
        >
          더보기 {">"}
        </p>
      </div>

      <ul className="flex flex-col gap-1">
        {coinListData?.slice(0, 3).map((coin) => {
          const KRCoinName = coinListsName?.find(
            (coinName) => coinName.market === coin.market
          );

          return (
            <li
              key={coin.market}
              className="flex items-center justify-between h-[45px] rounded-md px-2
              hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer max-md:h-[42px]"
              onClick={() => router.push(`/coin/${coin.market}`)}
            >
              <div className="flex items-center gap-2">
                <Image
                  src={`https://static.upbit.com/logos/${
                    coin.market.split("-")[1]
                  }.png`}
                  alt={coin.market.split("-")[1] + "icon"}
                  width={30}
                  height={30}
                  className="w-[30px] h-[30px] rounded-full max-md:w-[25px] max-md:h-[25px]"
                />
                <p className="max-md:text-[14px]">{KRCoinName?.korean_name}</p>
              </div>
              <div className="flex gap-3 font-semibold">
                <p className="text-[17px] max-md:text-[14px]">
                  {coin?.trade_price.toLocaleString()}{" "}
                  <span className="text-[13px]">KRW</span>
                </p>
                <p
                  className={`max-md:text-[14px] ${
                    coin?.change === "RISE"
                      ? "text-[#FF3D00]"
                      : "text-[#1E90FF]"
                  }`}
                >
                  {coin?.change === "RISE" ? "+" : "-"}
                  {(coin?.change_rate * 100).toFixed(2)}%
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CoinUpDownList;
