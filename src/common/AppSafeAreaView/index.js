import React from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AppSafeAreaView = ({ children, style, statusColor, hidden, barStyle }) => {
  return (
    <SafeAreaView
      edges={Platform.OS === 'ios' ? ['right', 'left'] : ['top', 'bottom', 'right', 'left']}
      style={[{ flex: 1, backgroundColor: statusColor || '#FEFEFE' }, style]}
    >
      <StatusBar
        translucent={false}
        backgroundColor={statusColor || 'black'}
        barStyle={barStyle || 'dark-content'}
        hidden={hidden}
      />
      {children}
    </SafeAreaView>
  );
};

AppSafeAreaView.defaultProps = {
  statusColor: '#000',
  barStyle: 'dark-content',
  hidden: false,
};

export { AppSafeAreaView };
