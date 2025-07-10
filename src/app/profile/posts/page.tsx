"use client";

import PostBox from "@/components/community/PostBox";
import PostBoxSkeleton from "@/components/skeleton/PostBoxSkeleton";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getMyPosts } from "@/utils/community/getMyPosts";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
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
      <h1 className="text-[24px] font-bold text-[#121712] dark:text-white mb-4">
        내 게시글
      </h1>

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
        {myPosts ? (
          myPosts.length > 0 ? (
            myPosts.map((post) => (
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
          ) : (
            <div className="flex flex-col items-center gap-5">
              <p className=" text-[#6e8566] text-[20px] font-semibold dark:text-[#9CABBA] mt-[10px]">
                게시글이 없습니다.
              </p>
              <Link
                href={"/community/write"}
                className="px-4 py-2 rounded-md text-[#fff] bg-[#6e8566] text-[20px] font-semibold dark:text-[#338FF2]"
              >
                게시글을 등록해보세요!
              </Link>
            </div>
          )
        ) : (
          Array.from({ length: 5 }).map((_, index) => (
            <PostBoxSkeleton key={index} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProfilePostsPage;
