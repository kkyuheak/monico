"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deletePost } from "@/utils/community/deletePost";
import { getUserInfo } from "@/utils/getUserInfo";
import { showToast } from "@/utils/showToast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Ellipsis } from "lucide-react";
import { useRouter } from "next/navigation";

interface PostMoreBtnProps {
  postData: PostData;
  type: "coin" | "stock";
}

const PostMoreBtn = ({ postData, type }: PostMoreBtnProps) => {
  const router = useRouter();

  const { data: userInfo, isLoading: userInfoLoading } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
  });

  const isMyPost = userInfo?.id === postData.usersinfo.id;

  const { mutate: deletePostMutate } = useMutation({
    mutationFn: () => deletePost(postData.id, type),
    onSuccess: () => {
      showToast("success", "게시글이 삭제되었습니다.");
      router.replace(`/community`);
    },
  });

  if (userInfoLoading || !isMyPost) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Ellipsis className="stroke-[#6E8566]" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="text-red-500 focus:text-red-500 cursor-pointer"
          onClick={() => deletePostMutate()}
        >
          삭제하기
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostMoreBtn;
