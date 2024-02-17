import { gracefullySuppressErrors } from 'helpers/utils/helpers';
import { TabRuntimeMessage } from 'messages';

export interface YoutubeMusicSiteAdapterInterface {
  playPrev(tabId: number): boolean;
  playNext(tabId: number): boolean;
  stopListening(): void;
  subscribeToPlaybackEvent(cb: (event: TabRuntimeMessage)=>void): ()=>void;
  getLatestTrack(tabId: number): void;
}

export class YoutubeMusicSiteAdapter implements YoutubeMusicSiteAdapterInterface {

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


  stopListening() {
    this.unsubscribe();
  }


  subscribeToPlaybackEvent(cb: (event: TabRuntimeMessage)=>void) {

    this.subscribers.add(cb);

    return () => this.subscribers.delete(cb);
  }


  getLatestTrack(tabId: number) {
    gracefullySuppressErrors(() => {
      browser.tabs.sendMessage(tabId, {
        id: 'YOUTUBE_MUSIC::GET_LATEST_PLAYBACK'
      } as TabRuntimeMessage);
    }, undefined);
  }


  togglePlayingStatus(tabId: number) {

    return gracefullySuppressErrors(() => {

      browser.tabs.sendMessage(
        tabId,
        {
          id: 'YOUTUBE_MUSIC::TOGGLE_PLAY'
        } as TabRuntimeMessage);
      return true;

    }, true);

  }


  playPrev(tabId: number): boolean {

    return gracefullySuppressErrors(() => {

      browser.tabs.sendMessage(tabId, {
        id: 'YOUTUBE_MUSIC::PLAY_PREVIOUS'
      });
      return true;
    }, false);

  }


  playNext(tabId: number): boolean {

    return gracefullySuppressErrors(() => {

      browser.tabs.sendMessage(tabId, {
        id: 'YOUTUBE_MUSIC::PLAY_NEXT'
      });
      return true;
    }, false);

  }

}


const youtubeMusicSiteAdapter_Inst = new YoutubeMusicSiteAdapter();


export const youtubeMusicSiteAdapter = () => {
  return youtubeMusicSiteAdapter_Inst;
};
