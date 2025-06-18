"use client";

import PostBox from "@/components/community/PostBox";
import PostBoxSkeleton from "@/components/skeleton/PostBoxSkeleton";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getMyPosts } from "@/utils/community/getMyPosts";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const ProfilePostsPage = () => {
  const [tab, setTab] = useState("coin");

  // 내 게시글 가져오기
  const { data: myPosts } = useQuery<PostData[]>({
    queryKey: ["myPosts", tab],
    queryFn: () => getMyPosts(tab),
  });

  return (
    <div className="flex-1 py-7 px-5">
      <h1 className="text-[24px] font-bold text-[#121712] mb-4">내 게시글</h1>

      <Tabs
        defaultValue="coin"
        className="rounded-2xl"
        onValueChange={(value) => setTab(value)}
      >
        <TabsList className="rounded-2xl">
          <TabsTrigger value="coin" className="rounded-2xl">
            코인
          </TabsTrigger>
          <TabsTrigger value="stock" className="rounded-2xl">
            주식
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mt-3 flex flex-col gap-2">
        {myPosts
          ? myPosts.map((post) => (
              <PostBox
                key={post.id}
                created_at={post.created_at}
                title={post.title}
                description={post.description}
                hashTags={post.hashTags}
                usersinfo={post.usersinfo}
                id={post.id}
                type={tab}
              />
            ))
          : Array.from({ length: 5 }).map((_, index) => (
              <PostBoxSkeleton key={index} />
            ))}
      </div>
    </div>
  );
};

export default ProfilePostsPage;
