"use client";

import CoinListBox from "@/components/coin/CoinListBox";
import CoinListSkeleton from "@/components/coin/CoinListSkeleton";
import Spinner from "@/components/Loading/Spinner";
import { getAllCoinName } from "@/utils/api/getAllCoinName";
import {
  QueryFunctionContext,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

interface CoinDataType {
  [market: string]: {
    trade_price: number;
    signed_change_rate: number;
    acc_trade_volume_24h: number;
    acc_trade_price_24h: number;
  };
}

interface AllCoinsPageType {
  coins: AllCoinNameType[];
  nextPage: number | undefined;
}

// interface AllCoinDataType{
//   pageParams: number[];
//   pages: {coins: AllCoinNameType[], nextPage: number}[]
// }

const CoinMainPage = () => {
  // coin api 호출 함수
  const fetchAllCoinName = async ({
    pageParam,
  }: QueryFunctionContext): Promise<AllCoinsPageType> => {
    return await getAllCoinName({ pageParam: pageParam as number });
  };

  const {
    data: allCoinNameData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<AllCoinsPageType>({
    queryKey: ["AllCoins"],
    queryFn: fetchAllCoinName,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  useEffect(() => {
    console.log(isFetchingNextPage);
    console.log(status);
  }, [isFetchingNextPage, status]);

  // webSocket
  const ws = useRef<WebSocket | null>(null);

  // 무한스크롤 obserberRef
  const observerRef = useRef<HTMLDivElement | null>(null);

  // KRW, BTC 탭
  const [tab, setTab] = useState<"KRW" | "BTC">("KRW");

  // KRW 코인 마켓데이터
  const [allKRWCoinMarketData, setAllKRWCoinMarketData] = useState<
    AllCoinsPageType[]
  >([]);

  // KRW 코인 마켓 이름
  const [allKRWCoinMarketNames, setAllKRWCoinMarketNames] = useState<string[]>(
    []
  );

  // 코인 시세 데이터
  const [coinData, setCoinData] = useState<CoinDataType>({});

  useEffect(() => {
    if (allCoinNameData?.pages) {
      const allMarketsNames = allCoinNameData.pages
        .flatMap((page) => page.coins)
        .map((coin) => coin.market);

      setAllKRWCoinMarketNames(allMarketsNames);

      setAllKRWCoinMarketData(allCoinNameData.pages);
    }
  }, [allCoinNameData]);

  // 웹소켓 연결
  useEffect(() => {
    if (allKRWCoinMarketNames.length === 0) return;
    ws.current = new WebSocket(process.env.NEXT_PUBLIC_WS_API_URL!);
    ws.current.binaryType = "arraybuffer";

    ws.current.onopen = () => {
      const subscribeMsg = [
        { ticket: "monico-ticker" },
        {
          type: "ticker",
          codes: allKRWCoinMarketNames,
        },
        { format: "DEFAULT" },
      ];

      ws.current?.send(JSON.stringify(subscribeMsg));
    };

    ws.current.onmessage = async (event) => {
      const data =
        event.data instanceof Blob
          ? await event.data.arrayBuffer()
          : event.data;
      const enc = new TextDecoder("utf-8");
      const json = JSON.parse(enc.decode(data));

      const {
        trade_price,
        signed_change_rate,
        acc_trade_volume_24h,
        acc_trade_price_24h,
      } = json;

      setCoinData((prev) => ({
        ...prev,
        [json.code]: {
          trade_price,
          signed_change_rate,
          acc_trade_volume_24h,
          acc_trade_price_24h,
        },
      }));
    };
  }, [allKRWCoinMarketNames]);

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
      <div className="max-w-[1440px]  m-auto">
        <h1 className="text-[32px] font-bold my-[20px]">암호화페 시세</h1>

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
            {allKRWCoinMarketData.map((page) => {
              return page.coins.map((coin) => {
                const coinInfo = coinData[coin.market];
                if (!coinInfo) {
                  return <CoinListSkeleton key={coin.market} />;
                }

                return (
                  <CoinListBox
                    key={coin.market}
                    coinName={coin.korean_name}
                    market={coin.market}
                    price={coinInfo?.trade_price}
                    changeRate={coinInfo?.signed_change_rate}
                    accTradeVolume24h={coinInfo?.acc_trade_volume_24h}
                    accTradePrice24h={coinInfo?.acc_trade_price_24h}
                  />
                );
              });
            })}
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
