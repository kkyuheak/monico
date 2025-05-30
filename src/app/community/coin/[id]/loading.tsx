import DetailPostSkeleton from "@/components/skeleton/DetailPostSkeleton";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const DetailCoinPostLoading = () => {
  return (
    <div>
      <Link
        href={"/community"}
        className="w-[150px] cursor-pointer flex items-center gap-1 hover:underline"
      >
        <ArrowLeft className="w-5" />
        <p className="font-semibold">목록으로 돌아가기</p>
      </Link>
      <DetailPostSkeleton />
    </div>
  );
};

export default DetailCoinPostLoading;
