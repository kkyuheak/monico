import { useDisableScroll } from "@/hooks/useDisableScroll";
import SearchBar from "../common/search/SearchBar";
import { useEffect, useState } from "react";
import SearchResultCoin from "../common/search/SearchResultCoin";
import { useQuery } from "@tanstack/react-query";
import { getCoinName } from "@/utils/coin/getCoinName";
import { getDetailTicker } from "@/utils/coin/getDetailTicker";
import SearchResultCoinSkeleton from "../skeleton/SearchResuiltCoinSkeleton";
import { X } from "lucide-react";

interface SearchModalProps {
  setIsSearchModalOpen: (value: boolean) => void;
}

const SearchModal = ({ setIsSearchModalOpen }: SearchModalProps) => {
  // 모달이 열리면 스크롤 금지
  useDisableScroll(true);

  // 유저가 검색한 값
  const [userSearchValue, setUserSearchValue] = useState("");

  // 검색 결과 배열 join값
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
      className="w-[600px] h-[500px] bg-white dark:bg-[#2c2c35] rounded-[15px] px-5 py-5 flex flex-col
      transform-gpu max-md:w-full max-md:h-dvh max-md:rounded-none"
      onClick={(e) => e.stopPropagation()}
    >
      <X
        className="hidden max-md:block absolute right-5"
        size={19}
        onClick={() => setIsSearchModalOpen(false)}
      />

      <SearchBar setUserSearchValue={setUserSearchValue} />

      <p className="text-[12px] font-semibold my-[10px]">검색 결과</p>

      {coinNameLoading || coinDataLoading || !coinData ? (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <SearchResultCoinSkeleton key={index} />
          ))}
        </div>
      ) : coinData.length === 0 ? (
        <div className="flex items-center justify-center">
          <p className="text-[15px] text-gray-500">검색 결과가 없습니다.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2 overflow-y-scroll flex-1 scrollbar-track-white/100 scrollbar-thumb-gray-300 dark:scrollbar-track-black/0 dark:scrollbar-thumb-gray-600 scrollbar-thin">
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
