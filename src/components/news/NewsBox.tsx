"use client";

import Image from "next/image";
import Link from "next/link";

interface NewsBoxProps {
  title: string;
  thumbnail_url: string | null;
  content_url: string;
  summary: string;
}

const NewsBox = ({
  title,
  thumbnail_url,
  summary,
  content_url,
}: NewsBoxProps) => {
  return (
    <Link href={content_url} target="_blank">
      <div className="w-[960px] h-[203px] px-3 py-4 flex gap-4 cursor-pointer hover:bg-[#F3F3F3] transition-colors rounded-lg">
        <div className="w-[608px]">
          {/* 뉴스 제목 */}
          <p className="font-bold text-[18px]">{title}</p>
          {/* 뉴스 내용 */}
          <p className="text-[14px] text-[#61758A] mt-1">{summary}</p>
        </div>
        <Image
          src={thumbnail_url ?? "/assets/img/newsBackground.png"}
          alt="thumbnail"
          width={240}
          height={620}
          className="flex-1 h-full rounded-lg object-cover"
        />
      </div>
    </Link>
  );
};

export default NewsBox;
