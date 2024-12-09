import { create } from "zustand";

const useAuthContext = create((set) => ({
  authUser: null,
  setAuthUser: (user) => set({ authUser: user }),
}));
export default useAuthContext;
