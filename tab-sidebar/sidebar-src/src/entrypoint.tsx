import { render } from 'solid-js/web';

import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import PaddingWrapper from './components$/PaddingWrapper';
import TabListContainer from './components$/TabListContainer';


const App = () => {

  return (<div class="canvas">
    <Header/>
    <PaddingWrapper>
      <SearchBar/>
    </PaddingWrapper>
    <PaddingWrapper>
      <TabListContainer/>
    </PaddingWrapper>
  </div>);
};

render(() => <App/>, document.getElementById('root')!);
