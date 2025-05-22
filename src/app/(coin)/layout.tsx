import RecentView from "@/components/recentView/RecentView";

const CoinLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-[1650px] m-auto px-5 relative">
      {children}
      <RecentView />
    </div>
  );
};

export default CoinLayout;
