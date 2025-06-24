import { ChevronDown, ChevronUp } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface CoinCandleListProps {
  date: string;
  price: string | number | undefined;
  changePrice: string | number | undefined;
  changeRate: string;
  accTradeVolume: string;
  accTradePrice: string;
  tabsValue: string;
}

const CoinCandleList = ({
  date,
  price,
  changePrice,
  changeRate,
  accTradePrice,
  accTradeVolume,
  tabsValue,
}: CoinCandleListProps) => {
  const isMinus = changeRate?.startsWith("-");

  return (
    <tr className="h-[55px] text-center border-b text-zinc-700 dark:text-zinc-300 font-semibold">
      <td className="">{date}</td>
      <td className="pl-10">{price}</td>
      {tabsValue === "days" && (
        <>
          <td
            className={twMerge(
              `${isMinus ? "text-coin-minus" : "text-coin-plus"} ${
                !changePrice ? "text-zinc-700" : ""
              }`
            )}
          >
            {!changePrice ? 0 : changePrice}
          </td>
          <td
            className={twMerge(
              `${isMinus ? "text-coin-minus" : "text-coin-plus"} ${
                Number(changeRate) === 0 ? "text-zinc-700" : ""
              }`
            )}
          >
            <p className="flex items-center justify-center">
              {Number(changeRate) !== 0 ? (
                isMinus ? (
                  <ChevronDown className="w-5" />
                ) : (
                  <ChevronUp className="w-5" />
                )
              ) : null}
              {Number(changeRate) !== 0
                ? isMinus
                  ? changeRate.split("-")[1]
                  : changeRate
                : 0}
              %
            </p>
          </td>
        </>
      )}
      <td>{accTradeVolume}</td>
      <td>{accTradePrice}</td>
    </tr>
  );
};

export default CoinCandleList;
