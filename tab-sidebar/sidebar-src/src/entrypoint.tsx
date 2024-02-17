import { render } from 'solid-js/web';

import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import PaddingWrapper from './components$/PaddingWrapper';
import TabListContainer from './components$/TabListContainer';
import FooterMediaSection from './components$/FooterMediaSection';


const App = () => {

  return (<div class="canvas">
    <Header/>
    <PaddingWrapper>
      <SearchBar/>
    </PaddingWrapper>
    <PaddingWrapper grow={1}>
      <TabListContainer/>
    </PaddingWrapper>
    <FooterMediaSection/>
  </div>);
};

render(() => <App/>, document.getElementById('root')!);
