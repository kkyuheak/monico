"use client";

import { useEffect, useState } from "react";

const RecentView = () => {
  const [recentlyViewedCoins, setRecentlyViewedCoins] = useState<string[]>([]);

  useEffect(() => {
    const recentlyViewedCoins = JSON.parse(
      localStorage.getItem("recentlyViewedCoins") || "[]"
    );
    console.log(recentlyViewedCoins);

    if (recentlyViewedCoins) {
      setRecentlyViewedCoins(recentlyViewedCoins.slice(0, 3));
    }
  }, []);

  return (
    <div className="w-[130px] h-[320px] bg-[#fafafa] shadow fixed bottom-5 right-5 rounded-lg p-5 flex flex-col">
      <h1 className="text-[17px] text-center font-semibold">최근 본 코인</h1>
      <ul className="flex flex-col gap-4 items-center mt-4">
        <li className="flex flex-col items-center gap-2 cursor-pointer">
          <div className="w-10 h-10 bg-red-100 rounded-full"></div>
          <p className="text-[15px] font-medium">코인 이름</p>
        </li>
        <li className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 bg-red-100 rounded-full"></div>
          <p className="text-[15px] font-medium">코인 이름</p>
        </li>
        <li className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 bg-red-100 rounded-full"></div>
          <p className="text-[15px] font-medium">코인 이름</p>
        </li>
      </ul>
    </div>
  );
};

export default RecentView;
