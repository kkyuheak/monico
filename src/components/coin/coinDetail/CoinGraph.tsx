"use client";

import { getCoinCandles } from "@/utils/coin/getCoinCandles";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
// import ReactApexChart from "react-apexcharts";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface CoinGraphProps {
  coinName: string;
  coinWsData: any;
}

const CoinGraph = ({ coinName, coinWsData }: CoinGraphProps) => {
  const [series, setSeries] = useState<any[]>([]);

  const { data: coinCandlesData } = useQuery<CoinCandlesType[]>({
    queryKey: ["coinCandlesData", coinName],
    queryFn: () => getCoinCandles(coinName, "minutes"),
  });

  useEffect(() => {
    if (!coinCandlesData) return;
    const formatCandleData = coinCandlesData.reverse().map((data) => ({
      x: new Date(data.timestamp),
      y: [
        data.opening_price,
        data.high_price,
        data.low_price,
        data.trade_price,
      ],
    }));

    setSeries([{ data: formatCandleData }]);
  }, [coinCandlesData]);

  useEffect(() => {
    if (series.length === 0) return;

    const latest = {
      x: new Date(coinWsData.timestamp),
      y: [
        coinWsData.opening_price,
        coinWsData.high_price,
        coinWsData.low_price,
        coinWsData.trade_price,
      ],
    };

    setSeries((prev) => {
      const updated = [...prev[0].data];
      updated.push(latest);
      if (updated.length > 30) updated.shift();
      return [{ data: updated }];
    });
  }, [coinWsData]);

  useEffect(() => {
    console.log(series);
  }, [series]);

  return (
    <div>
      <ReactApexChart
        type="candlestick"
        series={series}
        options={{
          chart: {
            id: "realtime-coin-chart",
            animations: { enabled: true },
          },
          xaxis: {
            type: "datetime",
          },
        }}
      />
    </div>
  );
};

export default CoinGraph;
