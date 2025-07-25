export const metadata = {
  title: "Monico - 커뮤니티",
  description: "자유롭게 소통이 가능한 커뮤니티",
};

const CommunityLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="max-w-[960px] m-auto py-5 mt-[53px]">{children}</div>;
};

export default CommunityLayout;
