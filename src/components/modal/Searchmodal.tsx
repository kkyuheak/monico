import { useDisableScroll } from "@/hooks/useDisableScroll";
import SearchBar from "../common/search/SearchBar";
import { useEffect, useState } from "react";
import SearchResultCoin from "../common/search/SearchResultCoin";
import { useQuery } from "@tanstack/react-query";
import { getCoinName } from "@/utils/coin/getCoinName";
import { getDetailTicker } from "@/utils/coin/getDetailTicker";

const SearchModal = () => {
  // 모달이 열리면 스크롤 금지
  useDisableScroll(true);

  // const [isTrue, setIsTrue] = useState(false);

  const [userSearchValue, setUserSearchValue] = useState("");

  const [searchResult, setSearchResult] = useState<string>("");

  // 코인명 가져오기
  const { data: coinName, isLoading: coinNameLoading } = useQuery<
    AllCoinNameType[]
  >({
    queryKey: ["coinName"],
    queryFn: getCoinName,
  });

  // 코인데이터 가져오기
  const getCoinData = async () => {
    if (searchResult !== "") {
      return await getDetailTicker(searchResult);
    } else {
      return [];
    }
  };

  const { data: coinData, isLoading: coinDataLoading } = useQuery<
    CoinTickerType[]
  >({
    queryKey: ["searchCoinData", searchResult],
    queryFn: getCoinData,
  });

  useEffect(() => {
    console.log(coinData, "coinData");
  }, [coinData]);

  useEffect(() => {
    console.log(coinDataLoading, "coinDataLoading");
  }, [coinDataLoading]);

  useEffect(() => {
    console.log(userSearchValue);

    if (userSearchValue.trim() === "") {
      setSearchResult("");
    }

    if (coinName && userSearchValue.trim() !== "") {
      const filterData = coinName
        .filter((item) => {
          return (
            item.korean_name.includes(userSearchValue) &&
            (item.market.startsWith("KRW") || item.market.startsWith("BTC"))
          );
        })
        .map((item) => item.market);

      console.log(filterData.join(","));

      if (filterData.length === 0) {
        setSearchResult("");
      } else {
        const filterDataNames = filterData.join(",");
        setSearchResult(filterDataNames);
      }
    }
  }, [userSearchValue, coinName]);

  return (
    <div
      className="w-[600px] h-[500px] bg-white rounded-[15px] px-5 py-5 flex flex-col"
      onClick={(e) => e.stopPropagation()}
    >
      <SearchBar setUserSearchValue={setUserSearchValue} />

      <p className="text-[12px] font-semibold my-[10px]">검색 결과</p>

      {coinNameLoading || coinDataLoading || !coinData ? (
        <div className="flex items-center justify-center">
          <p className="text-[15px] text-gray-500">로딩중입니다.</p>
        </div>
      ) : coinData.length === 0 ? (
        <div className="flex items-center justify-center">
          <p className="text-[15px] text-gray-500">검색 결과가 없습니다.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2 overflow-y-scroll flex-1 scrollbar-track-white/100 scrollbar-thumb-gray-300 scrollbar-thin">
          {coinName &&
            coinData &&
            coinData.map((coin) => {
              const coinType = coin.market.startsWith("KRW") ? "KRW" : "BTC";
              const coinKrName = coinName.find(
                (item) => item.market === coin.market
              )?.korean_name;
              return (
                <SearchResultCoin
                  key={coin.market}
                  coinName={coin.market}
                  coinKrName={coinKrName}
                  coinPrice={coin.trade_price}
                  coinChangeRate={coin.change_rate}
                  coinChange={coin.change}
                  type={coinType}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default SearchModal;
