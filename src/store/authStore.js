import { create } from "zustand";

const useAuthStore = create((set) => ({
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),

  isLoggedIn: false,
  setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),

  isLoading: true,
  setIsLoading: (loading) => set({ isLoading: loading }),

  user: null,
  setUser: (user) => set({ user }),
}));

export default useAuthStore;
