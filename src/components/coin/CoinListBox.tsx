import { useRouter } from "next/navigation";

interface CoinLiostBoxProps {
  coinName: string;
  market: string;
  price: number;
  changeRate: number;
  accTradeVolume24h: number;
  accTradePrice24h: number;
  tabName: string;
}

const CoinListBox = ({
  coinName,
  market,
  price,
  changeRate,
  accTradePrice24h,
  accTradeVolume24h,
  tabName,
}: CoinLiostBoxProps) => {
  const router = useRouter();

  const coinSymbol = market.split("-")[1];

  const BTCprice = () => {
    if (price.toString().includes("e")) {
      const splitNum = price.toString().split("-")[1];
      return price.toFixed(+splitNum);
    } else {
      return price;
    }
  };
  return (
    <tr
      className="border-b border-[#d8d8d8] h-[68px] cursor-pointer "
      onClick={() => router.push(`/coin/${market}`)}
    >
      <td className="">
        <div className="flex h-full items-center gap-3 pl-4">
          <img
            src={`https://static.upbit.com/logos/${coinSymbol}.png`}
            alt={coinSymbol + "icon"}
            className="w-[30px] h-[30px] rounded-full"
          />
          <p className="font-semibold">{coinName}</p>
        </div>
      </td>
      <td className="text-center text-[18px] font-semibold">
        {tabName === "KRW" ? price?.toLocaleString("ko-KR") : BTCprice()}
        <span className="text-[10px] font-medium">
          {" "}
          {tabName === "KRW" ? "KRW" : "BTC"}
        </span>
      </td>
      <td
        className={`text-center font-bold ${
          changeRate > 0 ? "text-[#FF3D00]" : "text-[#1E90FF]"
        }`}
      >
        {changeRate > 0 && "+"}
        {(changeRate * 100).toFixed(2)}%
      </td>
      <td className="text-center font-semibold">
        {accTradeVolume24h?.toLocaleString("ko-KR")}
        <span className="text-[10px] font-medium"> {coinSymbol}</span>
      </td>
      <td className="text-center font-semibold">
        {tabName === "KRW"
          ? Math.ceil(accTradePrice24h).toLocaleString("ko-KR")
          : accTradePrice24h.toLocaleString()}
        <span className="text-[10px] font-medium">
          {" "}
          {tabName === "KRW" ? "KRW" : "BTC"}
        </span>
      </td>
    </tr>
  );
};

export default CoinListBox;
