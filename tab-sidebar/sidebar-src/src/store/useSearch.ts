import { create } from 'zustand';


type Store = {
  isSearching: boolean;
  toggleIsSearching: (toggleTo: boolean)=>void;
}

export const useSearch = create<Store>((set) => {
  return {
    isSearching: false,
    toggleIsSearching(toggle) {
      set(s => ({
        ...s,
        isSearching: toggle
      }));
    }
  };
});
