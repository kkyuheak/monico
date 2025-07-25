import DetailPost from "@/components/community/DetailPost";
interface DetailCoinPostPageProps {
  params: Promise<{ id: string }>;
}

const DetailCoinPostPage = async ({ params }: DetailCoinPostPageProps) => {
  const { id } = await params;

  return <DetailPost id={id} type="coin" />;
};

export default DetailCoinPostPage;
