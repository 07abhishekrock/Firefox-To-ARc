import * as React from 'react';
import DrawerTitle from './components/DrawerTitle';
import SearchResults from './components/SearchResults';


function App() {
  return <div className='p-4 inter bg-nord1 text-nord4 w-[100%] h-[100vh] tracking-wide flex flex-col'>
    <DrawerTitle/>
    <SearchResults/>
  </div>;
}


export default App;
