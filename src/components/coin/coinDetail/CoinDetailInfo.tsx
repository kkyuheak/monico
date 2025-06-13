import { queryClient } from "@/components/provider/QueryProvider";
import { checkFavoriteCoin } from "@/utils/checkFavoriteCoin";
import { getCoinKRName } from "@/utils/coin/getCoinKRName";
import { favoriteCoin } from "@/utils/favoriteCoin";
import { getUserInfo } from "@/utils/getUserInfo";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface CoinDetailInfoProps {
  coinName: string;
  coinWsData: CoinInfoType | undefined;
}

const CoinDetailInfo = ({ coinName, coinWsData }: CoinDetailInfoProps) => {
  const [isKRW, setIsKRW] = useState(true);

  useEffect(() => {
    if (coinName.startsWith("KRW")) {
      setIsKRW(true);
    } else {
      setIsKRW(false);
    }
  }, [coinName]);

  const coinSymbol = coinName.split("-")[1];

  const { data: coinKrName } = useQuery({
    queryKey: ["coinKrName", coinName],
    queryFn: () => getCoinKRName(coinName),
  });

  const BTCprice = () => {
    if (isKRW) return;

    if (coinWsData) {
      if (coinWsData.change_price.toString().includes("e")) {
        const splitNum = coinWsData.change_price.toString().split("-")[1];
        return coinWsData.change_price.toFixed(+splitNum);
      } else {
        return coinWsData.change_price;
      }
    }
  };

  const coinInfoList = coinWsData
    ? [
        {
          title: "고가",
          data: isKRW
            ? coinWsData.high_price.toLocaleString()
            : coinWsData.high_price,
          id: "high_price",
        },
        {
          title: "저가",
          data: isKRW
            ? coinWsData.low_price.toLocaleString()
            : coinWsData.low_price,
          id: "low_price",
        },
        {
          title: "누적 거래량(24h)",
          data: coinWsData.acc_trade_volume_24h.toLocaleString(),
          id: "acc_trade_volume_24h",
        },
        {
          title: "누적 거래대금(24h)",
          data: isKRW
            ? Math.ceil(coinWsData.acc_trade_price_24h).toLocaleString()
            : coinWsData.acc_trade_price_24h.toLocaleString(),
          id: "acc_trade_price_24h",
        },
        {
          title: "52주 최고가",
          data: isKRW
            ? coinWsData.highest_52_week_price.toLocaleString()
            : coinWsData.highest_52_week_price,
          id: "highest_52_week_price",
        },
        {
          title: "52주 최저가",
          data: isKRW
            ? coinWsData.lowest_52_week_price.toLocaleString()
            : coinWsData.lowest_52_week_price,
          id: "lowest_52_week_price",
        },
      ]
    : [];

  // 로그인 여부
  const { data: userInfo } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
  });

  const isLoggedIn = !!userInfo;

  // 즐겨찾기
  const [isFavorited, setIsFavorited] = useState(false);

  const { data: userFavoriteCoin } = useQuery({
    queryKey: ["userFavoriteCoin"],
    queryFn: () => checkFavoriteCoin(),
  });

  useEffect(() => {
    if (userFavoriteCoin) {
      if (userFavoriteCoin.includes(coinName)) {
        setIsFavorited(true);
      } else {
        setIsFavorited(false);
      }
    }
  }, [userFavoriteCoin, coinName]);

  const handleStarClick = async () => {
    if (!isLoggedIn) {
      alert("로그인이 필요한 서비스입니다.");
      return;
    }

    if (!isFavorited) {
      try {
        await favoriteCoin(coinName, "add");
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await favoriteCoin(coinName, "delete");
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

  return (
    <div className="w-[500px] h-full px-5 border-r border-gray-300">
      {!coinWsData ? (
        <div>로딩중</div>
      ) : (
        <>
          <div>
            <div className="flex items-center gap-2">
              <Image
                src={`https://static.upbit.com/logos/${coinSymbol}.png`}
                alt={coinName + "icon"}
                width={40}
                height={40}
              />
              <div className="flex items-baseline gap-1">
                <p className="font-bold text-[22px]">{coinKrName}</p>
                <p className="text-[13px] text-gray-400">
                  {coinSymbol}/{isKRW ? "KRW" : "BTC"}
                </p>

                <Star
                  fill={isFavorited && isLoggedIn ? "#facc15" : "white"}
                  stroke={isFavorited && isLoggedIn ? "#facc15" : "black"}
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => mutate()}
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-[30px] font-extrabold">
                {isKRW
                  ? coinWsData.trade_price.toLocaleString()
                  : coinWsData.trade_price}
                <span className="text-[16px] font-medium">
                  {isKRW ? "KRW" : "BTC"}
                </span>
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <p className="text-gray-500 text-[14px]">전일 대비</p>
              <p
                className={twMerge(
                  `font-bold text-[16px] text-black ${
                    coinWsData.change === "RISE"
                      ? "text-coin-plus"
                      : "text-coin-minus"
                  }`
                )}
              >
                {coinWsData.change === "RISE" ? "+" : "-"}
                {isKRW ? coinWsData.change_price.toLocaleString() : BTCprice()}(
                {(coinWsData.change_rate * 100).toFixed(2)}
                %)
              </p>
            </div>
          </div>

          <ul className="mt-[50px] text-[14px] font-bold">
            {coinInfoList.map((coinInfo) => {
              return (
                <li
                  className="flex items-center justify-between h-[45px]  border-b border-gray-200"
                  key={coinInfo.id}
                >
                  <p className={`text-gray-500`}>{coinInfo.title}</p>
                  <p
                    className={twMerge(
                      `text-gray-500 ${
                        coinInfo.id === "high_price" && "text-coin-plus"
                      } ${coinInfo.id === "low_price" && "text-coin-minus"}`
                    )}
                  >
                    {coinInfo.data}
                  </p>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default CoinDetailInfo;
