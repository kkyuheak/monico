import BackButton from "@/components/common/buttons/BackButton";
import DetailPostSkeleton from "@/components/skeleton/DetailPostSkeleton";

const DetailCoinPostLoading = () => {
  return (
    <div className="p-1">
      <BackButton name="목록으로 돌아가기" />
      <DetailPostSkeleton />
    </div>
  );
};

export default DetailCoinPostLoading;
