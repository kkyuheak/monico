import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { coinName: string };
}): Promise<Metadata> {
  const coinName = params.coinName;

  return {
    title: `Monico | ${coinName}`,
    description: "코인에 대한 정보를 확인할 수 있는 페이지",
  };
}

const CoinDetailPageLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default CoinDetailPageLayout;
