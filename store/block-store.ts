import { create } from "zustand";

interface BlockFormState {
  name: string;
  component: string;
  blueprint: string;
  image?: string;
  site: string;
  errors: {
    name: string;
    component: string;
    blueprint: string;
    site: string;
  };
}

export const useStore = create<BlockFormState>((set) => ({
  name: "",
  component: "",
  blueprint: "",
  image: "",
  site: "",
  errors: {},
}));
