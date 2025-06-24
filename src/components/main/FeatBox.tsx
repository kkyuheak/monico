interface FeatBoxProps {
  title: string;
  description: string;
  Icon: React.ElementType;
}

const FeatBox = ({ title, description, Icon }: FeatBoxProps) => {
  return (
    <div className="w-[300px] h-[157px] p-4 rounded-xl border border-[#dee3db] dark:border-[#3B4754] dark:bg-[#1C2126]">
      <Icon className="w-6 h-6 mb-2" />

      <p className="font-bold">{title}</p>
      <p className="text-[14px] text-[#6e8566] leading-[21px] dark:text-[#9CABBA] mt-1">
        {description}
      </p>
    </div>
  );
};

export default FeatBox;
