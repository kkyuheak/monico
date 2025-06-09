interface FeatBoxProps {
  title: string;
  description: string;
  Icon: React.ElementType;
}

const FeatBox = ({ title, description, Icon }: FeatBoxProps) => {
  return (
    <div className="w-[300px] h-[157px] p-4 rounded-xl border border-[#dee3db]">
      <Icon className="w-6 h-6 mb-2" />

      <p className="font-bold">{title}</p>
      <p className="text-[14px] text-[#6e8566] leading-[21px]">{description}</p>
    </div>
  );
};

export default FeatBox;
