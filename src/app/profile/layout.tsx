import Sidebar from "@/components/profile/Sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-[1650px] m-auto px-3 flex mt-[53px]">
      <Sidebar />
      {children}
    </div>
  );
};

export default layout;
