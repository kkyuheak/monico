import { useQuery } from "@tanstack/react-query";
import PostBox from "./PostBox";
import { getCoinPosts } from "@/utils/community/getCoinPosts";
import { useEffect } from "react";
import PostBoxSkeleton from "../skeleton/PostBoxSkeleton";

interface PostsWrapperProps {
  tab: string;
}

const PostsWrapper = ({ tab }: PostsWrapperProps) => {
  const { data: coinPosts } = useQuery({
    queryKey: ["coin-community-posts"],
    queryFn: getCoinPosts,
  });

  useEffect(() => {
    console.log(coinPosts);
  }, [coinPosts]);

  return (
    <div className="flex flex-col gap-2 mt-3">
      {coinPosts
        ? coinPosts.map((post) => (
            <PostBox key={post.id} {...post} type={tab} />
          ))
        : Array.from({ length: 10 }).map((_, index) => (
            <PostBoxSkeleton key={index} />
          ))}
    </div>
  );
};

export default PostsWrapper;
