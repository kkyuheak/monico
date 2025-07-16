"use client";

import { useQuery } from "@tanstack/react-query";
import PostBox from "./PostBox";
import { getCoinPosts } from "@/utils/community/getCoinPosts";
import PostBoxSkeleton from "../skeleton/PostBoxSkeleton";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import CustomPagination from "../common/CustomPagination";

const PostsWrapper = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const page = Number(searchParams.get("page")); // 현재 페이지

  const { data: coinPosts, isLoading } = useQuery({
    queryKey: ["community-posts", category, page],
    queryFn: () => getCoinPosts(category as string, page),
  });

  const totalCount = coinPosts?.count || 0;
  const totalPages = Math.ceil(totalCount / 10); // 전체 페이지

  // 사용자가 총 페이지를 초과해서 접근 할 때
  useEffect(() => {
    if (page > totalPages && !isLoading) {
      router.replace(`?category=${category}&page=1`);
    }
  }, [page, totalPages, category, router, isLoading]);

  return (
    <>
      <div className="flex flex-col gap-2 mt-3">
        {coinPosts
          ? coinPosts.data.map((post) => (
              <PostBox key={post.id} {...post} type={category!} />
            ))
          : Array.from({ length: 10 }).map((_, index) => (
              <PostBoxSkeleton key={index} />
            ))}
      </div>
      <CustomPagination totalCount={totalCount} />
    </>
  );
};

export default PostsWrapper;
