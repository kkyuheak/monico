const CoinCandleSkeleton = () => {
  return (
    <tr className="h-[55px] text-center border-b animate-pulse">
      {Array.from({ length: 6 }).map((_, idx) => (
        <td key={idx}>
          <div className="mx-auto h-4 w-20 rounded bg-gray-300" />
        </td>
      ))}
    </tr>
  );
};

export default CoinCandleSkeleton;
