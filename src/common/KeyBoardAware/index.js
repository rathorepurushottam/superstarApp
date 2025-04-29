import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const KeyBoardAware = ({children, style, scrollEnabled,refreshControl, ...props}) => {
  return (
    <KeyboardAwareScrollView
      {...props}
      keyboardShouldPersistTaps="handled"
      style={[
        {
          flex: 1,
        },
        style,
      ]}
      contentContainerStyle={{flexGrow: 1}}
      scrollEnabled={scrollEnabled}
      refreshControl={refreshControl}
      showsVerticalScrollIndicator={false}>
      {children}
    </KeyboardAwareScrollView>
  );
};
export {KeyBoardAware};