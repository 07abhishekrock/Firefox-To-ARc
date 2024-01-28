import { createSignal } from 'solid-js';


export type CurrentTabState = 'media' | 'tabs';
const [ currentTabState, setCurrentTabState ] = createSignal<CurrentTabState>('tabs');

const mediaWhitelist = [
  'youtube.com',
  'netflix.com',
  'primevideo.com',
  'meet.google.com'
];

export const useCurrentTab = () => {
  return [ currentTabState, setCurrentTabState ] as ReturnType<typeof createSignal<CurrentTabState>>;
};


type TabFilter = (tabUrl: string)=>boolean
export const useCurrentTabFilter = (): TabFilter => {
  if (currentTabState() === 'media') {
    return (tabUrl: string) => {

      if (!tabUrl) return false;

      return mediaWhitelist.some(s => {
        return tabUrl.includes(s);
      });
    };
  }

  return () => true;
};
