const UserFavoritePageLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="max-w-[1650px] m-auto px-5">
      <h1 className="text-[28px] font-bold mt-[20px]">즐겨찾기</h1>
      <p className="text-[16px] text-gray-500 mt-[5px] mb-[20px]">
        내가 즐겨찾는 코인들을 확인할 수 있습니다.
      </p>
      {children}
    </div>
  );
};

export default UserFavoritePageLayout;
