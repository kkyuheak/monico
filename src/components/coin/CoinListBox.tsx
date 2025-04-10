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
        <div className="flex h-full items-center gap-2 pl-4">
          {/* <div className="w-5 h-5 bg-blue-200 rounded-full"></div> */}
          <img
            src={`https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/${coinSymbol.toLowerCase()}.png`}
            alt={coinSymbol + "icon"}
            className="w-5 h-5 rounded-full"
          />
          <p>{coinName}</p>
        </div>
      </td>
      <td className="text-center">
        {price}
        <span className="text-[10px]">KRW</span>
      </td>
      <td className="text-center">{(changeRate * 100).toFixed(3)}</td>
      <td className="text-center">1,364,587,741</td>
      <td className="text-center">266,934,759,637</td>
    </tr>
  );
};

export default CoinListBox;
