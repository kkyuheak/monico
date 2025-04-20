"use client";

import { getDetailTicker } from "@/utils/api/getDetailTicker";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const page = () => {
  const { coinName } = useParams();
  console.log(coinName);

  const { data: coinDetailData } = useQuery({
    queryKey: ["coinDetailData", coinName],
    queryFn: () => getDetailTicker(coinName),
  });
  return <div>page</div>;
};

export default page;
