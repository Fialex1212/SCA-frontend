import { create } from "zustand";
import { CatStore } from "../types";
import { fetchCatsFromApi } from "../api/catApi";

export const useCatStore = create<CatStore>((set) => ({
  cats: [],
  loading: false,
  error: null,

  fetchCats: async () => {
    set({ loading: true, error: null });
    try {
      const cats = await fetchCatsFromApi();
      set({ cats });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch cats" });
    } finally {
      set({ loading: false });
    }
  },
}));