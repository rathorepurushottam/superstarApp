import React from 'react';
import {Platform, StatusBar, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
// import {RootState} from '../../libs/rootReducer';
// import {AppSafeAreaViewProps} from '../../types/common';

const AppSafeAreaView = ({
  children,
  style,
  statusColor,
  hidden,
  barStyle,
}) => {
  return Platform.OS === 'ios' ? (
    <View style={[{flex: 1}, style]}>
      <SafeAreaView
        edges={['right', 'left']}
        style={{
          flex: 1,
        }}>
        {children}
      </SafeAreaView>
    </View>
  ) : (
    <View style={[{flex: 1}, style]}>
      <StatusBar
        translucent={false}
        backgroundColor={statusColor ? statusColor : "black"}
        barStyle={barStyle ? barStyle : "light-content"}
        hidden={hidden}
      />
      {children}
    </View>
  );
};

export {AppSafeAreaView};