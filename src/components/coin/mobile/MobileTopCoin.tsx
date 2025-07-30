import MobileTopCoinItem from "./MobileTopCoinItem";

interface MobileTopCoinProps {
  top5Coin: CoinTickerType[] | undefined;
  type: "UP" | "DOWN";
  coinName: AllCoinNameType[] | undefined;
}

const MobileTopCoin = ({ top5Coin, type, coinName }: MobileTopCoinProps) => {
  console.log(top5Coin);

  return (
    <div className="w-full h-[260px] p-1 bg-gray-50 dark:bg-gray-800 flex flex-col gap-2 rounded-lg">
      {top5Coin?.map((coin) => {
        const kr_name = coinName?.find(
          (nameData) => nameData.market === coin.market
        );

        return (
          <MobileTopCoinItem
            key={coin.market}
            type={type}
            coinName={coin.market}
            coinKrName={kr_name?.korean_name ?? ""}
            coinPrice={coin.trade_price}
            coinChangeRate={coin.change_rate}
            coinChange={coin.change}
          />
        );
      })}
    </div>
  );
};

export default MobileTopCoin;
