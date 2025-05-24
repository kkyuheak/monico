import PostsWrapper from "@/components/community/PostsWrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CommunityPage = () => {
  return (
    <div className="">
      <h1 className="text-[32px] font-bold mb-3">커뮤니티</h1>
      <p className="text-[14px] font-medium text-[#6e8566]">
        커뮤니티에 참여하여 최신 시장 동향에 대한 여러분의 생각을 공유하세요.
      </p>

      {/* 주식/코인 탭 */}
      <Tabs defaultValue="coin" className="w-[400px] mt-4">
        <TabsList className="rounded-2xl">
          <TabsTrigger value="coin" className="rounded-2xl">
            코인
          </TabsTrigger>
          <TabsTrigger value="stock" className="rounded-2xl">
            주식
          </TabsTrigger>
        </TabsList>
        <TabsContent value="coin">
          <p>코인</p>
        </TabsContent>
        <TabsContent value="stock">
          <p>주식</p>
        </TabsContent>
      </Tabs>

      <PostsWrapper />
    </div>
  );
};

export default CommunityPage;
