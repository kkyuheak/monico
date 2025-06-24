interface Window {
  TradingView: {
    widget: new (options: TradingViewWidgetOptions) => void;
  };
}

interface TradingViewWidgetOptions {
  container_id: string;
  autosize?: boolean;
  symbol: string;
  interval?: string;
  timezone?: string;
  theme?: string;
  style?: string;
  locale?: string;
  toolbar_bg?: string;
  enable_publishing?: boolean;
  allow_symbol_change?: boolean;
  hide_top_toolbar?: boolean;
  hide_legend?: boolean;
  save_image?: boolean;
  studies?: string[];
  show_popup_button?: boolean;
  popup_width?: string;
  popup_height?: string;
  overrides?: {
    [key: string]:
      | string
      | boolean
      | number
      | { [key: string]: string | boolean | number };
    "mainSeriesProperties.candleStyle.upColor"?: string;
    "mainSeriesProperties.candleStyle.downColor"?: string;
    "mainSeriesProperties.candleStyle.borderUpColor"?: string;
    "mainSeriesProperties.candleStyle.borderDownColor"?: string;
    "mainSeriesProperties.candleStyle.wickUpColor"?: string;
    "mainSeriesProperties.candleStyle.wickDownColor"?: string;
  };
  studies_overrides?: {
    [key: string]: string | number;
    "volume.volume.color.0"?: string;
    "volume.volume.color.1"?: string;
    "volume.volume.transparency"?: number;
  };
}
