import TabItem from '../TabItem';
import { For, createEffect, onCleanup } from 'solid-js';
import {
  initializeProfile,
  subscribeToExternalProfileChange,
  useCurrentProfile,
  useTabListItems,
  useTabListItemsBasedOnSearch
} from './tabList.state';
import { useTabController } from 'helpers/tabs/controller';
import Fallback from './Fallback';
import { useSearchBar } from '../SearchBar/useSearchBar';
import { useProfileController } from 'helpers/profile/useProfileController';
import { useCurrentTabFilter } from '../Header/currentTabsType.state';
import { allTabsProfile } from 'helpers/profile/ProfileController';


const getCurrentListOfTabs = (tester: any) => {
  const [ tabListItemsState ] = useTabListItems();
  const [ currentProfile ] = useCurrentProfile();

  return tabListItemsState().filter((tabItem) => {

    let isTabIncludedInCurrentProfile = false;

    if (!currentProfile()) {
      isTabIncludedInCurrentProfile = true;

    } else if (currentProfile().name === allTabsProfile.name) {
      isTabIncludedInCurrentProfile = true;

    } else if (currentProfile().id === tabItem.containerId) {
      isTabIncludedInCurrentProfile = true;
    }

    return tester(tabItem.title, tabItem.url) && isTabIncludedInCurrentProfile;

  });
};


const TabListContainer = () => {

  const [ , setTabListItemsState ] = useTabListItems();
  const firefoxTabController = useTabController();
  const [ searchString ] = useSearchBar();
  const profileController = useProfileController();
  const [ , setProfile ] = useCurrentProfile();
  const tabFilter = useCurrentTabFilter();
  const testerForSearch = useTabListItemsBasedOnSearch(searchString());

  const unsubscribeCallback = profileController.subscribeToProfileChange((nProfile) => {
    setProfile(nProfile);
  });

  const unsubscribeFromExternalMessage = subscribeToExternalProfileChange();

  initializeProfile();


  const activateTab = (tabItemId?: number) => {

    if (typeof tabItemId !== 'undefined') {
      firefoxTabController.activateTab(tabItemId);
    }
  };

  const unsubscribeToUpdatedTabEvent = firefoxTabController.subscribeToTabUpdated((tab) => {
    setTabListItemsState(old => {
      return [
        ...old.map(t => {
          if (t.id === tab.id) {
            return tab;
          }

          return t;
        })
      ];
    });
  });


  const unsubscribeToCreatedTabEvent = firefoxTabController.subscribeToTabCreated((tab) => {

    const tester = firefoxTabController.doesQueryMatchWithTab(searchString());

    if (tester(tab.title, tab.url) && tabFilter(tab.url ?? '')) {
      setTabListItemsState(old => {
        return [
          ...old,
          tab
        ];
      });

    }

  });

  const unsubscribeToRemovedTabEvent = firefoxTabController.subscribeToTabRemoved((tabId) => {
    setTabListItemsState(old => {
      return [ ...old.filter(s => s.id !== tabId) ];
    });
  });

  const unsubscribeToActivatedTabEvent = firefoxTabController.subscribeToTabActivated((newTabId, prevTabId) => {
    setTabListItemsState(old => {
      return [ ...old.map(s => {
        if (s.id === newTabId) {
          return {
            ...s,
            isActive: true
          };

        } else if (s.id === prevTabId) {
          return {
            ...s,
            isActive: false
          };
        }

        return s;
      }) ];
    });
  });

  createEffect(async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const tabController = useTabController();
    const allTabs = await tabController.queryTabs('');

    setTabListItemsState(allTabs);
  });

  onCleanup(async () => {
    unsubscribeCallback();
    unsubscribeFromExternalMessage();
    unsubscribeToCreatedTabEvent();
    unsubscribeToRemovedTabEvent();
    unsubscribeToUpdatedTabEvent();
    unsubscribeToActivatedTabEvent();
  });

  return <ul class="tabList">
    <For each={getCurrentListOfTabs(testerForSearch)}
      fallback={<Fallback/>}
    >
      {

        (tabItem) => {
          return <li onClick={() => activateTab(tabItem.id)}>
            <TabItem {...tabItem} />
          </li>;

        }
      }
    </For>
  </ul>;

};

export default TabListContainer;
