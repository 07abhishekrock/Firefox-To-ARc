const getHostname = (url?: string) => {
  if (!url) return '';

  const urlObject = new URL(url);

  return urlObject.hostname;
};

export const reorderTabsBasedOnHostname = async () => {
  if (typeof browser !== 'undefined') {
    const currentTabs = await browser.tabs.query({});
    const sortedTabsBasedOnHostname = currentTabs.sort((a, b) => {
      const A = getHostname(a.url).toUpperCase(); // ignore upper and lowercase
      const B = getHostname(b.url).toUpperCase(); // ignore upper and lowercase

      if (A < B) {
        return -1; //nameA comes first
      }

      if (A > B) {
        return 1; // nameB comes first
      }

      return 0;  // names must be equal
    });

    const moveTabs = currentTabs.map((tab) => {
      const targetIndex = sortedTabsBasedOnHostname.findIndex(s => s.id === tab.id);

      if (!tab.id || tab.index === targetIndex) return Promise.resolve(null);

      return browser.tabs.move(tab.id, {
        index: targetIndex
      });
    });

    return Promise.all(moveTabs);

  }
};
