import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

interface UserState {
  email: string | null;
  name: string | null;
  setUser: (email: string, name: string) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      email: null,
      name: null,
      setUser: (email, name) => set({ email, name }),
      clearUser: () => set({ email: null, name: null }),
    }),
    {
      name: "user",
    } as PersistOptions<UserState>
  )
);
