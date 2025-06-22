"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

interface CoinGraphProps {
  coinName: string;
}

const CoinGraph = ({ coinName }: CoinGraphProps) => {
  const { theme } = useTheme();

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
        theme: theme,
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
          "mainSeriesProperties.candleStyle.upColor":
            theme === "dark" ? "#e40000" : "#FF0000",
          "mainSeriesProperties.candleStyle.downColor":
            theme === "dark" ? "#3a3afe" : "#0000FF",
          "mainSeriesProperties.candleStyle.borderUpColor":
            theme === "dark" ? "#e40000" : "#FF0000",
          "mainSeriesProperties.candleStyle.borderDownColor":
            theme === "dark" ? "#3a3afe" : "#0000FF",
          "mainSeriesProperties.candleStyle.wickUpColor":
            theme === "dark" ? "#e40000" : "#FF0000",
          "mainSeriesProperties.candleStyle.wickDownColor":
            theme === "dark" ? "#3a3afe" : "#0000FF",
        },
        studies_overrides: {
          "volume.volume.color.0": theme === "dark" ? "#e40000" : "#FF0000", // 하락 시 색상
          "volume.volume.color.1": theme === "dark" ? "#3a3afe" : "#0000FF", // 상승 시 색상
          "volume.volume.transparency": 85, // 0 = 불투명, 100 = 완전 투명
        },
      });
    };
    document.body.appendChild(script);
  }, [coinName, theme]);

  return (
    <div className="w-full px-4 h-full">
      <div id="tradingview_chart" className="w-full h-[600px]"></div>
    </div>
  );
};

export default CoinGraph;
