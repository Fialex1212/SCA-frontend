import { create } from "zustand";
import { MissionStore } from "../types";
import { fetchMissionsFromApi } from "../api/missionApi";

export const useMissionStore = create<MissionStore>((set) => ({
  missions: [],
  loading: false,
  error: null,

  fetchMissions: async () => {
    set({ loading: true, error: null });
    try {
      const missions = await fetchMissionsFromApi();
      set({ missions });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch missions" });
    } finally {
      set({ loading: false });
    }
  },
}));
