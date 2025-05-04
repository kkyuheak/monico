"use client";

import CoinListBox from "@/components/coin/CoinListBox";
import { checkFavoriteCoin } from "@/utils/checkFavoriteCoin";
import { getDetailTicker } from "@/utils/coin/getDetailTicker";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { getCoinName } from "@/utils/coin/getCoinName";
import CoinListSkeleton from "@/components/coin/CoinListSkeleton";

const UserFavoritePage = () => {
  const getUserFavoriteCoin = async () => {
    const favoriteCoin = await checkFavoriteCoin();

    const userFavoriteCoinNames = favoriteCoin.join(",");

    const favoriteCoinData = await getDetailTicker(userFavoriteCoinNames);

    return favoriteCoinData;
  };

  const { data: favoriteCoinData } = useQuery<CoinTickerType[]>({
    queryKey: ["userFavoriteCoinData"],
    queryFn: getUserFavoriteCoin,
  });

  // KRW, BTC 필터링 데이터
  const [filterdFavoriteCoinData, setFilterdFavoriteCoinData] = useState<
    CoinTickerType[]
  >([]);

  const [selectedTab, setSelectedTab] = useState("KRW");

  useEffect(() => {
    if (favoriteCoinData) {
      const filteredData = favoriteCoinData.filter((coin) => {
        return coin.market.startsWith(selectedTab);
      });
      setFilterdFavoriteCoinData(filteredData);
    }
  }, [favoriteCoinData, selectedTab]);

  // 코인 이름
  const { data: coinName } = useQuery<AllCoinNameType[]>({
    queryKey: ["coinName"],
    queryFn: getCoinName,
  });

  return (
    <>
      <Tabs
        defaultValue="KRW"
        className="w-[400px]"
        onValueChange={(value) => setSelectedTab(value)}
      >
        <TabsList>
          <TabsTrigger value="KRW">KRW</TabsTrigger>
          <TabsTrigger value="BTC">BTC</TabsTrigger>
        </TabsList>
      </Tabs>

      <table className="w-full m-auto border-t border-[#d8d8d8] mt-5">
        <thead className="h-[42px]">
          <tr>
            <th className="text-left pl-3">코인</th>
            <th>현재가</th>
            <th className=" w-[100px]">전일대비</th>
            <th>거래량(24H)</th>
            <th>거래대금(24H)</th>
          </tr>
          <tr className="border-b border-[#d8d8d8]"></tr>
        </thead>
        <tbody>
          {filterdFavoriteCoinData && coinName
            ? filterdFavoriteCoinData.map((coin) => {
                const kr_name = coinName?.find(
                  (nameData) => nameData.market === coin.market
                );
                return (
                  <CoinListBox
                    key={coin.market}
                    coinName={kr_name?.korean_name ?? ""}
                    market={coin.market}
                    price={coin.trade_price}
                    changeRate={coin.signed_change_rate}
                    accTradeVolume24h={coin.acc_trade_volume_24h}
                    accTradePrice24h={coin.acc_trade_price_24h}
                    tabName={selectedTab}
                    isLoggedIn={null}
                  />
                );
              })
            : Array.from({ length: 10 }).map((_, i) => (
                <CoinListSkeleton key={i} />
              ))}
        </tbody>
      </table>
    </>
  );
};

export default UserFavoritePage;
