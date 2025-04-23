"use client";

import { getCoinCandles } from "@/utils/coin/getCoinCandles";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import CoinCandleList from "./CoinCandleList";
import { useEffect, useState } from "react";
import CoinCandleSkeleton from "./CoinCandleSkeleton";

interface CoinCandlesProps {
  coinName: string;
}

const CoinCandles = ({ coinName }: CoinCandlesProps) => {
  const { data: coinCandlesData } = useQuery<CoinCandlesDayType[]>({
    queryKey: ["coinCandlesData", coinName],
    queryFn: () => getCoinCandles(coinName, "days", 200),
  });

  const [coinCandlesFilterLists, setCoinCandlesFilterLists] = useState<
    CoinCandlesDayType[]
  >([]);

  const [moreCount, setMoreCount] = useState(20);

  useEffect(() => {
    if (coinCandlesData) {
      setCoinCandlesFilterLists(coinCandlesData.slice(0, moreCount));
    }
  }, [coinCandlesData, moreCount]);

  const moreBtnClick = () => {
    if (coinCandlesData) {
      if (moreCount >= coinCandlesData.length) return;
    }
    setMoreCount((prev) => prev + 20);
  };

  return (
    <div className="mt-10 flex flex-col items-center gap-3 pb-5">
      <table className="w-full">
        <thead className="h-[45px] border-y">
          <tr>
            <th className="w-[50px]">일자</th>
            <th className="pl-10">가격</th>
            <th>등락폭</th>
            <th>변동률</th>
            <th>누적 거래량</th>
            <th className="">누적 거래 금액</th>
          </tr>
        </thead>
        <tbody>
          {coinCandlesData
            ? coinCandlesFilterLists.map((candleData, index) => (
                <CoinCandleList
                  key={index}
                  date={dayjs(candleData.candle_date_time_kst).format("MM/DD")}
                  price={candleData.trade_price.toLocaleString()}
                  changePrice={candleData.change_price.toLocaleString()}
                  changeRate={(candleData.change_rate * 100).toFixed(2)}
                  accTradeVolume={candleData.candle_acc_trade_volume.toLocaleString()}
                  accTradePrice={candleData.candle_acc_trade_price.toLocaleString()}
                />
              ))
            : Array.from({ length: 10 }).map((_, i) => (
                <CoinCandleSkeleton key={i} />
              ))}
        </tbody>
      </table>
      {moreCount !== 200 && coinCandlesFilterLists.length > 0 && (
        <button
          type="button"
          onClick={moreBtnClick}
          className="w-[300px] h-[50px] border text-gray-500 font-semibold rounded-md cursor-pointer hover:text-gray-800"
        >
          더 보기
        </button>
      )}
    </div>
  );
};

export default CoinCandles;
