import { useDisableScroll } from "@/hooks/useDisableScroll";
import SearchBar from "../common/search/SearchBar";
import { useState } from "react";
import SearchResultCoin from "../common/search/SearchResultCoin";

const SearchModal = () => {
  // 모달이 열리면 스크롤 금지
  useDisableScroll(true);

  // const [searchResult, setSearchResult] = useState<string[]>([]);
  const [isTrue, setIsTrue] = useState(false);

  return (
    <div
      className="w-[600px] h-[500px] bg-white rounded-[10px] px-5 py-5 flex flex-col"
      onClick={(e) => e.stopPropagation()}
    >
      <SearchBar />

      <p className="text-[12px] font-semibold my-[10px]">검색 결과</p>

      {isTrue ? (
        <div className="flex items-center justify-center">
          <p className="text-[15px] text-gray-500">검색 결과가 없습니다.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2 overflow-y-scroll flex-1 scrollbar-track-white/100 scrollbar-thumb-gray-300 scrollbar-thin">
          <SearchResultCoin />
          <SearchResultCoin />
          <SearchResultCoin />
          <SearchResultCoin />
          <SearchResultCoin />
          <SearchResultCoin />
          <SearchResultCoin />
          <SearchResultCoin />
          <SearchResultCoin />
          <SearchResultCoin />
          <SearchResultCoin />
        </div>
      )}
    </div>
  );
};

export default SearchModal;
