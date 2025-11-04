import React, { memo } from "react";
import { StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { searchIcon, closeIcon } from "../../helper/images";

const SearchInput = ({ 
  value, 
  onChangeText, 
  onClear,
  placeholder = "Search something",
  autoFocus = false,
  ...rest 
}) => {
  return (
    <View style={styles.container}>
      <FastImage
        source={searchIcon}
        resizeMode="contain"
        style={styles.icon}
      />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9A9A9A"
        style={styles.inputStyle}
        maxLength={50}
        autoFocus={autoFocus}
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="search"
        clearButtonMode="never"
        {...rest}
      />
      {value?.length > 0 && onClear && (
        <TouchableOpacity 
          onPress={onClear} 
          style={styles.clearButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <FastImage
            source={closeIcon}
            resizeMode="contain"
            style={styles.clearIconImage}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default memo(SearchInput);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#E3E3E3",
    marginHorizontal: 20,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: "#9A9A9A",
  },
  inputStyle: {
    flex: 1,
    fontSize: 14,
    color: "#000",
    paddingVertical: 0, // removes extra padding on Android
  },
  clearButton: {
    padding: 4,
    marginLeft: 4,
  },
  clearIconImage: {
    width: 16,
    height: 16,
    tintColor: "#9A9A9A",
  },
});
