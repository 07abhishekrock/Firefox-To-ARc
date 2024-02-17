import { createEffect, createSignal } from 'solid-js';
import { MEDIA_TYPE_KEYS, audibleTabs } from '../../TabListContainer/tabList.state';
import FooterMediaUnit, { FooterMediaButton } from '@/components/FooterMediaUnit';
import { youtubeSiteAdapter } from 'contentSiteAdapters/YoutubeSiteAdapter';


const youtubeController = () => {
  const youtubeSiteAdapterInst = youtubeSiteAdapter();
  const [ isPlaying, setIsPlaying ] = createSignal(false);
  const [ title, setTitle ] = createSignal('No playback title');

  youtubeSiteAdapterInst.subscribeToPlaybackEvent((evt) => {

    switch (evt.id) {
      case 'YOUTUBE::TOGGLE_PLAY_CALLBACK' : {
        setIsPlaying(!evt.paused);
        break;
      }

      case 'YOUTUBE::RECEIVE_LATEST_PLAYBACK': {
        setIsPlaying(!evt.paused);
        setTitle(evt.title);
      }
    }

  });

  return { isPlaying, controller: youtubeSiteAdapterInst, title };
};


const getAudibleYoutubeTab = () => {
  return audibleTabs()[MEDIA_TYPE_KEYS.YOUTUBE]?.[0];
};


export const YoutubeSection = () => {
  const { isPlaying, controller, title } = youtubeController();

  createEffect(() => {
    if (getAudibleYoutubeTab()?.id) {
      controller.getLatestTrack(getAudibleYoutubeTab()?.id as number);
    }
  });

  return <FooterMediaUnit
    footerPrimaryIcon='smart_display'
    currentPlayingText={title() ?? 'No playback'}
    hidden={!getAudibleYoutubeTab()?.id}
  >
    <FooterMediaButton
      icon={!isPlaying() ? 'play_arrow' : 'pause'}
      whatItDoes={!isPlaying() ? 'Play music' : 'Pause the music'}
      onClick={
        () => {
          controller.togglePlayingStatus(
            getAudibleYoutubeTab().id ?? -1
          );
        }
      }
    />
    <FooterMediaButton
      icon='skip_next'
      whatItDoes='Skip to next track'
      onClick={
        () => {
          controller.playNext(
            getAudibleYoutubeTab().id ?? -1
          );
        }
      }
    />
  </FooterMediaUnit>;

};
