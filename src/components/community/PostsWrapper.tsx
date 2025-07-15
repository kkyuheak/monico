import { useQuery } from "@tanstack/react-query";
import PostBox from "./PostBox";
import { getCoinPosts } from "@/utils/community/getCoinPosts";
import PostBoxSkeleton from "../skeleton/PostBoxSkeleton";
import { useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const MAX_PAGE_BUTTONS = 10;

const PostsWrapper = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const page = Number(searchParams.get("page")); // 현재 페이지

  const { data: coinPosts } = useQuery({
    queryKey: ["community-posts", category, page],
    queryFn: () => getCoinPosts(category as string, page),
  });

  const totalCount = coinPosts?.count || 0;
  const totalPages = Math.ceil(totalCount / 10); // 전체 페이지

  // 페이지 번호 계산
  const currentBlockStart =
    Math.floor((page - 1) / MAX_PAGE_BUTTONS) * MAX_PAGE_BUTTONS + 1;
  const currentBlockEnd = Math.min(
    currentBlockStart + MAX_PAGE_BUTTONS - 1,
    totalPages
  );

  const pageNumbers = Array.from(
    { length: currentBlockEnd - currentBlockStart + 1 },
    (_, i) => currentBlockStart + i
  );

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
      {totalPages > 1 && (
        <Pagination className="mt-6">
          <PaginationContent>
            {/* 이전 버튼 */}
            <PaginationItem>
              <PaginationPrevious
                href={`?category=${category}&page=${Math.max(1, page - 1)}`}
              />
            </PaginationItem>

            {/* 동적 페이지 버튼 */}
            {pageNumbers.map((p) => (
              <PaginationItem key={p}>
                <PaginationLink
                  href={`?category=${category}&page=${p}`}
                  isActive={p === page}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}

            {/* 다음 버튼 */}
            <PaginationItem>
              <PaginationNext
                href={`?category=${category}&page=${Math.min(
                  totalPages,
                  page + 1
                )}`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

export default PostsWrapper;
