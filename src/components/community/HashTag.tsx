interface HashTagProps {
  hashTag: string;
}

const HashTag = ({ hashTag }: HashTagProps) => {
  return (
    <li className="text-[14px] text-[#6e8566] dark:text-[#9CABBA] border border-[#6e8566] dark:border-[#9CABBA] rounded-lg px-2  flex items-center">
      #{hashTag}
    </li>
  );
};

export default HashTag;
