import DetailPostSkeleton from "@/components/skeleton/DetailPostSkeleton";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const DetailStockPostLoading = () => {
  return (
    <div className="p-1">
      <Link
        href={"/community?category=stock"}
        className="w-[150px] cursor-pointer flex items-center gap-1 hover:underline"
      >
        <ArrowLeft className="w-5" />
        <p className="font-semibold">커뮤니티</p>
      </Link>
      <DetailPostSkeleton />
    </div>
  );
};

export default DetailStockPostLoading;
