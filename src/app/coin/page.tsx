"use client";

import CoinListBox from "@/components/coin/CoinListBox";
import { getAllCoinName } from "@/utils/api/getAllCoinName";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

interface CoinDataType {
  [market: string]: {
    trade_price: number;
    signed_change_rate: number;
    acc_trade_volume_24h: number;
    acc_trade_price_24h: number;
  };
}

const CoinMainPage = () => {
  const { data: allCoinNameData } = useQuery<AllCoinNameType[]>({
    queryKey: ["AllCoins"],
    queryFn: getAllCoinName,
  });
  // webSocket
  const ws = useRef<WebSocket | null>(null);

  // KRW, BTC 탭
  const [tab, setTab] = useState("KRW");

  // KRW 코인 마켓데이터
  const [allKRWCoinMarketData, setAllKRWCoinMarketData] = useState<
    AllCoinNameType[]
  >([]);

  // KRW 코인 마켓 이름
  const [allKRWCoinMarketNames, setAllKRWCoinMarketNames] = useState<string[]>(
    []
  );

  // 코인 시세 데이터
  const [coinData, setCoinData] = useState<CoinDataType>({});

  useEffect(() => {
    console.log(allCoinNameData?.filter((coin) => coin.market.includes("KRW")));
    if (allCoinNameData) {
      const marketNames = allCoinNameData
        .filter((coin) => coin.market.includes("KRW"))
        .slice(0, 21)
        .map((coin) => coin.market);
      console.log(marketNames);
      setAllKRWCoinMarketNames(marketNames);

      const marketData = allCoinNameData
        .filter((coin) => coin.market.includes("KRW"))
        .slice(0, 21);
      setAllKRWCoinMarketData(marketData);
    }
  }, [allCoinNameData]);

  useEffect(() => {
    if (allKRWCoinMarketNames.length === 0) return;
    ws.current = new WebSocket("wss://api.upbit.com/websocket/v1");
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

      console.log(json);
    };
  }, [allKRWCoinMarketNames]);

  useEffect(() => {
    console.log(coinData);
  }, [coinData]);

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
            {allKRWCoinMarketData.map((coin) => {
              const coinInfo = coinData[coin.market];

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
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoinMainPage;
