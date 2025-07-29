import { Search } from "lucide-react";

interface SearchBarButtonProps {
  onClick: () => void;
}

const SearchBarButton = ({ onClick }: SearchBarButtonProps) => {
  return (
    <button
      className="w-[200px] max-md:w-full h-[35px] rounded-[10px] px-2 py-1 border outline-none text-left flex items-center gap-2 text-[12px] cursor-pointer"
      onClick={onClick}
    >
      <Search stroke="gray" width={20} height={20} />
      <span className="">검색</span>
    </button>
  );
};

export default SearchBarButton;
