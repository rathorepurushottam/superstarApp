import React, { useEffect } from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigator from './navigation/Navigator';
import {Provider} from 'react-redux';
import store from './libs/configStore';
import { onAppStart } from './helper/utility';


function App() {
  useEffect(() => {onAppStart(store)}, []);
  return (
    <SafeAreaProvider>
      <Provider store={store}>
      <Navigator />
      </Provider>
    
   </SafeAreaProvider>
  );
}

export default App;
