import { create } from "zustand";

interface SitesFormState {
  name: string;
  domain: string;
  hook: string;
  errors: {
    name?: string;
    domain?: string;
    hook?: string;
  };
  setName: (name: string) => void;
  setDomain: (domain: string) => void;
  setHook: (hook: string) => void;
  setErrors: (errors: {
    name?: string;
    domain?: string;
    hook?: string;
  }) => void;
  clearError: (field: string) => void;
  setField: (field: string, value: string) => void;
  resetForm: () => void;
}

export const useStore = create<SitesFormState>((set) => ({
  name: "",
  domain: "",
  hook: "",
  errors: {},
  setName: (name) => set({ name }),
  setDomain: (domain) => set({ domain }),
  setHook: (hook) => set({ hook }),
  setErrors: (errors) => set({ errors }),
  clearError: (field) =>
    set((state) => ({ errors: { ...state.errors, [field]: undefined } })),
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  resetForm: () =>
    set(() => ({
      name: "",
      domain: "",
      hook: "",
    })),
}));
