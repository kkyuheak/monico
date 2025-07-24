const CoinListSkeleton = () => {
  return (
    <tr className="border-b border-[#e8e8e8] dark:border-[#373737] h-[64px] animate-pulse">
      <td className="pl-3">
        <div className="flex h-full items-center gap-3">
          <div className="w-[30px] h-[30px] rounded-full bg-gray-300 dark:bg-gray-600" />
          <div className="w-[80px] h-[20px] bg-gray-300 dark:bg-gray-600 rounded-md" />
        </div>
      </td>
      <td className="text-center">
        <div className="w-[60px] h-[20px] bg-gray-300 dark:bg-gray-600 mx-auto rounded-md" />
      </td>
      <td className="text-center">
        <div className="w-[50px] h-[20px] bg-gray-300 dark:bg-gray-600 mx-auto rounded-md" />
      </td>
      <td className="text-center">
        <div className="w-[80px] h-[20px] bg-gray-300 dark:bg-gray-600 mx-auto rounded-md" />
      </td>
      <td className="text-center">
        <div className="w-[80px] h-[20px] bg-gray-300 dark:bg-gray-600 mx-auto rounded-md" />
      </td>
    </tr>
  );
};

export default CoinListSkeleton;
