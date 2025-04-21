import { getCoinKRName } from "@/utils/coin/getCoinKRName";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

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

  return (
    <div className="w-[400px] px-5 border-r border-gray-300">
      <div>
        <div className="flex items-center gap-2">
          {/* <div className="w-10 h-10 bg-blue-300 rounded-full"></div> */}
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
            {coinData?.trade_price.toLocaleString()}
            <span className="text-[16px] font-medium">KRW</span>
          </p>
          <p className="font-bold text-[20px] text-coin-minus">-0.6%</p>
        </div>
      </div>

      <ul className="mt-[50px] text-[14px] font-bold">
        <li className="flex items-center justify-between h-[45px]  border-b border-gray-200">
          <p className="text-gray-500">시가총액</p>
          <p>1,678,101,132,426</p>
        </li>
        <li className="flex items-center justify-between h-[45px]  border-b border-gray-200">
          <p>시가총액</p>
          <p>1,678,101,132,426</p>
        </li>

        <li className="flex items-center justify-between h-[45px]  border-b border-gray-200">
          <p>시가총액</p>
          <p>1,678,101,132,426</p>
        </li>
        <li className="flex items-center justify-between h-[45px]  border-b border-gray-200">
          <p>시가총액</p>
          <p>1,678,101,132,426</p>
        </li>
      </ul>
    </div>
  );
};

export default CoinDetailInfo;
