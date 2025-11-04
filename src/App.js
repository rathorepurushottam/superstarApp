import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigator from "./navigation/Navigator";
import { Provider } from "react-redux";
import store from "./libs/configStore";
import { onAppStart } from "./helper/utility";
import { VESDK } from "react-native-videoeditorsdk";
import { NavigationContainer } from "@react-navigation/native";
import NavigationService from "./navigation/NavigationService";

function App() {
  useEffect(() => {
    onAppStart(store);
  }, []);
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
          onReady={() => {
            NavigationService.setIsReady(true);
          }}
        >
          <Navigator />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
