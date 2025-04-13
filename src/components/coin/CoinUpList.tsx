import { getUpCoinList } from "@/utils/api/getUpCoinLists";
import { useQuery } from "@tanstack/react-query";

const CoinUpList = () => {
  const { data } = useQuery({
    queryKey: ["UpCoinLists"],
    queryFn: getUpCoinList,
  });
  return <div>CoinUpList</div>;
};

export default CoinUpList;
