import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

interface SearchBarProps {
  css?: string;
  placeholder?: string;
  setUserSearchValue: (value: string) => void;
}

const SearchBar = ({
  css,
  placeholder = "코인명을 검색해보세요",
  setUserSearchValue,
}: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setUserSearchValue(searchValue);
    }, 700);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue, setUserSearchValue]);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleAllClear = () => {
    setSearchValue("");
    setUserSearchValue("");
    inputRef.current?.focus();
  };

  return (
    <div className="flex items-center gap-1 border rounded-[10px] px-2 py-1 max-md:mt-7">
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
        value={searchValue}
        onChange={handleSearchValue}
        autoFocus
        ref={inputRef}
      />
      <span
        className="rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-black/50 max-md:hidden"
        onClick={handleAllClear}
      >
        <X width={20} height={20} stroke="gray" />
      </span>
    </div>
  );
};

export default SearchBar;
