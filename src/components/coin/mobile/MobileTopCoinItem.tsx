"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

interface MobileTopCoinItemProps {
  type: "UP" | "DOWN";
  coinName: string;
  coinKrName: string;
  coinPrice: number;
  coinChangeRate: number;
  coinChange: string;
}

const MobileTopCoinItem = ({
  type,
  coinName,
  coinKrName,
  coinPrice,
  coinChangeRate,
  coinChange,
}: MobileTopCoinItemProps) => {
  const router = useRouter();

  return (
    <div
      className="h-full px-2 flex justify-between items-center gap-2 font-semibold text-[14px]"
      onClick={() => router.push(`/coin/${coinName}`)}
    >
      <div className="flex items-center gap-2">
        <Image
          src={`https://static.upbit.com/logos/${coinName.split("-")[1]}.png`}
          alt={coinName.split("-")[1] + "icon"}
          width={35}
          height={35}
          className="rounded-full w-6 h-6"
        />
        <p>{coinKrName}</p>
      </div>

      <div className="flex justify-start items-center gap-4">
        <p className="">{coinPrice.toLocaleString()}KRW</p>
        <p
          className={twMerge(
            `${type === "UP" ? "text-coin-plus" : "text-coin-minus"}`
          )}
        >
          {coinChange === "RISE" ? "+" : "-"}
          {(coinChangeRate * 100).toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

export default MobileTopCoinItem;
