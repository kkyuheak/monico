import { ArrowLeft, Heart, MessageCircleMore } from "lucide-react";
import Link from "next/link";

const DetailCoinPostPage = () => {
  return (
    <div className="p-1">
      <Link
        href={"/community"}
        className="w-[150px] cursor-pointer flex items-center gap-1 hover:underline"
      >
        <ArrowLeft className="w-5" />
        <p className="font-semibold">목록으로 돌아가기</p>
      </Link>

      <h1 className="text-[28px] font-bold mt-[20px]">
        Bitcoin&apos;s price surge: A deep dive into the factors driving the
        rally
      </h1>

      {/* 유저 정보 */}
      <div className="flex items-center gap-2 text-[#6E8566]">
        <div className="w-6 h-6 rounded-full bg-[#6E8566]"></div>
        <p className="text-[17px] font-medium">닉네임</p>
        <p className="text-[14px] text-[#6E8566]">2025년 5월 29일</p>
      </div>

      {/* 게시글 내용 */}
      <p className="text-[#121712] mt-2">
        Bitcoin has been on a tear lately, breaking through resistance levels
        and reaching new highs. Several factors are contributing to this rally.
        Institutional investors are increasingly allocating funds to Bitcoin,
        viewing it as a hedge against inflation and a store of value. Major
        financial institutions are also offering Bitcoin-related services,
        making it easier for both retail and institutional investors to access
        the cryptocurrency. Regulatory clarity in some jurisdictions has boosted
        investor confidence, while in others, the potential for stricter
        regulations looms, creating a mixed outlook. The upcoming halving event,
        which will reduce the reward for mining new Bitcoins, is also creating a
        sense of scarcity and anticipation among investors. Technical analysis
        indicates strong bullish momentum, with key indicators signaling further
        potential gains. However, the market remains volatile, and investors
        should be prepared for potential corrections. Overall, the current rally
        is driven by a confluence of factors, but caution and due diligence are
        always advised in the dynamic world of cryptocurrency.
      </p>

      {/* 이미지 */}
      <ul className="flex gap-2 mt-5 overflow-auto">
        {Array.from({ length: 5 }).map((_, index) => (
          <li key={index}>
            <div className="w-[240px] h-[620px] bg-[#28613b]"></div>
          </li>
        ))}
      </ul>

      {/* 해시태그 */}
      <ul className="flex gap-2 mt-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <li key={index}>
            <p className="text-[14px] text-[#6E8566] border border-[#6E8566] rounded-lg px-2  flex items-center">
              #해시태그
            </p>
          </li>
        ))}
      </ul>

      {/* 좋아요, 댓글 */}
      <div className="text-[#6E8566] font-bold text-[13px] flex items-center gap-4 mt-5">
        <div className="flex items-center gap-2">
          <Heart size={24} />
          <p>123</p>
        </div>
        <div className="flex items-center gap-2">
          <MessageCircleMore size={24} />
          <p>123</p>
        </div>
      </div>

      {/* 댓글 */}
      <div className="mt-5">
        <p className="font-bold text-[22px] text-[#121712]">댓글</p>
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-start gap-2 h-[95px] py-4">
            <div className="shrink-0 w-10 h-10 rounded-full bg-[#6E8566]"></div>

            <div className="text-[#121712]">
              <p className=" text-[14px] font-bold">닉네임</p>
              <p className="">
                Great analysis, Ethan! I&apos;ve been following Bitcoin closely
                and agree with your points. The institutional interest is
                definitely a game-changer.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailCoinPostPage;
