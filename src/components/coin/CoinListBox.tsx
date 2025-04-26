"use client";

import { favoriteCoin } from "@/utils/favoriteCoin";
import { Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CoinLiostBoxProps {
  coinName: string;
  market: string;
  price: number;
  changeRate: number;
  accTradeVolume24h: number;
  accTradePrice24h: number;
  tabName: string;
  userFavoriteCoin: string[] | null | undefined;
  isLoggedIn: UserInfoType | null;
}

const CoinListBox = ({
  coinName,
  market,
  price,
  changeRate,
  accTradePrice24h,
  accTradeVolume24h,
  tabName,
  userFavoriteCoin,
  isLoggedIn,
}: CoinLiostBoxProps) => {
  const router = useRouter();

  const coinSymbol = market.split("-")[1];

  const BTCprice = () => {
    if (price.toString().includes("e")) {
      const splitNum = price.toString().split("-")[1];
      return price.toFixed(+splitNum);
    } else {
      return price;
    }
  };

  const [isFavorited, setIsFavorited] = useState(false);

  const handleStarClick = async () => {
    if (!isLoggedIn) {
      alert("로그인이 필요한 서비스입니다.");
      return;
    }

    if (!isFavorited) {
      try {
        await favoriteCoin(market, "add");
        setIsFavorited(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await favoriteCoin(market, "delete");
        setIsFavorited(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (userFavoriteCoin) {
      if (userFavoriteCoin.includes(market)) {
        setIsFavorited(true);
      } else {
        setIsFavorited(false);
      }
    }
  }, [userFavoriteCoin, market]);

  return (
    <tr className="border-b border-[#d8d8d8] h-[68px]  tabular-nums">
      <td className="pl-1">
        <div className="flex items-center justify-center">
          <Star
            fill={isFavorited && isLoggedIn ? "#facc15" : "white"}
            stroke={isFavorited && isLoggedIn ? "#facc15" : "black"}
            className="w-5 h-5 cursor-pointer"
            onClick={() => handleStarClick()}
          />
        </div>
      </td>
      <td className="w-[300px]" onClick={() => router.push(`/coin/${market}`)}>
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
      <td className="text-center text-[18px] font-semibold">
        {tabName === "KRW" ? price?.toLocaleString("ko-KR") : BTCprice()}
        <span className="text-[10px] font-medium">
          {" "}
          {tabName === "KRW" ? "KRW" : "BTC"}
        </span>
      </td>
      <td
        className={`w-[150px] text-center font-bold ${
          changeRate > 0 ? "text-[#FF3D00]" : "text-[#1E90FF]"
        }`}
      >
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
