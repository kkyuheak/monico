import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4 ">
      <h1 className="text-[45px] font-bold text-red-300">404 ERROR</h1>
      <p className="text-[35px] font-semibold">
        존재하지 않는 페이지에 접근하셨습니다.
      </p>
      <Link
        href="/"
        className="bg-[#5454ff] px-4 py-2 rounded-md text-white font-semibold"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
};

export default NotFoundPage;
