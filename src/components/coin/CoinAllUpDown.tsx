"use client";

import CoinListBox from "@/components/coin/CoinListBox";
import CoinListSkeleton from "@/components/coin/CoinListSkeleton";
import Spinner from "@/components/Loading/Spinner";
import { useInfiniteScrollQuery } from "@/hooks/useInfiniteScrollQuery";
import { getAllUpCoinLists } from "@/utils/coin/getAllUpCoinLists";
import { getCoinName } from "@/utils/coin/getCoinName";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

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
    return await getAllUpCoinLists({ pageParam: pageParam as number }, type);
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

  return (
    <div>
      <h1 className="text-[28px] font-bold my-[20px]">
        {type === "UP" ? "상승중인 코인" : "하락중인 코인"}
      </h1>

      <table className="w-full m-auto border-t border-[#d8d8d8]">
        <thead className="h-[42px]">
          <tr>
            <th className="pl-1"></th>
            <th className="text-left pl-2">코인</th>
            <th className="">현재가</th>
            <th className=" w-[100px]">전일대비</th>
            <th className="">거래량(24H)</th>
            <th className="">거래대금(24H)</th>
          </tr>
          <tr className="border-b border-[#d8d8d8]"></tr>
        </thead>
        <tbody>
          {coinName && allCoinList
            ? allCoinList?.pages.map((page) => {
                return page.coins.map((coin) => {
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
                      // userFavoriteCoin={userFavoriteCoin}
                      // isLoggedIn={isLoggedIn}
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
