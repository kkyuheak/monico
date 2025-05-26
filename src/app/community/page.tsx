"use client";

import SimpleButton from "@/components/common/buttons/SimpleButton";
import PostsWrapper from "@/components/community/PostsWrapper";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

const CommunityPage = () => {
  const router = useRouter();

  return (
    <div className="">
      <h1 className="text-[32px] font-bold mb-3">커뮤니티</h1>
      <p className="text-[14px] font-medium text-[#6e8566]">
        커뮤니티에 참여하여 최신 시장 동향에 대한 여러분의 생각을 공유하세요.
      </p>

      {/* 주식/코인 탭, 글쓰기 버튼 */}
      <div className="flex items-center justify-between mt-4">
        <Tabs defaultValue="coin" className="shadow rounded-2xl">
          <TabsList className="rounded-2xl">
            <TabsTrigger value="coin" className="rounded-2xl">
              코인
            </TabsTrigger>
            <TabsTrigger value="stock" className="rounded-2xl">
              주식
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <SimpleButton
          css="bg-white border border-[#6E8566] text-[#6E8566] hover:bg-[#6E8566] hover:text-white transition-colors rounded-md"
          onClick={() => router.push("/community/write")}
        >
          글쓰기
        </SimpleButton>
      </div>

      <PostsWrapper />
    </div>
  );
};

export default CommunityPage;
