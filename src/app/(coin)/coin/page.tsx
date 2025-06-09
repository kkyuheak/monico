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
import { twMerge } from "tailwind-merge";

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

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
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
  // const isLoggedIn = useAuthStore((state) => state.userInfo);

  const { data: userInfo } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
  });

  const isLoggedIn = !!userInfo;

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  return (
    <div>
      <h1 className="text-[28px] font-bold my-[20px]">암호화페 시세</h1>
      {/* 상승, 하락 */}
      <div className="mb-5 flex gap-2 justify-around">
        <CoinUpDownList type="UP" />
        <CoinUpDownList type="DOWN" />
      </div>

      <div className="flex justify-between items-center mb-2">
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

        {/* 검색 */}
        <SearchBarButton onClick={() => setIsSearchModalOpen(true)} />
      </div>

      <table className="w-full m-auto border-t border-[#d8d8d8]">
        <thead className="h-[42px]">
          <tr>
            {isLoggedIn && <th className="pl-1"></th>}
            <th className={twMerge("text-left pl-2", isLoggedIn ? "" : "pl-4")}>
              코인
            </th>
            <th className="">현재가</th>
            <th className=" w-[100px]">전일대비</th>
            <th className="">거래량(24H)</th>
            <th className="">거래대금(24H)</th>
          </tr>
          <tr className="border-b border-[#d8d8d8]"></tr>
        </thead>
        <tbody>
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
          className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center"
          onClick={() => setIsSearchModalOpen(false)}
        >
          <SearchModal />
        </div>
      )}
    </div>
  );
};

export default CoinMainPage;
