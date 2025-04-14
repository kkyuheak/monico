import { getAllCoin, getUpCoinList } from "@/utils/api/getUpCoinLists";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

interface UpCoinDataType {
  [market: string]: {
    market: string;
    trade_price: number;
    change_rate: number;
  };
}

const CoinUpList = () => {
  // 코인 이름
  const { data: coinListsName } = useQuery({
    queryKey: ["coinListsName"],
    queryFn: getAllCoin,
  });

  // 상승 코인 데이터
  const { data: upCoinListData } = useQuery<CoinTickerType[] | undefined>({
    queryKey: ["UpCoinLists"],
    queryFn: getUpCoinList,
  });

  const [upCoinLists, setUpCoinLists] = useState<UpCoinDataType>({});

  // webSocket
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (upCoinListData?.length === 0 || !upCoinListData) return;
    const upCoinListSlice = upCoinListData
      ?.slice(0, 3)
      .map((coin) => coin.market);
    console.log(upCoinListSlice);

    ws.current = new WebSocket(process.env.NEXT_PUBLIC_WS_API_URL!);
    ws.current.binaryType = "arraybuffer";

    ws.current.onopen = () => {
      const subscribeMsg = [
        { ticket: "monico-ticker" },
        {
          type: "ticker",
          codes: upCoinListSlice,
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

      const { trade_price, change_rate } = json;

      setUpCoinLists((prev) => ({
        ...prev,
        [json.code]: {
          market: json.code,
          trade_price,
          change_rate,
        },
      }));
    };
  }, [upCoinListData]);

  // useEffect(() => {
  //   console.log(upCoinLists);
  // }, [upCoinLists]);

  return (
    <div className="w-[400px] h-[200px] rounded-lg border border-gray-200 px-5 pt-4 pb-1 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <p className="font-bold text-[18px]">🚀 상승 종목</p>
        <p className="text-[14px] text-right cursor-pointer">더보기 {">"}</p>
      </div>

      <ul className="flex flex-col gap-1">
        {upCoinListData?.slice(0, 3).map((coin) => {
          const coinData = upCoinLists[coin.market];
          const KRCoinName = coinListsName?.find(
            (coinName) => coinName.market === coin.market
          );

          return (
            <li
              key={coin.market}
              className="flex items-center justify-between h-[45px]  rounded-md"
            >
              <div className="flex items-center gap-2">
                <img
                  src={`https://static.upbit.com/logos/${
                    coin.market.split("-")[1]
                  }.png`}
                  alt={coin.market.split("-")[1] + "icon"}
                  className="w-[30px] h-[30px] rounded-full"
                />
                <p>{KRCoinName?.korean_name}</p>
              </div>
              <div className="flex gap-3 font-semibold">
                <p className="">
                  {coinData?.trade_price.toLocaleString()}{" "}
                  <span className="text-[14px]">KRW</span>
                </p>
                <p className="text-[#1E90FF]">
                  +{(coinData?.change_rate * 100).toFixed(2)}%
                </p>
              </div>
            </li>
          );
        })}
        {/* <li className="flex items-center justify-between h-[45px]  rounded-md">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-blue-300 rounded-full"></div>
            <p>비트코인</p>
          </div>
          <div className="flex gap-3 font-semibold">
            <p className="">
              133 <span className="text-[14px]">KRW</span>
            </p>
            <p className="text-blue-100">+13%</p>
          </div>
        </li>
        <li className="flex items-center justify-between h-[45px]  rounded-md">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-blue-300 rounded-full"></div>
            <p>비트코인</p>
          </div>
          <div className="flex gap-3 font-semibold">
            <p className="">
              133 <span className="text-[14px]">KRW</span>
            </p>
            <p className="text-blue-100">+13%</p>
          </div>
        </li>
        <li className="flex items-center justify-between h-[45px]  rounded-md">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-blue-300 rounded-full"></div>
            <p>비트코인</p>
          </div>
          <div className="flex gap-3 font-semibold">
            <p className="">
              133 <span className="text-[14px]">KRW</span>
            </p>
            <p className="text-blue-100">+13%</p>
          </div>
        </li> */}
      </ul>
    </div>
  );
};

export default CoinUpList;
