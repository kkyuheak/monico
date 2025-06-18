"use client";

import { useEffect } from "react";

interface CoinGraphProps {
  coinName: string;
}

const CoinGraph = ({ coinName }: CoinGraphProps) => {
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
        overrides: {
          "mainSeriesProperties.candleStyle.upColor": "#FF0000",
          "mainSeriesProperties.candleStyle.downColor": "#0000FF",
          "mainSeriesProperties.candleStyle.borderUpColor": "#FF0000",
          "mainSeriesProperties.candleStyle.borderDownColor": "#0000FF",
          "mainSeriesProperties.candleStyle.wickUpColor": "#FF0000",
          "mainSeriesProperties.candleStyle.wickDownColor": "#0000FF",
        },
        studies_overrides: {
          "volume.volume.color.0": "#FF0000", // 하락 시 색상
          "volume.volume.color.1": "#0000FF", // 상승 시 색상
          "volume.volume.transparency": 85, // 0 = 불투명, 100 = 완전 투명
        },
      });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="w-full px-4 h-full">
      <div id="tradingview_chart" className="w-full h-[600px]"></div>
    </div>
  );
};

export default CoinGraph;
