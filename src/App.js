import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigator from './navigation/Navigator';


function App() {
  return (
    <SafeAreaProvider>
    <Navigator />
   </SafeAreaProvider>
  );
}

export default App;
