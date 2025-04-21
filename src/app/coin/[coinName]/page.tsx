"use client";

import CoinDetailInfo from "@/components/coin/coinDetail/CoinDetailInfo";
import { getCoinCandles } from "@/utils/coin/getCoinCandles";
import { getDetailTicker } from "@/utils/coin/getDetailTicker";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const page = () => {
  const { coinName } = useParams();

  const { data: coinDetailData } = useQuery({
    queryKey: ["coinDetailData", coinName],
    queryFn: () => getDetailTicker(coinName),
  });

  const { data: coinCandlesData } = useQuery({
    queryKey: ["coinCandlesData", coinName],
    queryFn: () => getCoinCandles(coinName, "minutes"),
  });

  return (
    <div className="flex max-w-[1650px] m-auto mt-[50px]">
      <CoinDetailInfo coinName={coinName as string} />

      <div className="flex-1 h-[500px] bg-red-50"></div>
    </div>
  );
};

export default page;
