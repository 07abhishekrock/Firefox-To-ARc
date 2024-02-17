import { gracefullySuppressErrors } from 'helpers/utils/helpers';
import { TabRuntimeMessage } from 'messages';

export interface GMeetSiteAdapterInterface {
  subscribeToMuteUnmuteEvent(cb: (event: TabRuntimeMessage)=>void): ()=>void;
  toggleMute: (tabId: number, newMutedStatus: boolean)=>void;
  getCurrentMeetStatus(tabId: number): void;
  stopListening(): void;
}

export class GMeetSiteAdapter implements GMeetSiteAdapterInterface {

  private subscribers: Set<(event: TabRuntimeMessage)=>void> = new Set();


  private unsubscribe: ()=>void = () => {};


  constructor() {

    gracefullySuppressErrors(() => {

      const callback = (evt: TabRuntimeMessage) => {
        this.subscribers.forEach((cb) => cb(evt));
      };

      browser.runtime.onMessage.addListener(callback);

      this.unsubscribe = () => browser.runtime.onMessage.removeListener(callback);

    }, undefined);

  }


  subscribeToMuteUnmuteEvent(cb: (event: TabRuntimeMessage) => void): () => void {

    this.subscribers.add(cb);

    return () => this.subscribers.delete(cb);

  }


  toggleMute(tabId: number, newMutedStatus: boolean): void {

    gracefullySuppressErrors(() => {
      browser.tabs.sendMessage(tabId, {
        id: 'GMEET:TOGGLE_MUTE_STATUS',
        muted: newMutedStatus
      } as TabRuntimeMessage);
    }, undefined);

  }


  getCurrentMeetStatus(tabId: number): void {

    gracefullySuppressErrors(() => {
      browser.tabs.sendMessage(tabId, {
        id: 'GMEET:RECEIVE_LATEST_MUTE_STATUS'
      } as TabRuntimeMessage);
    }, undefined);

  }


  stopListening() {
    this.unsubscribe();
  }


  subscribeToPlaybackEvent(cb: (event: TabRuntimeMessage)=>void) {

    this.subscribers.add(cb);

    return () => this.subscribers.delete(cb);
  }


}


const gMeetSiteAdapter_Inst = new GMeetSiteAdapter();


export const gMeetSiteAdapter = () => {
  return gMeetSiteAdapter_Inst;
};
