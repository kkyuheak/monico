interface AllCoinNameType {
  market: string;
  korean_name: string;
  english_name: string;
  market_event: {
    warning: boolean;
    caution: {
      PRICE_FLUCTUATIONS: boolean;
      TRADING_VOLUME_SOARING: boolean;
      DEPOSIT_AMOUNT_SOARING: boolean;
      GLOBAL_PRICE_DIFFERENCES: boolean;
      CONCENTRATION_OF_SMALL_ACCOUNTS: boolean;
    };
  };
}

interface CoinInfoType {
  type: string;
  code: string;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  prev_closing_price: number;
  acc_trade_price: number;
  change: string;
  change_price: number;
  signed_change_price: number;
  change_rate: number;
  signed_change_rate: number;
  ask_bid: string;
  trade_volume: number;
  acc_trade_volume: number;
  trade_date: string;
  trade_time: string;
  trade_timestamp: number;
  acc_ask_volume: number;
  acc_bid_volume: number;
  highest_52_week_price: number;
  highest_52_week_date: string;
  lowest_52_week_price: number;
  lowest_52_week_date: string;
  market_state: string;
  is_trading_suspended: false;
  delisting_date: null | Date;
  market_warning: string;
  timestamp: number;
  acc_trade_price_24h: number;
  acc_trade_volume_24h: number;
  stream_type: string;
}
