import { getCoinKRName } from "@/utils/coin/getCoinKRName";
import { useQuery } from "@tanstack/react-query";
import { twMerge } from "tailwind-merge";

interface CoinDetailInfoProps {
  coinName: string;
  coinWsData: CoinInfoType | undefined;
}

const CoinDetailInfo = ({ coinName, coinWsData }: CoinDetailInfoProps) => {
  const coinSymbol = coinName.split("-")[1];

  const { data: coinKrName } = useQuery({
    queryKey: ["coinKrName", coinName],
    queryFn: () => getCoinKRName(coinName),
  });

  const coinInfoList = coinWsData
    ? [
        {
          title: "고가",
          data: coinWsData.high_price.toLocaleString(),
          id: "high_price",
        },
        {
          title: "저가",
          data: coinWsData.low_price.toLocaleString(),
          id: "low_price",
        },
        {
          title: "누적 거래량(24h)",
          data: coinWsData.acc_trade_volume_24h.toLocaleString(),
          id: "acc_trade_volume_24h",
        },
        {
          title: "누적 거래대금(24h)",
          data: Math.ceil(coinWsData.acc_trade_price_24h).toLocaleString(),
          id: "acc_trade_price_24h",
        },
        {
          title: "52주 최고가",
          data: coinWsData.highest_52_week_price.toLocaleString(),
          id: "highest_52_week_price",
        },
        {
          title: "52주 최저가",
          data: coinWsData.lowest_52_week_price.toLocaleString(),
          id: "lowest_52_week_price",
        },
      ]
    : [];

  return (
    <div className="w-[500px] h-full px-5 border-r border-gray-300">
      {!coinWsData ? (
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
                {coinWsData.trade_price.toLocaleString()}
                <span className="text-[16px] font-medium">KRW</span>
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <p className="text-gray-500 text-[14px]">전일 대비</p>
              <p
                className={twMerge(
                  `font-bold text-[16px] text-black ${
                    coinWsData.change === "RISE"
                      ? "text-coin-plus"
                      : "text-coin-minus"
                  }`
                )}
              >
                {coinWsData.change === "RISE" ? "+" : "-"}
                {coinWsData.change_price.toLocaleString()}(
                {(coinWsData.change_rate * 100).toFixed(2)}
                %)
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
