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

  const ws = useRef<WebSocket | null>(null);
  const [allCoinMarketData, setAllCoinMarketData] = useState<AllCoinNameType[]>(
    []
  ); // 코인 마켓데이터
  const [allCoinMarketNames, setAllCoinMarketNames] = useState<string[]>([]); // 코인 마켓 이름
  const [coinData, setCoinData] = useState<CoinDataType>({});

  useEffect(() => {
    console.log(allCoinNameData);
    if (allCoinNameData) {
      const marketNames = allCoinNameData
        .slice(0, 21)
        .map((coin) => coin.market);
      console.log(marketNames);
      setAllCoinMarketNames(marketNames);

      const marketData = allCoinNameData.slice(0, 21);
      setAllCoinMarketData(marketData);
    }
  }, [allCoinNameData]);

  useEffect(() => {
    if (allCoinMarketNames.length === 0) return;
    ws.current = new WebSocket("wss://api.upbit.com/websocket/v1");
    ws.current.binaryType = "arraybuffer";

    ws.current.onopen = () => {
      const subscribeMsg = [
        { ticket: "monico-ticker" },
        {
          type: "ticker",
          codes: allCoinMarketNames,
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
  }, [allCoinMarketNames]);

  useEffect(() => {
    console.log(coinData);
  }, [coinData]);

  return (
    <div>
      <h1>암호화페 시세</h1>

      <table className="max-w-[1440px] w-full m-auto border-t border-[#d8d8d8]">
        <thead className="h-[42px]">
          <tr>
            <th className="text-left pl-4">코인</th>
            <th className="">현재가</th>
            <th className=" w-[100px]">전일대비</th>
            <th className="">거래량</th>
            <th className="">거래대금</th>
          </tr>
          <tr className="border-b border-[#d8d8d8]"></tr>
        </thead>
        <tbody>
          {allCoinMarketData.map((coin) => {
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
  );
};

export default CoinMainPage;
