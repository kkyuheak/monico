"use client";

import CoinDetailInfo from "@/components/coin/coinDetail/CoinDetailInfo";
import CoinGraph from "@/components/coin/coinDetail/CoinGraph";
import { getDetailTicker } from "@/utils/coin/getDetailTicker";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const page = () => {
  const { coinName } = useParams();

  const { data: coinDetailData } = useQuery({
    queryKey: ["coinDetailData", coinName],
    queryFn: () => getDetailTicker(coinName),
  });

  const [coinWsData, setCoinWsData] = useState();

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
  }, []);

  return (
    <div className="flex max-w-[1650px] m-auto mt-[50px]">
      <CoinDetailInfo coinName={coinName as string} />

      <CoinGraph coinName={coinName as string} coinWsData={coinWsData} />
    </div>
  );
};

export default page;
