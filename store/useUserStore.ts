import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

interface UserState {
  avatar: string | null;
  email: string | null;
  name: string | null;
  setUser: (avatar: string, email: string, name: string) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      avatar: null,
      email: null,
      name: null,
      setUser: (avatar, email, name) => set({ avatar, email, name }),
      clearUser: () => set({ avatar: null, email: null, name: null }),
    }),
    {
      name: "user", // Persist storage key
    } as PersistOptions<UserState>
  )
);
