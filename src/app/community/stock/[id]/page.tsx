import DetailPost from "@/components/community/DetailPost";

interface DetailStockPostPageProps {
  params: Promise<{ id: string }>;
}

const DetailStockPostPage = async ({ params }: DetailStockPostPageProps) => {
  const { id } = await params;

  return <DetailPost id={id} type="stock" />;
};

export default DetailStockPostPage;
