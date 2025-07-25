"use client";

import { favoriteCoin } from "@/utils/favoriteCoin";
import { useMutation } from "@tanstack/react-query";
import { Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { queryClient } from "../provider/QueryProvider";
import { BTCprice } from "@/utils/coin/BTCprice";
import { twMerge } from "tailwind-merge";

interface CoinLiostBoxProps {
  coinName: string;
  market: string;
  price: number;
  changeRate: number;
  accTradeVolume24h: number;
  accTradePrice24h: number;
  tabName?: string;
  userFavoriteCoin?: string[] | null | undefined;
  isLoggedIn?: boolean | null;
}

const CoinListBox = ({
  coinName,
  market,
  price,
  changeRate,
  accTradePrice24h,
  accTradeVolume24h,
  tabName = "KRW",
  userFavoriteCoin,
  isLoggedIn,
}: CoinLiostBoxProps) => {
  const router = useRouter();

  const coinSymbol = market.split("-")[1];

  const [isFavorited, setIsFavorited] = useState(false);

  const handleStarClick = async () => {
    if (!isLoggedIn) {
      alert("로그인이 필요한 서비스입니다.");
      return;
    }

    if (!isFavorited) {
      try {
        await favoriteCoin(market, "add");
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await favoriteCoin(market, "delete");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const { mutate } = useMutation({
    mutationFn: handleStarClick,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["userFavoriteCoin"] }),
  });

  useEffect(() => {
    if (userFavoriteCoin) {
      if (userFavoriteCoin.includes(market)) {
        setIsFavorited(true);
      } else {
        setIsFavorited(false);
      }
    }
  }, [userFavoriteCoin, market]);

  // 가격 변동률에 따른 색상
  const priceStyle = () => {
    if (changeRate > 0) {
      return "text-[#FF3D00]";
    } else if (changeRate < 0) {
      return "text-[#1E90FF]";
    }
  };
  return (
    <tr className="border-b border-[#e8e8e8] dark:border-[#373737] h-[64px] text-[#121712] dark:text-white dark:bg-[#1C2126] tabular-nums">
      {isLoggedIn && (
        <td className="pl-1">
          <div className="flex items-center justify-center">
            <Star
              fill={isFavorited && isLoggedIn ? "#facc15" : "white"}
              stroke={isFavorited && isLoggedIn ? "#facc15" : "black"}
              className="w-5 h-5 cursor-pointer"
              onClick={() => mutate()}
            />
          </div>
        </td>
      )}
      <td
        className={twMerge("w-[300px]", isLoggedIn ? "" : "pl-2")}
        onClick={() => router.push(`/coin/${market}`)}
      >
        <div className="flex h-full items-center gap-3 ml-2 cursor-pointer">
          <Image
            src={`https://static.upbit.com/logos/${coinSymbol}.png`}
            alt={coinSymbol + "icon"}
            width={30}
            height={30}
            className="rounded-full w-[30px] h-[30px]"
          />
          <p className="font-semibold">{coinName}</p>
        </div>
      </td>
      <td
        className={twMerge(
          "text-center text-[18px] font-semibold",
          priceStyle()
        )}
      >
        {tabName === "KRW" ? price?.toLocaleString("ko-KR") : BTCprice(price)}
        <span className="text-[10px] font-medium">
          {" "}
          {tabName === "KRW" ? "KRW" : "BTC"}
        </span>
      </td>
      <td className={`w-[150px] text-center font-bold ${priceStyle()}`}>
        {changeRate > 0 && "+"}
        {(changeRate * 100).toFixed(2)}%
      </td>
      <td className="text-center font-semibold">
        {accTradeVolume24h?.toLocaleString("ko-KR")}
        <span className="text-[10px] font-medium"> {coinSymbol}</span>
      </td>
      <td className="text-center font-semibold">
        {tabName === "KRW"
          ? Math.ceil(accTradePrice24h).toLocaleString("ko-KR")
          : accTradePrice24h.toLocaleString()}
        <span className="text-[10px] font-medium">
          {" "}
          {tabName === "KRW" ? "KRW" : "BTC"}
        </span>
      </td>
    </tr>
  );
};

export default CoinListBox;
