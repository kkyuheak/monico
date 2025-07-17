"use client";

import { usePathname, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  totalCount: number;
  pageSize?: number;
}

const CustomPagination = ({ totalCount, pageSize = 10 }: PaginationProps) => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const page = Number(searchParams.get("page"));
  const pathName = usePathname();

  const totalPages = Math.ceil(totalCount / pageSize);

  // 페이지 번호 계산
  const currentBlockStart = Math.floor((page - 1) / pageSize) * pageSize + 1;
  const currentBlockEnd = Math.min(
    currentBlockStart + pageSize - 1,
    totalPages
  );

  const pageNumbers = Array.from(
    { length: currentBlockEnd - currentBlockStart + 1 },
    (_, i) => currentBlockStart + i
  );

  const makeLink = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `${pathName}?category=${category}&page=${page}`;
  };

  if (totalPages <= 1) return null;

  return (
    <Pagination className="mt-6">
      <PaginationContent>
        {/* 이전 버튼 */}
        {page > 1 ? (
          <PaginationItem>
            <PaginationPrevious href={makeLink(page - 1)} />
          </PaginationItem>
        ) : (
          <PaginationItem>
            <PaginationPrevious
              href={"#"}
              className="pointer-events-none opacity-50 cursor-default"
            />
          </PaginationItem>
        )}

        {/* 동적 페이지 버튼 */}
        {pageNumbers.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink href={makeLink(p)} isActive={p === page}>
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* 다음 버튼 */}
        {page === totalPages ? (
          <PaginationItem>
            <PaginationNext
              href={"#"}
              className="pointer-events-none opacity-50 cursor-default"
            />
          </PaginationItem>
        ) : (
          <PaginationItem>
            <PaginationNext href={makeLink(Math.min(totalPages, page + 1))} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
