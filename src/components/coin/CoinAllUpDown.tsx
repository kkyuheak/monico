"use client";

import CoinListBox from "@/components/coin/CoinListBox";
import CoinListSkeleton from "@/components/coin/CoinListSkeleton";
import Spinner from "@/components/Loading/Spinner";
import { useInfiniteScrollQuery } from "@/hooks/useInfiniteScrollQuery";
import { checkFavoriteCoin } from "@/utils/checkFavoriteCoin";
import { getAllUpDownCoinLists } from "@/utils/coin/getAllUpDownCoinLists";
import { getCoinName } from "@/utils/coin/getCoinName";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import CoinRecommendBox from "./CoinRecommendBox";
import CoinRecommendBoxSkeleton from "../skeleton/CoinRecommendBoxSkeleton";
import { getUserInfo } from "@/utils/getUserInfo";
import { twMerge } from "tailwind-merge";
import MobileTopCoin from "./mobile/MobileTopCoin";

interface AllCoinsPageType {
  coins: CoinTickerType[];
  nextPage: number | undefined;
}

interface CoinAllUpDownProps {
  type: "UP" | "DOWN";
}

const CoinAllUpDown = ({ type }: CoinAllUpDownProps) => {
  // coin api 호출 함수
  const fetchAllCoinName = async ({
    pageParam,
  }: QueryFunctionContext): Promise<AllCoinsPageType> => {
    return await getAllUpDownCoinLists(
      { pageParam: pageParam as number },
      type
    );
  };

  const {
    data: allCoinList,
    isFetchingNextPage,
    observerRef,
  } = useInfiniteScrollQuery<AllCoinsPageType>({
    queryKey: [`${type === "UP" ? "allUpCoinList" : "allDownCoinList"}`],
    queryFn: fetchAllCoinName,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? null,
  });

  const { data: coinName } = useQuery<AllCoinNameType[]>({
    queryKey: ["coinName"],
    queryFn: getCoinName,
  });

  // 로그인 여부 확인
  const { data: userInfo } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
  });

  const isLoggedIn = !!userInfo;

  // 즐겨찾기 코인 확인
  const { data: userFavoriteCoin, isLoading: userCoinLoading } = useQuery<
    string[] | null
  >({
    queryKey: ["userFavoriteCoin"],
    queryFn: checkFavoriteCoin,
  });

  // 5개 상단 추천 코인
  const top5Coin = allCoinList?.pages[0].coins.slice(0, 5);

  return (
    <div>
      <h1 className="text-[28px] font-bold my-[20px] max-md:text-[24px]">
        {type === "UP" ? "상승중인 코인" : "하락중인 코인"}
      </h1>

      <Link
        href={"/coin"}
        className="w-[150px] mt-5 cursor-pointer flex items-center gap-1 hover:underline max-md:hidden"
      >
        <ArrowLeft className="w-5" />
        <p className="font-semibold">목록으로 돌아가기</p>
      </Link>

      {/* Desktop Top5 */}
      <div className="flex items-center gap-5 justify-center mt-10 mb-5 max-md:hidden">
        {coinName && allCoinList && !userCoinLoading
          ? top5Coin?.map((coin) => {
              const kr_name = coinName.find(
                (nameData) => nameData.market === coin.market
              );
              return (
                <CoinRecommendBox
                  key={coin.market}
                  coinName={coin.market}
                  coinKrName={kr_name?.korean_name ?? ""}
                  coinPrice={coin.trade_price}
                  coinChangeRate={coin.change_rate}
                  coinChange={coin.change}
                />
              );
            })
          : Array.from({ length: 5 }).map((_, i) => (
              <CoinRecommendBoxSkeleton key={i} />
            ))}
      </div>

      {/* Mobile Top5 */}
      <div>
        <h2 className="text-[20px] font-bold mb-2">실시간 상승률 TOP 5</h2>

        <MobileTopCoin top5Coin={top5Coin} type={type} coinName={coinName} />
      </div>

      <table className="w-full m-auto border-t border-[#e8e8e8] dark:border-[#505050] mt-5">
        <thead className="h-[42px] max-md:h-[32px]">
          <tr className="max-md:text-[12px]">
            {isLoggedIn && allCoinList && (
              <th className="pl-1 max-md:hidden"></th>
            )}
            <th className={twMerge("text-left pl-2", isLoggedIn ? "" : "pl-4")}>
              코인
            </th>
            <th className="">현재가</th>
            <th className=" w-[100px]">전일대비</th>
            <th className="max-md:hidden">거래량(24H)</th>
            <th className="">거래대금(24H)</th>
          </tr>
          <tr className="border-b border-[#e8e8e8] dark:border-[#505050]"></tr>
        </thead>
        <tbody>
          {coinName && allCoinList && !userCoinLoading
            ? allCoinList?.pages.map((page, index) => {
                const coins = index === 0 ? page.coins.slice(5) : page.coins;

                return coins.map((coin) => {
                  const kr_name = coinName.find(
                    (nameData) => nameData.market === coin.market
                  );
                  return (
                    <CoinListBox
                      key={coin.market}
                      coinName={kr_name?.korean_name ?? ""}
                      market={coin.market}
                      price={coin.trade_price}
                      changeRate={coin.signed_change_rate}
                      accTradeVolume24h={coin.acc_trade_volume_24h}
                      accTradePrice24h={coin.acc_trade_price_24h}
                      userFavoriteCoin={userFavoriteCoin}
                      isLoggedIn={isLoggedIn}
                    />
                  );
                });
              })
            : Array.from({ length: 20 }).map((_, i) => (
                <CoinListSkeleton key={i} />
              ))}
        </tbody>
      </table>
      <div ref={observerRef}></div>

      {isFetchingNextPage && (
        <div className="py-5">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default CoinAllUpDown;
