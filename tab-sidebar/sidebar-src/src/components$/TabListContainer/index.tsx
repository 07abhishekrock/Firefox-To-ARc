import TabItem from '../TabItem';
import { For, onCleanup } from 'solid-js';
import {
  initializeProfile,
  subscribeToExternalProfileChange,
  useCurrentProfile,
  useTabListItems
} from './tabList.state';
import { useTabController } from 'helpers/tabs/controller';
import Fallback from './Fallback';
import { useSearchBar } from '../SearchBar/useSearchBar';
import { useProfileController } from 'helpers/profile/useProfileController';
import { useCurrentTabFilter } from '../Header/currentTabsType.state';


const TabListContainer = () => {

  const [ tabListItemsState, setTabListItemsState ] = useTabListItems();
  const firefoxTabController = useTabController();
  const [ searchString ] = useSearchBar();
  const profileController = useProfileController();
  const [ , setProfile ] = useCurrentProfile();
  const tabFilter = useCurrentTabFilter();

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

    console.log({ filter: tabFilter(tab.url ?? '') });

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

  onCleanup(async () => {
    unsubscribeCallback();
    unsubscribeFromExternalMessage();
    unsubscribeToCreatedTabEvent();
    unsubscribeToRemovedTabEvent();
    unsubscribeToUpdatedTabEvent();
    unsubscribeToActivatedTabEvent();
  });

  return <ul class="tabList">
    <For each={tabListItemsState()}
      fallback={<Fallback/>}
    >
      {
        (tabItem) =>
          <li onClick={() => activateTab(tabItem.id)}>
            <TabItem {...tabItem} />
          </li>
      }
    </For>
  </ul>;

};

export default TabListContainer;
