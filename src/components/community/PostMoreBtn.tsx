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
import { useState } from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import SimpleButton from "../common/buttons/SimpleButton";
import { useDisableScroll } from "@/hooks/useDisableScroll";

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

  // 삭제 확인 모달
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const deleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  useDisableScroll(isDeleteModalOpen);

  if (userInfoLoading || !isMyPost) {
    return null;
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <Ellipsis className="stroke-[#6E8566] dark:stroke-[#ffffff]" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="text-red-500 focus:text-red-500 cursor-pointer"
            onClick={deleteClick}
          >
            삭제하기
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isDeleteModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setIsDeleteModalOpen(false)}
        >
          <Card className="w-[350px]" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <CardTitle className="text-[15px]">
                게시글을 삭제하시겠습니까?
              </CardTitle>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <SimpleButton
                css="bg-gray-200 dark:bg-gray-600 hover:bg-gray-200/80 dark:hover:bg-gray-600/80"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                취소
              </SimpleButton>

              <SimpleButton
                css="bg-[#FF3D00] text-white hover:bg-[#FF3D00]/80"
                onClick={() => deletePostMutate()}
              >
                삭제하기
              </SimpleButton>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};

export default PostMoreBtn;
