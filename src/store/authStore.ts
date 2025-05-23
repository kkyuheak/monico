import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStoreType {
  isLoggedIn: boolean;
  userInfo: UserInfoType | null;
  setUserInfo: (userData: UserInfoType | null) => void;
  clearUserInfo: () => void;
}

export const useAuthStore = create<AuthStoreType>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      userInfo: null,
      setUserInfo: (userData) => set({ userInfo: userData }),
      clearUserInfo: () => set({ userInfo: null }),
    }),
    {
      name: "auth",
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        userInfo: state.userInfo,
      }),
    }
  )
);
