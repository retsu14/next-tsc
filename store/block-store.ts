import { create } from "zustand";

interface BlockFormState {
  name: string;
  component: string;
  blueprint: string;
  image?: string;
  site: string;
  errors: {
    name?: string;
    component?: string;
    blueprint?: string;
    site?: string;
  };
  setName: (name: string) => void;
  setComponent: (component: string) => void;
  setBlueprint: (blueprint: string) => void;
  setImage: (image: string) => void;
  setSite: (site: string) => void;
  setErrors: (errors: {
    name?: string;
    component?: string;
    blueprint?: string;
    site?: string;
  }) => void;
  clearError: (field: string) => void;
  setField: (field: string, value: string) => void;
  resetForm: () => void;
}

export const useStore = create<BlockFormState>((set) => ({
  name: "",
  component: "",
  blueprint: "",
  image: "",
  site: "",
  errors: {},
  setName: (name) => set({ name }),
  setComponent: (component) => set({ component }),
  setBlueprint: (blueprint) => set({ blueprint }),
  setImage: (image) => set({ image }),
  setSite: (site) => set({ site }),
  setErrors: (errors) => set({ errors }),
  clearError: (field) =>
    set((state) => ({ errors: { ...state.errors, [field]: undefined } })),
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  resetForm: () =>
    set(() => ({
      name: "",
      component: "",
      blueprint: "",
      image: "",
      site: "",
      errors: {},
    })),
}));