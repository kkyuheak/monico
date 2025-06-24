import { BTCprice } from "@/utils/coin/BTCprice";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SearchResultCoinProps {
  coinName: string;
  coinKrName: string | undefined;
  coinPrice: number;
  coinChangeRate: number;
  coinChange: string;
  type: string;
}

const SearchResultCoin = ({
  coinName,
  coinKrName,
  coinPrice,
  coinChangeRate,
  type,
  coinChange,
}: SearchResultCoinProps) => {
  const coinChangeStyle = () => {
    if (coinChange === "FALL") {
      return "text-coin-minus";
    } else if (coinChange === "RISE") {
      return "text-coin-plus";
    } else {
      return "text-gray-500";
    }
  };

  const coinSymbol = coinName.split("-")[1];

  const router = useRouter();

  return (
    <div
      className="flex items-center gap-2 justify-between px-2 py-2 rounded-md cursor-pointer bg-[#fafafa] dark:bg-black/20 hover:bg-[#ededed] dark:hover:bg-black/30"
      onClick={() => router.push(`/coin/${coinName}`)}
    >
      <div className="flex items-center gap-2">
        <Image
          src={`https://static.upbit.com/logos/${coinSymbol}.png`}
          alt={coinSymbol}
          width={30}
          height={30}
          className="rounded-full w-[30px] h-[30px]"
        />
        <div className="flex flex-col gap-0">
          <p className="font-semibold text-[14px]">{coinKrName || ""}</p>
          <span className="text-[10px] font-medium">{coinName}</span>
        </div>
      </div>
      <div className="flex flex-col gap-0">
        <p className="font-medium">
          {type === "KRW"
            ? Math.ceil(coinPrice).toLocaleString("ko-KR")
            : BTCprice(coinPrice)}{" "}
          <span className="text-[11px]">{type}</span>
        </p>
        <p
          className={`text-[12px] font-medium ${coinChangeStyle()} text-right`}
        >
          {coinChange === "FALL" ? "-" : coinChange === "RISE" ? "+" : ""}
          {(coinChangeRate * 100).toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

export default SearchResultCoin;
