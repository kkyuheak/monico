"use client";

import CustomPagination from "@/components/common/CustomPagination";
import PostBox from "@/components/community/PostBox";
import PostBoxSkeleton from "@/components/skeleton/PostBoxSkeleton";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getMyPosts } from "@/utils/community/getMyPosts";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface MyPosts {
  data: PostData[];
  count: number;
}

const ProfilePosts = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const page = Number(searchParams.get("page"));

  // 내 게시글 가져오기
  const { data: myPosts, isLoading } = useQuery<MyPosts>({
    queryKey: ["myPosts", category, page],
    queryFn: () => getMyPosts(category as string, page),
  });

  const totalCount = myPosts?.count || 0;
  const totalPages = Math.ceil(totalCount / 5); // 전체 페이지

  // 사용자가 총 페이지를 초과해서 접근 할 때
  useEffect(() => {
    if (page > totalPages && !isLoading) {
      router.replace(`?category=${category}&page=1`);
    }
  }, [page, totalPages, category, router, isLoading]);

  useEffect(() => {
    if (
      !category ||
      (category !== "coin" && category !== "stock") ||
      page < 1
    ) {
      router.replace("/profile/posts?category=coin&page=1");
    }
  }, [category, page, router]);

  return (
    <div className="flex-1 py-7 px-5">
      <h1 className="text-[24px] font-bold text-[#121712] dark:text-white mb-4">
        내 게시글
      </h1>

      <Tabs
        defaultValue="coin"
        className="rounded-2xl"
        onValueChange={(value) => {
          router.push(`/profile/posts?category=${value}&page=1`);
        }}
        value={category!}
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
          myPosts.data.length > 0 ? (
            myPosts.data.map((post) => (
              <PostBox
                key={post.id}
                created_at={post.created_at}
                title={post.title}
                description={post.description}
                hashTags={post.hashTags}
                usersinfo={post.usersinfo}
                id={post.id}
                type={category as string}
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
      <CustomPagination totalCount={totalCount} pageSize={5} />
    </div>
  );
};

export default ProfilePosts;
