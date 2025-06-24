"use client";

import CoinCandles from "@/components/coin/coinDetail/CoinCandles";
import CoinDetailInfo from "@/components/coin/coinDetail/CoinDetailInfo";
import CoinGraph from "@/components/coin/coinDetail/CoinGraph";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const CoinDetailPage = () => {
  const { coinName } = useParams();

  const [coinWsData, setCoinWsData] = useState<CoinInfoType>();

  // 코인데이터 소켓
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(process.env.NEXT_PUBLIC_WS_API_URL!);
    ws.current.binaryType = "arraybuffer";

    ws.current.onopen = () => {
      const subscribeMsg = [
        { ticket: "coin-detail" },
        {
          type: "ticker",
          codes: [coinName],
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

      setCoinWsData(json);
    };

    return () => {
      ws.current?.close();
    };
  }, [coinName]);

  // 일/주별 탭 value
  const [tabsValue, setTabsValue] = useState<"days" | "weeks">("days");

  // 최근 본 코인
  useEffect(() => {
    const recentlyViewedCoins = localStorage.getItem("recentlyViewedCoins");
    if (!recentlyViewedCoins) {
      localStorage.setItem("recentlyViewedCoins", JSON.stringify([coinName]));
    } else {
      const parsedCoins = JSON.parse(recentlyViewedCoins);
      if (!parsedCoins.includes(coinName)) {
        parsedCoins.push(coinName);
        localStorage.setItem(
          "recentlyViewedCoins",
          JSON.stringify(parsedCoins)
        );
      } else {
        const index = parsedCoins.indexOf(coinName);
        parsedCoins.splice(index, 1);
        parsedCoins.unshift(coinName);
        localStorage.setItem(
          "recentlyViewedCoins",
          JSON.stringify(parsedCoins)
        );
      }
    }
  }, [coinName]);

  return (
    <div>
      <Link
        href={"/coin"}
        className="w-[150px] ml-5 cursor-pointer flex items-center gap-1 mt-[20px] hover:underline"
      >
        <ArrowLeft className="w-5" />
        <p className="font-semibold">목록으로 돌아가기</p>
      </Link>
      <div className="flex  mt-[20px] h-[600px]">
        <CoinDetailInfo coinName={coinName as string} coinWsData={coinWsData} />

        <div className="w-full pl-5">
          <CoinGraph coinName={coinName as string} />
        </div>
      </div>

      <div
        className={`${
          tabsValue === "days" ? "max-w-[1280px]" : "w-[80%]"
        }  m-auto mt-10`}
      >
        <Tabs
          defaultValue="days"
          className="w-[300px]"
          onValueChange={(value) => setTabsValue(value as "days" | "weeks")}
        >
          <TabsList>
            <TabsTrigger value="days">일별로 보기</TabsTrigger>
            <TabsTrigger value="weeks">주별로 보기</TabsTrigger>
          </TabsList>
        </Tabs>

        <CoinCandles coinName={coinName as string} tabsValue={tabsValue} />
      </div>
    </div>
  );
};

export default CoinDetailPage;
