import Image from "next/image";

interface NewsBoxProps {
  title: string;
  thumbnail_url: string;
  content_url: string;
  summary: string;
}

const NewsBox = ({
  title,
  thumbnail_url,
  content_url,
  summary,
}: NewsBoxProps) => {
  return (
    <div className="w-[960px] h-[203px] px-1 py-4 flex gap-2 border cursor-pointer">
      <div className="w-[608px]">
        {/* 뉴스 제목 */}
        <p className="font-bold">{title}</p>
        {/* 뉴스 내용 */}
        <p className="text-[14px] text-[#61758A] leading-[21px]">{summary}</p>
      </div>
      {/* <div className="bg-green-500 h-full flex-1 rounded-lg"></div> */}
      <Image
        src={thumbnail_url}
        alt="thumbnail"
        width={240}
        height={620}
        className="flex-1 h-full rounded-lg object-cover"
      />
    </div>
  );
};

export default NewsBox;
