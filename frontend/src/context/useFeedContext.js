import { create } from "zustand";

const useFeedContext = create((set) => ({
  feedItems: [],
  setFeedItems: (items) => set({ feedItems: items }),
}));
export default useFeedContext;
