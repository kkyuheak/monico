import SimpleButton from "@/components/common/buttons/SimpleButton";

const ProfilePage = () => {
  return (
    <div className="flex-1 py-6 px-10 flex flex-col gap-5">
      <h1 className="text-[24px] font-bold">프로필</h1>

      <div>
        <p className="font-semibold text-[20px] text-gray-800 mt-2">
          프로필 이미지
        </p>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-20 h-20 rounded-full bg-gray-200"></div>
          <label
            htmlFor="profileImage"
            className="cursor-pointer text-[15px] font-semibold text-gray-700 bg-gray-200 px-2 py-1 rounded-md"
          >
            이미지 변경
          </label>
          <input type="file" id="profileImage" className="hidden" />
        </div>
      </div>

      <div>
        <p className="font-semibold text-[20px] text-gray-800 mt-2">닉네임</p>
        <div className="flex items-center gap-2 mt-2">
          <input
            type="text"
            placeholder="닉네임"
            className="w-[200px] h-[40px] border border-gray-300 rounded-md px-3 text-[15px]
            disabled:bg-gray-200"
          />
          <SimpleButton css="bg-gray-500 text-white w-[50px] h-[40px]">
            수정
          </SimpleButton>
          <SimpleButton css="bg-green-900 text-white w-[70px] h-[40px]">
            중복 검사
          </SimpleButton>
        </div>
      </div>

      <SimpleButton css="bg-gray-900 text-white w-[80px]">
        저장하기
      </SimpleButton>
    </div>
  );
};

export default ProfilePage;
