import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
interface CoinRecommendBoxProps {
  coinName: string;
  coinKrName: string;
  coinPrice: number;
  coinChangeRate: number;
  coinChange: string;
}

const CoinRecommendBox = ({
  coinName,
  coinKrName,
  coinPrice,
  coinChangeRate,
  coinChange,
}: CoinRecommendBoxProps) => {
  const router = useRouter();

  return (
    <div
      className="w-[250px] h-[150px] bg-[#f3f3f3] rounded-md flex flex-col gap-3 justify-center px-3 py-2 cursor-pointer hover:bg-[#e5e5e5] shadow"
      onClick={() => router.push(`/coin/${coinName}`)}
    >
      <div className="flex items-center gap-2">
        <Image
          src={`https://static.upbit.com/logos/${coinName.split("-")[1]}.png`}
          alt={coinName.split("-")[1] + "icon"}
          width={35}
          height={35}
          className="rounded-full w-[35px] h-[35px]"
        />
        <div className="flex flex-col justify-center">
          <p className="font-bold text-[15px]">{coinKrName}</p>
          <p className="text-[12px]">{coinName}</p>
        </div>
      </div>
      <div className="flex items-baseline gap-[2px]">
        <p className="font-semibold text-[22px]">
          {coinPrice.toLocaleString()}
        </p>
        <span className="font-medium text-[13px]">KRW</span>
      </div>

      <div
        className={`flex items-center font-bold ${
          coinChange === "RISE" ? "text-coin-plus" : "text-coin-minus"
        } `}
      >
        {coinChange === "RISE" ? (
          <>
            <ChevronUp className="w-5" />
            <p>{(coinChangeRate * 100).toFixed(2)}%</p>
          </>
        ) : (
          <>
            <ChevronDown className="w-5" />
            <p>{(coinChangeRate * 100).toFixed(2)}%</p>
          </>
        )}
      </div>
    </div>
  );
};

export default CoinRecommendBox;
