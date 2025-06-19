import MainButton from "@/components/common/buttons/MainButton";
import FeatBox from "@/components/main/FeatBox";
import { Bookmark, ChartNoAxesCombined, MessageCircleMore } from "lucide-react";

const MAIN_FEATBOX_DATA = [
  {
    Icon: ChartNoAxesCombined,
    title: "실시간 데이터",
    description: "주식, 코인에 대한 최신 데이터를 한눈에 볼 수 있습니다.",
  },
  {
    Icon: Bookmark,
    title: "맞춤형 관심 목록",
    description:
      "관심 있는 코인과 주식을 나만의 맞춤형 관심 목록에 추가하세요.",
  },
  {
    Icon: MessageCircleMore,
    title: "커뮤니티",
    description:
      "자유롭게 소통할 수 있는 공간을 제공합니다. 다양한 주제로 게시글을 작성하고 댓글로 의견을 나눌 수 있습니다",
  },
];

const MainPage = () => {
  return (
    <div className="dark:bg-[#17171c]">
      <div
        className="w-[1024px] h-[512px] p-4 mt-5 rounded-xl text-white
          bg-[url(/assets/img/mainBackground.png)] bg-center bg-cover bg-no-repeat
          relative flex flex-col justify-end"
      >
        <div className="absolute inset-0 w-full h-full rounded-xl bg-linear-to-b from-black/10 to-black/40"></div>
        <div className="z-10  pl-8 ">
          <h1 className="text-[48px] font-extrabold leading-[60px]">
            복잡한 금융 시장, 한 곳에서 쉽게 파악하세요.
          </h1>
          <p className="leading-[24px] mt-2">
            모니코는 실시간으로 변하는 시장 정보를 한눈에 볼 수 있는
            플랫폼입니다.
          </p>
          <MainButton
            link="/coin"
            css="w-[131px] h-[48px] text-[#121712] rounded-[24px] font-bold text-[16px] bg-[#4FD12B] mt-4 mb-[23px] dark:bg-[#338FF2] dark:text-white"
          >
            시작하기
          </MainButton>
        </div>
      </div>

      <section className="text-[#121712] mt-[40px] dark:text-white">
        <h2 className="text-[36px] font-extrabold mb-2">
          모니코가 제공하는 서비스
        </h2>
        <p className="max-w-[720px]">
          시장 흐름을 놓치지 않도록 설계된, 스마트한 도구들을 만나보세요.
        </p>

        <div className="flex justify-between items-center gap-4 mt-[40px]">
          {MAIN_FEATBOX_DATA.map((item) => (
            <FeatBox
              key={item.title}
              Icon={item.Icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>

      <section className="mt-[100px] text-[#121712] text-center dark:text-white">
        <h3 className="text-[36px] font-extrabold mb-1">
          시작할 준비가 되셨나요?
        </h3>
        <p className="mb-5">시장을 탐색하고 새로운 투자 기회를 발견하세요.</p>
        <MainButton
          link="/coin"
          css="w-[131px] h-[48px] text-[#121712] rounded-[24px] font-bold text-[16px] bg-[#4FD12B] mt-4 mb-[23px] dark:bg-[#338FF2] dark:text-white"
        >
          마켓 둘러보기
        </MainButton>
      </section>
    </div>
  );
};

export default MainPage;
