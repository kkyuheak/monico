import CommunityMain from "@/components/community/CommunityMain";
import PostBoxSkeleton from "@/components/skeleton/PostBoxSkeleton";
import { Suspense } from "react";

const CommunityPage = () => {
  return (
    <div className="">
      <h1 className="text-[32px] font-bold mb-3">커뮤니티</h1>
      <p className="text-[14px] font-medium text-[#6e8566] dark:text-[#9CABBA]">
        커뮤니티에 참여하여 최신 시장 동향에 대한 여러분의 생각을 공유하세요.
      </p>

      <Suspense
        fallback={
          <div className="flex flex-col gap-2 mt-3">
            {Array.from({ length: 10 }).map((_, index) => (
              <PostBoxSkeleton key={index} />
            ))}
          </div>
        }
      >
        <CommunityMain />
      </Suspense>
    </div>
  );
};

export default CommunityPage;
