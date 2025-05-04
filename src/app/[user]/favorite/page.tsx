"use client";

import CoinListBox from "@/components/coin/CoinListBox";
import { checkFavoriteCoin } from "@/utils/checkFavoriteCoin";
import { getDetailTicker } from "@/utils/coin/getDetailTicker";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";

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

  return (
    <div>
      <h1 className="text-[28px] font-bold my-[20px]">즐겨찾기</h1>

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
            <th className="pl-1"></th>
            <th className="text-left pl-2">코인</th>
            <th className="">현재가</th>
            <th className=" w-[100px]">전일대비</th>
            <th className="">거래량(24H)</th>
            <th className="">거래대금(24H)</th>
          </tr>
          <tr className="border-b border-[#d8d8d8]"></tr>
        </thead>
        <tbody>
          {filterdFavoriteCoinData?.map((coin) => {
            return (
              <CoinListBox
                key={coin.market}
                coinName={coin.market}
                market={coin.market}
                price={coin.trade_price}
                changeRate={coin.signed_change_rate}
                accTradeVolume24h={coin.acc_trade_volume_24h}
                accTradePrice24h={coin.acc_trade_price_24h}
                tabName={selectedTab}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserFavoritePage;
