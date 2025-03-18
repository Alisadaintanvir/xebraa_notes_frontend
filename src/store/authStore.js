import { create } from "zustand";

const useAuthStore = create((set) => ({
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),

  isLoggedIn: false,
  setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),

  user: null,
  setUser: (user) => set({ user }),
}));

export default useAuthStore;
