import { getUpCoinList } from "@/utils/api/getUpCoinLists";
import { useQuery } from "@tanstack/react-query";

const CoinUpList = () => {
  const { data } = useQuery({
    queryKey: ["UpCoinLists"],
    queryFn: getUpCoinList,
  });
  return (
    <div className="w-[400px] h-[200px] rounded-lg border border-gray-200 px-5 pt-4 pb-1 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <p className="font-bold text-[18px]">🚀 상승 종목</p>
        <p className="text-[14px] text-right cursor-pointer">더보기 {">"}</p>
      </div>

      <ul className="flex flex-col gap-1">
        <li className="flex items-center justify-between h-[45px]  rounded-md">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-blue-300 rounded-full"></div>
            <p>비트코인</p>
          </div>
          <div className="flex gap-3 font-semibold">
            <p className="">
              133 <span className="text-[14px]">KRW</span>
            </p>
            <p className="text-blue-100">+13%</p>
          </div>
        </li>
        <li className="flex items-center justify-between h-[45px]  rounded-md">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-blue-300 rounded-full"></div>
            <p>비트코인</p>
          </div>
          <div className="flex gap-3 font-semibold">
            <p className="">
              133 <span className="text-[14px]">KRW</span>
            </p>
            <p className="text-blue-100">+13%</p>
          </div>
        </li>
        <li className="flex items-center justify-between h-[45px]  rounded-md">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-blue-300 rounded-full"></div>
            <p>비트코인</p>
          </div>
          <div className="flex gap-3 font-semibold">
            <p className="">
              133 <span className="text-[14px]">KRW</span>
            </p>
            <p className="text-blue-100">+13%</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default CoinUpList;
