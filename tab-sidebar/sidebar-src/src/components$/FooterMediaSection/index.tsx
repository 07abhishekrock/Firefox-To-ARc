import { useCurrentAudibleTabs } from '../TabListContainer/tabList.state';
import { GMeetMediaSection } from './GMeetMediaSection';
import { YoutubeMusicMediaSection } from './YoutubeMusicMediaSection';
import { YoutubeSection } from './YoutubeSection';


const FooterMediaSection = () => {

  useCurrentAudibleTabs();

  return <div class="footer_media_section">
    <YoutubeMusicMediaSection/>
    <YoutubeSection/>
    <GMeetMediaSection/>
  </div>;
};

export default FooterMediaSection;
