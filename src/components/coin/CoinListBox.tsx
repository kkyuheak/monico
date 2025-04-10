import Image from "next/image";

interface CoinLiostBoxProps {
  coinName: string;
  market: string;
  price: number;
  changeRate: number;
  accTradeVolume24h: number;
  accTradePrice24h: number;
}

const CoinListBox = ({
  coinName,
  market,
  price,
  changeRate,
  accTradePrice24h,
  accTradeVolume24h,
}: CoinLiostBoxProps) => {
  const coinSymbol = market.split("-")[1];
  return (
    <tr className="border-b border-[#d8d8d8] h-[68px] cursor-pointer ">
      <td className="">
        <div className="flex h-full items-center gap-3 pl-4">
          {/* <div className="w-5 h-5 bg-blue-200 rounded-full"></div> */}
          <img
            src={`https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/${coinSymbol.toLowerCase()}.png`}
            alt={coinSymbol + "icon"}
            className="w-[30px] h-[30px] rounded-full"
          />
          <p className="font-semibold">{coinName}</p>
        </div>
      </td>
      <td className="text-center text-[18px] font-semibold">
        {price?.toLocaleString("ko-KR")}
        <span className="text-[10px] font-medium">KRW</span>
      </td>
      <td
        className={`text-center font-bold ${
          changeRate > 0 ? "text-[#FF3D00]" : "text-[#1E90FF]"
        }`}
      >
        {changeRate > 0 && "+"}
        {(changeRate * 100).toFixed(2)}%
      </td>
      <td className="text-center">
        {accTradeVolume24h?.toLocaleString("ko-KR")}
        {coinSymbol}
      </td>
      <td className="text-center">
        {accTradePrice24h?.toLocaleString("ko-KR").split(".")[0]}
        <span className="text-[10px]">KRW</span>
      </td>
    </tr>
  );
};

export default CoinListBox;
