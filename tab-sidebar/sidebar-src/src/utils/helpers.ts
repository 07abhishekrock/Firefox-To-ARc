import { useCurrentTab } from '@/components/Header/currentTabsType.state';

export const safeJsonParse = (jsonString: string): any => {
  try {

    if (!jsonString) return null;
    const data = JSON.parse(jsonString);

    return data;

  } catch (e) {
    return null;
  }
};

export const limitToMaxChars = (stringToLimit: string, charLength: number) => {
  if (stringToLimit.length <= charLength) {
    return stringToLimit;
  }

  return stringToLimit.slice(0, charLength - 3).concat('...');
};

export const initializeTabViewType = async () => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [ , setCurrentTabType ] = useCurrentTab();

  const currentTabViewTypeDict = window.__isMediaTab;


  if (currentTabViewTypeDict) {

    setCurrentTabType('media');
   // reset back to tabs
  }

};
