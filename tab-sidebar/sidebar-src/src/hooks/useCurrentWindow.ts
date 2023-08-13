import { useEffect, useState } from 'react';

export const useCurrentWindow = (onClose: (currentWindowId: number | null, closedWindowId: number)=>void) => {

  const [ currentWindow, setCurrentWindow ] = useState<number | null>(null);


  useEffect(() => {
    const recordCurrentBrowserWindow = async () => {
      if (typeof browser !== 'undefined') {
        const windowCurrent = await browser.windows.getCurrent();

        setCurrentWindow(windowCurrent.id ?? null);
      }
    };

    recordCurrentBrowserWindow();


  }, []);

  useEffect(() => {

    if (typeof browser !== 'undefined') {
      browser.windows.onRemoved.addListener((closedWindowId: number) => onClose(currentWindow, closedWindowId));
    }

    return () => {
      browser.windows.onRemoved.removeListener((closedWindowId: number) => onClose(currentWindow, closedWindowId));
    };
  }, [ currentWindow, onClose ]);

  return { currentWindow };
};
