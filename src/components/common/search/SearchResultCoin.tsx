const SearchResultCoin = () => {
  return (
    <div className="flex items-center gap-2 justify-between px-2 py-2 rounded-md cursor-pointer bg-[#fafafa] hover:bg-[#ededed]">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-[#09090b]"></div>
        <div className="flex flex-col gap-0">
          <p className="font-semibold text-[14px]">비트코인</p>
          <span className="text-[10px] font-medium">BTC/KRW</span>
        </div>
      </div>
      <div className="flex flex-col gap-0">
        <p>
          144,341,000 <span className="text-[12px]">KRW</span>
        </p>
        <p className="text-[12px] font-medium text-coin-minus text-right">
          -0.90%
        </p>
      </div>
    </div>
  );
};

export default SearchResultCoin;
