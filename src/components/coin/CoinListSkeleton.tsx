const CoinListSkeleton = () => {
  return (
    <tr className="border-b border-[#d8d8d8] h-[68px] animate-pulse">
      <td className="pl-1 w-[20px]">
        <div className="w-[20px] h-[20px] rounded-full bg-gray-300"></div>
      </td>
      <td className="pl-3">
        <div className="flex h-full items-center gap-3">
          <div className="w-[30px] h-[30px] rounded-full bg-gray-300" />
          <div className="w-[80px] h-[20px] bg-gray-300 rounded-md" />
        </div>
      </td>
      <td className="text-center">
        <div className="w-[60px] h-[20px] bg-gray-300 mx-auto rounded-md" />
      </td>
      <td className="text-center">
        <div className="w-[50px] h-[20px] bg-gray-300 mx-auto rounded-md" />
      </td>
      <td className="text-center">
        <div className="w-[80px] h-[20px] bg-gray-300 mx-auto rounded-md" />
      </td>
      <td className="text-center">
        <div className="w-[80px] h-[20px] bg-gray-300 mx-auto rounded-md" />
      </td>
    </tr>
  );
};

export default CoinListSkeleton;
