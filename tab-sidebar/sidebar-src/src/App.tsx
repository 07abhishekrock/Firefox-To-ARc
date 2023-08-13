import * as React from 'react';
import SelectDefaultProfile from './screens/SelectDefaultProfile';
import TabNavigation from './screens/TabNavigation';
import { useScreenController } from './store/useScreenController';


function RenderScreen() {
  const { currentScreen } = useScreenController();

  if (currentScreen === 'tab-navigation') {
    return <TabNavigation/>;
  }

  if (currentScreen === 'change-default-profile') {
    return <SelectDefaultProfile/>;
  }

  return null;
}


function App() {
  return <div className='p-4 inter bg-nord1 text-nord4 w-[100%] h-[100vh] tracking-wide flex flex-col'>
    <RenderScreen/>
  </div>;
}


export default App;
