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
  const [isKRW, setIsKRW] = useState(true);

  useEffect(() => {
    if (coinName.startsWith("KRW")) {
      setIsKRW(true);
    } else {
      setIsKRW(false);
    }
  }, [coinName]);

  const { data: coinCandlesData } = useQuery<CoinCandlesDayType[]>({
    queryKey: ["coinCandlesData", coinName],
    queryFn: () => getCoinCandles(coinName, "days", 200),
  });

  const BTCprice = (price: number) => {
    if (isKRW) return;

    if (price) {
      if (price.toString().includes("e")) {
        const splitNum = price.toString().split("-")[1];
        return price.toFixed(+splitNum);
      } else {
        return price;
      }
    }
  };

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
    <div className="mt-2 flex flex-col items-center gap-3 pb-5">
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
                  price={
                    isKRW
                      ? candleData.trade_price.toLocaleString()
                      : candleData.trade_price
                  }
                  changePrice={
                    isKRW
                      ? candleData.change_price?.toLocaleString()
                      : BTCprice(candleData.change_price)
                  }
                  changeRate={
                    isKRW
                      ? (candleData.change_rate * 100).toFixed(2)
                      : candleData.change_rate.toString()
                  }
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
