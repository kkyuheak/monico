"use client";

import CoinCandles from "@/components/coin/coinDetail/CoinCandles";
import CoinDetailInfo from "@/components/coin/coinDetail/CoinDetailInfo";
import CoinGraph from "@/components/coin/coinDetail/CoinGraph";
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

      console.log("coinDetailPage open");

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
      console.log("coinDetailPage WS close");
    };
  }, [coinName]);

  return (
    <div className="max-w-[1650px] m-auto">
      <Link
        href={"/coin"}
        className="w-[150px] ml-5 cursor-pointer flex items-center gap-1 mt-[20px] hover:underline"
      >
        <ArrowLeft className="w-5" />
        <p className="font-semibold">목록으로 돌아가기</p>
      </Link>
      <div className="flex  mt-[20px] h-[600px]">
        <CoinDetailInfo coinName={coinName as string} coinWsData={coinWsData} />

        <CoinGraph coinName={coinName as string} coinWsData={coinWsData} />
      </div>
      <div>
        <CoinCandles coinName={coinName as string} />
      </div>
    </div>
  );
};

export default CoinDetailPage;
