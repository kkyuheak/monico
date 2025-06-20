const NewsPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-[960px] m-auto py-2">
      <h1 className="text-[28px] font-bold mt-4">뉴스룸</h1>
      <p className="text-[16px] font-medium text-[#6e8566] dark:text-[#9CABBA] my-2">
        최신 뉴스를 확인할 수 있습니다.
      </p>
      {children}
    </div>
  );
};

export default NewsPageLayout;
