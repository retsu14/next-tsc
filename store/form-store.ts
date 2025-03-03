import { create } from "zustand";

interface Field {
  id: number;
  title: string;
  stateName: string;
  rules: string;
  helperText: string;
  type: string;
}

interface Section {
  id: number;
  title: string;
  stateName: string;
  fields: Field[];
}

interface FormStore {
  title: string;
  sections: Section[];
  setTitle: (title: string) => void;
  setSections: (sections: Section[]) => void;
  addSection: () => void;
  removeSection: (sectionId: number) => void;
  addField: (sectionId: number) => void;
  removeField: (sectionId: number, fieldId: number) => void;
  updateSection: (sectionId: number, updates: Partial<Section>) => void;
  updateField: (
    sectionId: number,
    fieldId: number,
    updates: Partial<Field>
  ) => void;
  resetForm: () => void;
}

export const useFormStore = create<FormStore>((set) => ({
  title: "",
  sections: [
    {
      id: 1,
      title: "",
      stateName: "",
      fields: [
        {
          id: 1,
          title: "",
          stateName: "",
          rules: "",
          helperText: "",
          type: "",
        },
      ],
    },
  ],
  setTitle: (title) => set({ title }),
  setSections: (sections) => set({ sections }),
  addSection: () =>
    set((state) => ({
      sections: [
        ...state.sections,
        { id: state.sections.length + 1, title: "", stateName: "", fields: [] },
      ],
    })),
  removeSection: (sectionId) =>
    set((state) => ({
      sections: state.sections.filter((section) => section.id !== sectionId),
    })),
  addField: (sectionId) =>
    set((state) => ({
      sections: state.sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              fields: [
                ...section.fields,
                {
                  id: section.fields.length + 1,
                  title: "",
                  stateName: "",
                  rules: "",
                  helperText: "",
                  type: "",
                },
              ],
            }
          : section
      ),
    })),
  removeField: (sectionId, fieldId) =>
    set((state) => ({
      sections: state.sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              fields: section.fields.filter((field) => field.id !== fieldId),
            }
          : section
      ),
    })),
  updateSection: (sectionId, updates) =>
    set((state) => ({
      sections: state.sections.map((section) =>
        section.id === sectionId ? { ...section, ...updates } : section
      ),
    })),
  updateField: (sectionId, fieldId, updates) =>
    set((state) => ({
      sections: state.sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              fields: section.fields.map((field) =>
                field.id === fieldId ? { ...field, ...updates } : field
              ),
            }
          : section
      ),
    })),
  resetForm: () =>
    set(() => ({
      title: "",
      sections: [
        {
          id: 1,
          title: "",
          stateName: "",
          fields: [
            {
              id: 1,
              title: "",
              stateName: "",
              rules: "",
              helperText: "",
              type: "",
            },
          ],
        },
      ],
    })),
}));
