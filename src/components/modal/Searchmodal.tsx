import { useDisableScroll } from "@/hooks/useDisableScroll";
import SearchBar from "../common/search/SearchBar";

const SearchModal = () => {
  // 모달이 열리면 스크롤 금지
  useDisableScroll(true);

  return (
    <div
      className="w-[600px] h-[400px] bg-white rounded-[10px] px-5 py-5"
      onClick={(e) => e.stopPropagation()}
    >
      <SearchBar />

      <p className="text-[12px] font-semibold my-[10px]">검색 결과</p>

      <div className="flex items-center justify-center">
        <p className="text-[15px] text-gray-500">검색 결과가 없습니다.</p>
      </div>
    </div>
  );
};

export default SearchModal;
