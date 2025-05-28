import { useQuery } from "@tanstack/react-query";
import PostBox from "./PostBox";
import { getCoinPosts } from "@/utils/community/getCoinPosts";
import { useEffect } from "react";

const PostsWrapper = () => {
  const { data: coinPosts } = useQuery({
    queryKey: ["coin-community-posts"],
    queryFn: getCoinPosts,
  });

  useEffect(() => {
    console.log(coinPosts);
  }, [coinPosts]);

  return (
    <div className="flex flex-col gap-2 mt-3">
      {coinPosts?.map((post) => (
        <PostBox key={post.id} {...post} />
      ))}
    </div>
  );
};

export default PostsWrapper;
