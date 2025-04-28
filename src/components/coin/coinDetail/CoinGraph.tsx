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
