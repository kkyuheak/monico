import { Search } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface SearchBarProps {
  css?: string;
  placeholder?: string;
}

const SearchBar = ({
  css,
  placeholder = "코인을 검색해보세요",
}: SearchBarProps) => {
  return (
    <div className="flex items-center gap-1 border rounded-[10px] px-2 py-1">
      <span>
        <Search stroke="gray" width={20} height={20} />
      </span>
      <input
        type="text"
        placeholder={placeholder}
        className={twMerge(
          "w-full h-[35px] px-2 py-1 outline-none text-[14px]",
          css
        )}
        id="search"
      />
    </div>
  );
};

export default SearchBar;
