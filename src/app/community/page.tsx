import CommunityMain from "@/components/community/CommunityMain";

const CommunityPage = () => {
  return (
    <div className="">
      <h1 className="text-[32px] font-bold mb-3">커뮤니티</h1>
      <p className="text-[14px] font-medium text-[#6e8566]">
        커뮤니티에 참여하여 최신 시장 동향에 대한 여러분의 생각을 공유하세요.
      </p>

      <CommunityMain />
    </div>
  );
};

export default CommunityPage;
