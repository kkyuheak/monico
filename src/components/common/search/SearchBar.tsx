import { Search } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface SearchBarProps {
  css?: string;
  placeholder?: string;
}

const SearchBar = ({ css, placeholder = "검색" }: SearchBarProps) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        className={twMerge(
          "w-[200px] h-[35px] rounded-[5px] px-2 py-1 border outline-none text-[14px] ",
          css
        )}
        id="search"
      />
      <label
        className="absolute right-2 top-1/2 -translate-y-1/2"
        htmlFor="search"
      >
        <Search stroke="gray" width={20} height={20} />
      </label>
    </div>
  );
};

export default SearchBar;
