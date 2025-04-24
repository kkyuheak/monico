"use client";

import CoinListBox from "@/components/coin/CoinListBox";
import CoinListSkeleton from "@/components/coin/CoinListSkeleton";
import CoinUpDownList from "@/components/coin/CoinUpDownList";
import Spinner from "@/components/Loading/Spinner";
import { getAllCoinTicker } from "@/utils/coin/getAllCoinTicker";
import { getCoinName } from "@/utils/coin/getCoinName";
import {
  QueryFunctionContext,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

interface AllCoinsPageType {
  coins: CoinTickerType[];
  nextPage: number | undefined;
}

const CoinMainPage = () => {
  // KRW, BTC 탭
  const [tab, setTab] = useState<"KRW" | "BTC">("KRW");

  // coin api 호출 함수
  const fetchAllCoinName = async ({
    pageParam,
    queryKey,
  }: QueryFunctionContext): Promise<AllCoinsPageType> => {
    const tab = queryKey[1] as string;
    return await getAllCoinTicker({ pageParam: pageParam as number }, tab);
  };

  const {
    data: allCoinData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<AllCoinsPageType>({
    queryKey: ["AllCoins", tab],
    queryFn: fetchAllCoinName,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const { data: coinName } = useQuery<AllCoinNameType[]>({
    queryKey: ["coinName"],
    queryFn: getCoinName,
  });

  // 무한스크롤 obserberRef
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {}, []);

  // 무한 스크롤
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasNextPage, fetchNextPage]);

  return (
    <div>
      <div className="max-w-[1440px] m-auto px-5">
        <h1 className="text-[28px] font-bold my-[20px]">암호화페 시세</h1>
        {/* 상승, 하락 */}
        <div className="mb-5 flex gap-2 justify-around">
          <CoinUpDownList type="UP" />
          <CoinUpDownList type="DOWN" />
        </div>

        {/* KRW, BTC 탭 */}
        <ul className="bg-[#e9e9e9] h-[35px] w-[100px] flex justify-center items-center rounded-[5px] px-1 py-1 mb-[5px]">
          <li
            className={`w-[50px] h-full flex items-center justify-center text-[14px] rounded-[5px] cursor-pointer transition-all ${
              tab === "KRW" ? "bg-white text-[#09090b]" : "text-[#71717a]"
            }`}
            onClick={() => setTab("KRW")}
          >
            KRW
          </li>
          <li
            className={`w-[50px] h-full flex items-center justify-center text-[14px] rounded-[5px] cursor-pointer transition-all ${
              tab === "BTC" ? "bg-white text-[#09090b]" : "text-[#71717a]"
            }`}
            onClick={() => setTab("BTC")}
          >
            BTC
          </li>
        </ul>

        <table className="w-full m-auto border-t border-[#d8d8d8]">
          <thead className="h-[42px]">
            <tr>
              <th className="text-left pl-4">코인</th>
              <th className="">현재가</th>
              <th className=" w-[100px]">전일대비</th>
              <th className="">거래량(24H)</th>
              <th className="">거래대금(24H)</th>
            </tr>
            <tr className="border-b border-[#d8d8d8]"></tr>
          </thead>
          <tbody>
            {allCoinData && coinName
              ? allCoinData?.pages.map((page) => {
                  return page.coins.map((coin) => {
                    const koreanName = coinName?.find(
                      (nameData) => nameData.market === coin.market
                    );

                    return (
                      <CoinListBox
                        key={coin.market}
                        coinName={koreanName?.korean_name ?? ""}
                        market={coin.market}
                        price={coin?.trade_price}
                        changeRate={coin?.signed_change_rate}
                        accTradeVolume24h={coin?.acc_trade_volume_24h}
                        accTradePrice24h={coin?.acc_trade_price_24h}
                        tabName={tab}
                      />
                    );
                  });
                })
              : Array.from({ length: 20 }).map((_, i) => (
                  <CoinListSkeleton key={i} />
                ))}
            {}
          </tbody>
        </table>
        <div ref={observerRef}></div>

        {isFetchingNextPage && (
          <div className="py-5">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default CoinMainPage;
