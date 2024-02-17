import { youtubeMusicSiteAdapter } from 'contentSiteAdapters/YoutubeMusicSiteAdapter';
import { createEffect, createSignal } from 'solid-js';
import { MEDIA_TYPE_KEYS, audibleTabs } from '../../TabListContainer/tabList.state';
import FooterMediaUnit, { FooterMediaButton } from '@/components/FooterMediaUnit';


const youtubeMusicController = () => {
  const youtubeMusicSiteAdapterInst = youtubeMusicSiteAdapter();
  const [ isPlaying, setIsPlaying ] = createSignal(false);
  const [ title, setTitle ] = createSignal('No playback title');

  youtubeMusicSiteAdapterInst.subscribeToPlaybackEvent((evt) => {

    switch (evt.id) {
      case 'YOUTUBE_MUSIC::TOGGLE_PLAY_CALLBACK' : {
        setIsPlaying(!evt.paused);
        break;
      }

      case 'YOUTUBE_MUSIC::RECEIVE_LATEST_PLAYBACK': {
        setIsPlaying(!evt.paused);
        setTitle(evt.title);
      }
    }

  });

  return { isPlaying, controller: youtubeMusicSiteAdapterInst, title };
};


const getAudibleYoutubeMusicMediaTab = () => {
  return audibleTabs()[MEDIA_TYPE_KEYS.YOUTUBE_MUSIC]?.[0];
};


export const YoutubeMusicMediaSection = () => {
  const { isPlaying, controller, title } = youtubeMusicController();

  createEffect(() => {
    if (getAudibleYoutubeMusicMediaTab()?.id) {
      controller.getLatestTrack(getAudibleYoutubeMusicMediaTab()?.id as number);
    }
  });

  return <FooterMediaUnit
    footerPrimaryIcon='play_circle'
    currentPlayingText={title().trim() ?? 'No playback'}
    hidden={!getAudibleYoutubeMusicMediaTab()?.id}
  >
    <FooterMediaButton
      icon="skip_previous"
      whatItDoes="Skip to previous track"
      onClick={
        () => {
          controller.playPrev(
            getAudibleYoutubeMusicMediaTab().id ?? -1
          );
        }
      }
    />
    <FooterMediaButton
      icon={!isPlaying() ? 'play_arrow' : 'pause'}
      whatItDoes={!isPlaying() ? 'Play music' : 'Pause the music'}
      onClick={
        () => {
          controller.togglePlayingStatus(
            getAudibleYoutubeMusicMediaTab().id ?? -1
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
            getAudibleYoutubeMusicMediaTab().id ?? -1
          );
        }
      }
    />
  </FooterMediaUnit>;

};
