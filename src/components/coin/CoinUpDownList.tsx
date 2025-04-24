"use client";

import { getAllCoin, getUpDownCoinList } from "@/utils/coin/getUpDownCoinLists";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface UpCoinDataType {
  [market: string]: {
    market: string;
    trade_price: number;
    change_rate: number;
    change: string;
  };
}

interface CoinUpDownListProps {
  type: "UP" | "DOWN";
}

const CoinUpDownList = ({ type }: CoinUpDownListProps) => {
  const router = useRouter();

  // 코인 이름
  const { data: coinListsName } = useQuery({
    queryKey: ["coinListsName"],
    queryFn: getAllCoin,
  });

  // 상승/하락 코인 데이터
  const { data: coinListData } = useQuery<CoinTickerType[] | undefined>({
    queryKey: ["filteredCoinLists", type],
    queryFn: () => getUpDownCoinList(type),
  });

  const [coinLists, setCoinLists] = useState<UpCoinDataType>({});

  // webSocket
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (coinListData?.length === 0 || !coinListData) return;
    const coinListSlice = coinListData?.slice(0, 3).map((coin) => coin.market);

    ws.current = new WebSocket(process.env.NEXT_PUBLIC_WS_API_URL!);
    ws.current.binaryType = "arraybuffer";

    ws.current.onopen = () => {
      const subscribeMsg = [
        { ticket: `monico-${type}-ticker` },
        {
          type: "ticker",
          codes: coinListSlice,
        },
        { format: "DEFAULT" },
      ];

      console.log("coinUpDownList open");

      ws.current?.send(JSON.stringify(subscribeMsg));
    };

    ws.current.onmessage = async (event) => {
      const data =
        event.data instanceof Blob
          ? await event.data.arrayBuffer()
          : event.data;
      const enc = new TextDecoder("utf-8");
      const json = JSON.parse(enc.decode(data));

      const { trade_price, change_rate, change } = json;

      setCoinLists((prev) => ({
        ...prev,
        [json.code]: {
          market: json.code,
          trade_price,
          change_rate,
          change,
        },
      }));
    };

    return () => {
      ws.current?.close();
      console.log("coinUpDownList close");
      ws.current = null;
    };
  }, [coinListData, type]);

  return (
    <div className="w-[400px] h-[200px] rounded-lg border border-gray-200 px-3  pt-4 pb-1 flex flex-col justify-between">
      <div className="flex items-center justify-between px-2">
        <p className="font-bold text-[18px] ">
          {type === "UP" ? "🚀 상승 종목" : "🔥 하락 종목"}
        </p>
        <p className="text-[14px] text-right cursor-pointer">더보기 {">"}</p>
      </div>

      <ul className="flex flex-col gap-1">
        {coinListData?.slice(0, 3).map((coin) => {
          const coinData = coinLists[coin.market];
          const KRCoinName = coinListsName?.find(
            (coinName) => coinName.market === coin.market
          );

          return (
            <li
              key={coin.market}
              className="flex items-center justify-between h-[45px] rounded-md px-2
              hover:bg-gray-100 cursor-pointer"
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
                  className="w-[30px] h-[30px] rounded-full"
                />
                <p>{KRCoinName?.korean_name}</p>
              </div>
              <div className="flex gap-3 font-semibold">
                <p className="text-[17px]">
                  {coinData?.trade_price.toLocaleString()}{" "}
                  <span className="text-[13px]">KRW</span>
                </p>
                <p
                  className={`${
                    coinData?.change === "RISE"
                      ? "text-[#FF3D00]"
                      : "text-[#1E90FF]"
                  }`}
                >
                  {coinData?.change === "RISE" ? "+" : "-"}
                  {(coinData?.change_rate * 100).toFixed(2)}%
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
