import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AuthLoading from './screens/AuthLoading';
import Login from './screens/Login';


function App() {
  return (
    <SafeAreaProvider>
    {/* <AuthLoading /> */}
    <Login />
   </SafeAreaProvider>
  );
}

export default App;
