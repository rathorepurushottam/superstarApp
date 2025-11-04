import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const KeyBoardAware = ({
  children,
  style,
  scrollEnabled = true,
  refreshControl,
  contentContainerStyle,
  ...props
}) => {
  return (
    <KeyboardAwareScrollView
      {...props}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid
      extraScrollHeight={60} // ✅ ensures input is fully visible
      style={[{ flex: 1 }, style]}
      contentContainerStyle={[{ flexGrow: 1 }, contentContainerStyle]}
      scrollEnabled={scrollEnabled}
      refreshControl={refreshControl}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </KeyboardAwareScrollView>
  );
};

export { KeyBoardAware };
