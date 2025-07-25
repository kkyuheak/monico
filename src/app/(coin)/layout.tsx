export const metadata = {
  title: "Monico - 코인",
  description: "코인에 대한 정보를 확인할 수 있는 페이지",
};

const CoinLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-[1650px] m-auto px-5 relative mt-[73px]">
      {children}
    </div>
  );
};

export default CoinLayout;
