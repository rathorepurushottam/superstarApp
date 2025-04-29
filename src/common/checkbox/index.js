import React from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import { tick } from "../../helper/images";
import styles from "./styles";
import FastImage from "react-native-fast-image";
import { colors } from "../../theme/color";

const Checkbox = ({
  onPress,
  value,
  disabled,
  type,
  style,
  innerStyle,
  login,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={{ height: 17, width: 17 }}
    //   android_ripple={{
    //     foreground: true,
    //     color: !login ? colors.white : colors.darkBlue,
    //   }}
    >
      <View style={[styles.linearGradientWrapper, style]}>
        {value ? (
          <View style={[styles.selectedUIFilter(type, colors), innerStyle]}>
            <FastImage
              source={tick}
              resizeMode={"contain"}
              tintColor={login && colors.white}
              style={[styles.checkboxTick(type, colors)]}
            />
          </View>
        ) : (
          <View style={styles.unchecked(colors)} />
        )}
      </View>
    </Pressable>
  );
};

export default Checkbox;