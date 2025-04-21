import { getCoinKRName } from "@/utils/coin/getCoinKRName";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

interface CoinDetailInfoProps {
  coinName: string;
}

const CoinDetailInfo = ({ coinName }: CoinDetailInfoProps) => {
  const coinSymbol = coinName.split("-")[1];

  const { data: coinKrName } = useQuery({
    queryKey: ["coinKrName", coinName],
    queryFn: () => getCoinKRName(coinName),
  });

  const [coinData, setCoinData] = useState<CoinInfoType>();

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

      console.log("coinDetailInfo open");

      ws.current?.send(JSON.stringify(subscribeMsg));
    };

    ws.current.onmessage = async (event) => {
      const data =
        event.data instanceof Blob
          ? await event.data.arrayBuffer()
          : event.data;
      const enc = new TextDecoder("utf-8");
      const json = JSON.parse(enc.decode(data));
      console.log(json);

      setCoinData(json);
    };

    return () => {
      ws.current?.close();
      console.log("coinDetailInfo WS close");
    };
  }, []);

  const coinInfoList = coinData
    ? [
        {
          title: "고가",
          data: coinData.high_price.toLocaleString(),
          id: "high_price",
        },
        {
          title: "저가",
          data: coinData.low_price.toLocaleString(),
          id: "low_price",
        },
        {
          title: "누적 거래량(24h)",
          data: coinData.acc_trade_volume_24h.toLocaleString(),
          id: "acc_trade_volume_24h",
        },
        {
          title: "누적 거래대금(24h)",
          data: Math.ceil(coinData.acc_trade_price_24h).toLocaleString(),
          id: "acc_trade_price_24h",
        },
        {
          title: "52주 최고가",
          data: coinData.highest_52_week_price.toLocaleString(),
          id: "highest_52_week_price",
        },
        {
          title: "52주 최저가",
          data: coinData.lowest_52_week_price.toLocaleString(),
          id: "lowest_52_week_price",
        },
      ]
    : [];

  return (
    <div className="w-[400px] h-[calc(100vh-103px)] px-5 border-r border-gray-300">
      {!coinData ? (
        <div>로딩중</div>
      ) : (
        <>
          <div>
            <div className="flex items-center gap-2">
              <img
                src={`https://static.upbit.com/logos/${coinSymbol}.png`}
                alt={coinName + "icon"}
                className="w-10 h-10"
              />
              <div className="flex items-baseline gap-1">
                <p className="font-bold text-[22px]">{coinKrName}</p>
                <p className="text-[13px] text-gray-400">BTC</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-[30px] font-extrabold">
                {coinData.trade_price.toLocaleString()}
                <span className="text-[16px] font-medium">KRW</span>
              </p>
              <p
                className={twMerge(
                  `font-bold text-[20px] text-black ${
                    coinData.change === "RISE"
                      ? "text-coin-plus"
                      : "text-coin-minus"
                  }`
                )}
              >
                {coinData?.change === "RISE" ? "+" : "-"}
                {(coinData?.signed_change_rate * 100).toFixed(2)}%
              </p>
            </div>
          </div>

          <ul className="mt-[50px] text-[14px] font-bold">
            {coinInfoList.map((coinInfo) => {
              return (
                <li
                  className="flex items-center justify-between h-[45px]  border-b border-gray-200"
                  key={coinInfo.id}
                >
                  <p className={`text-gray-500`}>{coinInfo.title}</p>
                  <p
                    className={twMerge(
                      `text-gray-500 ${
                        coinInfo.id === "high_price" && "text-coin-plus"
                      } ${coinInfo.id === "low_price" && "text-coin-minus"}`
                    )}
                  >
                    {coinInfo.data}
                  </p>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default CoinDetailInfo;
