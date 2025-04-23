import { ChevronDown, ChevronUp } from "lucide-react";

interface CoinCandleListProps {
  date: string;
  price: string;
  changePrice: string;
  changeRate: string;
  accTradeVolume: string;
  accTradePrice: string;
}

const CoinCandleList = ({
  date,
  price,
  changePrice,
  changeRate,
  accTradePrice,
  accTradeVolume,
}: CoinCandleListProps) => {
  const isMinus = changeRate.includes("-");

  return (
    <tr className="h-[55px] text-center border-b text-zinc-700 font-semibold">
      <td className="">{date}</td>
      <td className="pl-10">{price}</td>
      <td className={`${isMinus ? "text-coin-minus" : "text-coin-plus"}`}>
        {changePrice}
      </td>
      <td className={`${isMinus ? "text-coin-minus" : "text-coin-plus"}`}>
        <p className="flex items-center justify-center">
          {isMinus ? (
            <ChevronDown className="w-5" />
          ) : (
            <ChevronUp className="w-5" />
          )}
          {isMinus ? changeRate.split("-")[1] : changeRate}%
        </p>
      </td>
      <td>{accTradeVolume}</td>
      <td>{accTradePrice}</td>
    </tr>
  );
};

export default CoinCandleList;
