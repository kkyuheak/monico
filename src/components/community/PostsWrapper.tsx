import { useQuery } from "@tanstack/react-query";
import PostBox from "./PostBox";
import { getCoinPosts } from "@/utils/community/getCoinPosts";
import PostBoxSkeleton from "../skeleton/PostBoxSkeleton";
import { useSearchParams } from "next/navigation";

const PostsWrapper = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const { data: coinPosts } = useQuery({
    queryKey: ["community-posts", category],
    queryFn: () => getCoinPosts(category as string),
  });

  return (
    <div className="flex flex-col gap-2 mt-3">
      {coinPosts
        ? coinPosts.map((post) => (
            <PostBox key={post.id} {...post} type={category!} />
          ))
        : Array.from({ length: 10 }).map((_, index) => (
            <PostBoxSkeleton key={index} />
          ))}
    </div>
  );
};

export default PostsWrapper;
