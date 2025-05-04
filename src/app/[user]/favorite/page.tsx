"use client";

import CoinListBox from "@/components/coin/CoinListBox";
import { checkFavoriteCoin } from "@/utils/checkFavoriteCoin";
import { getDetailTicker } from "@/utils/coin/getDetailTicker";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { getCoinName } from "@/utils/coin/getCoinName";
import CoinListSkeleton from "@/components/coin/CoinListSkeleton";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SimpleButton from "@/components/common/buttons/SimpleButton";
import { favoriteCoin } from "@/utils/favoriteCoin";
import { queryClient } from "@/components/provider/QueryProvider";

const UserFavoritePage = () => {
  const getUserFavoriteCoin = async () => {
    const favoriteCoin = await checkFavoriteCoin();
    if (favoriteCoin.length === 0) return [];

    // console.log("first");
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

  // 전체삭제 모달
  const [open, setOpen] = useState(false);

  // 전체삭제 함수
  const { mutate: allDeleteFn } = useMutation({
    mutationFn: () => favoriteCoin("", "allDelete"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userFavoriteCoinData"] });
    },
  });

  return (
    <>
      <div className="flex items-center justify-between">
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

        <button
          className="w-[90px] h-[35px] cursor-pointer rounded-lg text-white text-[15px] font-semibold bg-[#FF3D00] hover:bg-[#FF3D00]/80"
          onClick={() => setOpen(true)}
        >
          전체 삭제
        </button>
      </div>

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
      {filterdFavoriteCoinData?.length === 0 && (
        <p className="text-center mt-5">즐겨찾기한 코인이 없습니다.</p>
      )}

      {open && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]"
          onClick={() => setOpen(false)}
        >
          <Card className="w-[350px]" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <CardTitle>
                즐겨찾기 코인 <span className="text-[#FF3D00]">전체삭제</span>
              </CardTitle>
              <CardDescription className="text-[15px]">
                즐겨찾기한 코인을 모두{" "}
                <span className="text-[#FF3D00]">삭제</span>하시겠습니까?
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <SimpleButton css="bg-gray-200" onClick={() => setOpen(false)}>
                취소
              </SimpleButton>

              <SimpleButton
                css="bg-[#FF3D00] text-white"
                onClick={() => allDeleteFn()}
              >
                삭제
              </SimpleButton>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};

export default UserFavoritePage;
