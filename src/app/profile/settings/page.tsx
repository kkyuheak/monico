import ModeBox from "@/components/theme/ModeBox";

const ProfileSettingsPage = () => {
  return (
    <div className="flex-1 py-7 px-3">
      <h1 className="text-[24px] font-bold">설정</h1>
      <p className="text-[18px] font-medium text-gray-800 dark:text-gray-200 mt-2">
        화면 모드
      </p>

      <div className="flex gap-3 mt-2">
        <ModeBox mode="light" />
        <ModeBox mode="dark" />
        <ModeBox mode="system" />
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
