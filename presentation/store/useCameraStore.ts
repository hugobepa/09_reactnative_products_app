import { create } from "zustand";

interface temporalCameraStoreState {
  selectedImages: string[];

  addSelectedImage: (image: string) => void;
  clearImages: () => void;
}

export const useCameraStore = create<temporalCameraStoreState>()(
  (set, get) => ({
    selectedImages: [],
    addSelectedImage: (image) => {
      set((state) => ({ selectedImages: [...state.selectedImages, image] }));
    },
    clearImages: () => set({ selectedImages: [] }),
  })
);
