import { create } from "zustand";

interface UserInfoType {
  id: string;
  created_at: string;
  email: string;
  original_name: string;
  profile_img: string;
  provider: string;
}

interface AuthStoreType {
  isLoggedIn: boolean;
  userInfo: UserInfoType | null;
  setUserInfo: (userData: UserInfoType) => void;
  clearUserInfo: () => void;
}

export const useAuthStore = create<AuthStoreType>((set) => ({
  isLoggedIn: false,
  userInfo: null,
  setUserInfo: (userData) => set({ userInfo: userData }),
  clearUserInfo: () => set({ userInfo: null }),
}));
