import { gMeetSiteAdapter } from 'contentSiteAdapters/GMeetSiteAdapter';
import { createEffect, createSignal } from 'solid-js';
import { MEDIA_TYPE_KEYS, audibleTabs } from '../../TabListContainer/tabList.state';
import FooterMediaUnit, { FooterMediaButton } from '@/components/FooterMediaUnit';


const gMeetController = () => {
  const gMeetSiteAdapter_Inst = gMeetSiteAdapter();
  const [ isMuted, setIsMuted ] = createSignal(false);
  const [ title, setTitle ] = createSignal('No Meet Title');

  gMeetSiteAdapter_Inst.subscribeToPlaybackEvent((evt) => {

    switch (evt.id) {
      case 'GMEET:RECEIVE_LATEST_MUTE_STATUS': {
        setIsMuted(!evt.muted);
        setTitle(evt.title);
      }
    }

  });

  return { isMuted, controller: gMeetSiteAdapter_Inst, title };
};


const getAudibleGMeetTab = () => {
  return audibleTabs()[MEDIA_TYPE_KEYS.MEETS]?.[0];
};


export const GMeetMediaSection = () => {
  const { isMuted, controller, title } = gMeetController();

  createEffect(() => {
    if (getAudibleGMeetTab()?.id) {
      controller.getCurrentMeetStatus(getAudibleGMeetTab()?.id as number);
    }
  });

  return <FooterMediaUnit
    footerPrimaryIcon='videocam'
    currentPlayingText={title().trim() ?? 'No playback'}
    hidden={!getAudibleGMeetTab()?.id}
  >
    <FooterMediaButton
      icon={isMuted() ? 'mic_off' : 'mic'}
      whatItDoes="Toggle mic"
      onClick={
        () => {
          controller.toggleMute(
            getAudibleGMeetTab().id ?? -1,
            !isMuted()
          );
        }
      }
    />
  </FooterMediaUnit>;

};
