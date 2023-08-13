import { create } from 'zustand';


type AllScreens = 'tab-navigation' | 'change-default-profile';


type Store = {
  currentScreen: AllScreens;
  changeScreenTo: (newScreen: AllScreens)=>void;
}


export const useScreenController = create<Store>((set) => {
  return {
    currentScreen: 'tab-navigation',
    changeScreenTo(newScreen) {
      set(s => ({
        ...s,
        currentScreen: newScreen
      }));
    }
  };
});
