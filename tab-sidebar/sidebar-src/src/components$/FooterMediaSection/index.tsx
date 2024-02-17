import { MEDIA_TYPE_KEYS, audibleTabs, useCurrentAudibleTabs } from '../TabListContainer/tabList.state';
import { YoutubeMusicMediaSection } from './YoutubeMusicMediaSection';
import { YoutubeSection } from './YoutubeSection';


const getGMeetMediaTab = () => {
  return audibleTabs()[MEDIA_TYPE_KEYS.MEETS]?.[0];
};


const FooterMediaSection = () => {

  useCurrentAudibleTabs();

  return <div class="footer_media_section">
    <YoutubeMusicMediaSection/>
    <YoutubeSection/>
  </div>;
};

export default FooterMediaSection;
