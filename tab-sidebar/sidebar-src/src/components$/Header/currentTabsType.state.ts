import { createSignal } from 'solid-js';


export type CurrentTabState = 'media' | 'tabs';
const [ currentTabState, setCurrentTabState ] = createSignal<CurrentTabState>('tabs');


export const useCurrentTab = () => {
  return [ currentTabState, setCurrentTabState ] as ReturnType<typeof createSignal<CurrentTabState>>;
};
