import Sidebar from "@/components/profile/Sidebar";

export const metadata = {
  title: "Monico - 프로필",
  description: "내 프로필을 확인할 수 있는 페이지",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-[1650px] m-auto px-3 flex mt-[53px]">
      <Sidebar />
      {children}
    </div>
  );
};

export default layout;
