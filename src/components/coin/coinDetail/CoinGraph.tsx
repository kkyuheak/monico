"use client";

import { useEffect, useState } from "react";

interface CoinGraphProps {
  coinName: string;
  coinWsData: any;
}

const CoinGraph = ({ coinName, coinWsData }: CoinGraphProps) => {
  // const [series, setSeries] = useState<any[]>([]);

  // const { data: coinCandlesData } = useQuery<CoinCandlesType[]>({
  //   queryKey: ["coinCandlesData", coinName],
  //   queryFn: () => getCoinCandles(coinName, "minutes"),
  // });

  // useEffect(() => {
  //   if (!coinCandlesData) return;
  //   const formatCandleData = coinCandlesData.reverse().map((data) => ({
  //     x: dayjs(data.timestamp).format("YYYY-MM-DD HH:mm:ss"),
  //     y: [
  //       data.opening_price,
  //       data.high_price,
  //       data.low_price,
  //       data.trade_price,
  //     ],
  //   }));

  //   setSeries([{ data: formatCandleData }]);
  // }, [coinCandlesData]);

  // useEffect(() => {
  //   if (series.length === 0) return;

  //   const latest = {
  //     x: dayjs(coinWsData.timestamp),
  //     y: [
  //       coinWsData.opening_price,
  //       coinWsData.high_price,
  //       coinWsData.low_price,
  //       coinWsData.trade_price,
  //     ],
  //   };

  //   // setSeries((prev) => {
  //   //   const updated = [...prev[0].data];
  //   //   updated.push(latest);
  //   //   if (updated.length > 50) updated.shift();
  //   //   return [{ data: updated }];
  //   // });
  // }, [coinWsData]);

  useEffect(() => {
    const symbolName = coinName.split("-").reverse().join("");
    console.log(symbolName);

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      new (window as any).TradingView.widget({
        container_id: "tradingview_chart",
        autosize: true,
        symbol: `UPBIT:${symbolName}`,
        interval: "1",
        timezone: "Asia/Seoul",
        theme: "light",
        style: "1",
        locale: "kr",
        toolbar_bg: "#f1f3f6",
        enable_publishing: false,
        allow_symbol_change: true,
        hide_top_toolbar: false,
        hide_legend: false,
        save_image: false,
        studies: [],
        show_popup_button: true,
        popup_width: "1000",
        popup_height: "650",
      });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="w-full px-4 h-full">
      {/* <ReactApexChart
        type="candlestick"
        series={series}
        options={{
          chart: {
            id: "realtime-coin-chart",
            animations: {
              enabled: true,

              speed: 300,
              animateGradually: {
                enabled: true,
                delay: 150,
              },
              dynamicAnimation: {
                enabled: true,
                speed: 350,
              },
            },
          },
          xaxis: {
            // type: "datetime",
          },
        }}
      /> */}
      <div id="tradingview_chart" className="w-full h-[600px]"></div>
    </div>
  );
};

export default CoinGraph;
