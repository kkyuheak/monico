"use client";

import CoinListBox from "@/components/coin/CoinListBox";
import CoinListSkeleton from "@/components/coin/CoinListSkeleton";
import CoinUpDownList from "@/components/coin/CoinUpDownList";
import SearchBarButton from "@/components/common/buttons/SearchBarButton";
import Spinner from "@/components/Loading/Spinner";
import SearchModal from "@/components/modal/Searchmodal";
import RecentView from "@/components/recentView/RecentView";

import { checkFavoriteCoin } from "@/utils/checkFavoriteCoin";
import { getAllCoinTicker } from "@/utils/coin/getAllCoinTicker";
import { getCoinName } from "@/utils/coin/getCoinName";
import { getUserInfo } from "@/utils/getUserInfo";
import {
  QueryFunctionContext,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { twMerge } from "tailwind-merge";

interface AllCoinsPageType {
  coins: CoinTickerType[];
  nextPage: number | undefined;
}

const CoinMainPage = () => {
  // KRW, BTC 탭
  const [tab, setTab] = useState<string>("KRW");

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

  const { data: coinName, isLoading: coinNameLoading } = useQuery<
    AllCoinNameType[]
  >({
    queryKey: ["coinName"],
    queryFn: getCoinName,
  });

  // 무한스크롤 obserberRef
  const observerRef = useRef<HTMLDivElement | null>(null);

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

    const currentTarget = observerRef.current;

    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasNextPage, fetchNextPage]);

  // 유저 즐겨찾기 코인
  const { data: userFavoriteCoin, isLoading: userCoinLoading } = useQuery<
    string[] | null
  >({
    queryKey: ["userFavoriteCoin", tab],
    queryFn: checkFavoriteCoin,
  });

  // 로그인 확인
  const { data: userInfo } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
  });

  const isLoggedIn = !!userInfo;

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  return (
    <div className="">
      <h1 className="text-[28px] font-bold my-[20px] max-md:hidden">
        암호화페 시세
      </h1>
      {/* 상승, 하락 */}
      <div className="mb-5 flex gap-2 justify-around max-md:flex-col max-md:items-center">
        <CoinUpDownList type="UP" />
        <CoinUpDownList type="DOWN" />
      </div>

      <div className="flex justify-between items-center mb-2 max-md:flex-col-reverse max-md:gap-3">
        {/* KRW, BTC 탭 */}
        <Tabs
          defaultValue="KRW"
          className="max-md:w-full"
          onValueChange={(value) => setTab(value)}
        >
          <TabsList className="max-md:w-full">
            <TabsTrigger value="KRW">KRW</TabsTrigger>
            <TabsTrigger value="BTC">BTC</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* 검색 */}
        <SearchBarButton onClick={() => setIsSearchModalOpen(true)} />
      </div>

      <table className="w-full m-auto border-t border-[#e8e8e8] dark:border-[#373737]">
        <thead className="h-[42px] max-md:h-[32px]">
          <tr className="max-md:text-[12px]">
            {isLoggedIn && allCoinData && (
              <th className="pl-1 max-md:hidden"></th>
            )}
            <th
              className={twMerge(
                "text-left pl-2",
                isLoggedIn && allCoinData ? "" : "pl-4"
              )}
            >
              코인
            </th>
            <th className="">현재가</th>
            <th className=" w-[100px]">전일대비</th>
            <th className="max-md:hidden">거래량(24H)</th>
            <th className="">거래대금(24H)</th>
          </tr>
          <tr className="border-b border-[#e8e8e8] dark:border-[#373737]"></tr>
        </thead>
        <tbody className="">
          {allCoinData && coinName && !userCoinLoading
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
                      userFavoriteCoin={userFavoriteCoin}
                      isLoggedIn={isLoggedIn}
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

      {!coinNameLoading && <RecentView />}

      {isFetchingNextPage && (
        <div className="py-5">
          <Spinner />
        </div>
      )}
      {isSearchModalOpen && (
        <div
          className="fixed top-0 left-0 w-full h-screen bg-black/50 dark:bg-black/60 z-50 flex items-center justify-center"
          onClick={() => setIsSearchModalOpen(false)}
        >
          <SearchModal setIsSearchModalOpen={setIsSearchModalOpen} />
        </div>
      )}
    </div>
  );
};

export default CoinMainPage;
