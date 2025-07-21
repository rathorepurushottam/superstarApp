import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {AppText, POPPINS_MEDIUM, TWELVE, WHITE} from './AppText';
import {colors} from '../theme/color';
import { Primary } from '../theme/dimens';
import { poppinsMedium } from '../theme/typography';
import { StyleSheet } from 'react-native';

const DropdownComponent = props => {
  const {items, value, placeholder, onSelectItem, label, setValue,style} = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      {label && (
        <AppText
          {...props}
          weight={POPPINS_MEDIUM}
          type={TWELVE}
          color={WHITE}
          style={[styles.NameLabel]}>
          {label}
        </AppText>
      )}

      <DropDownPicker
        placeholder={placeholder}
        placeholderStyle={styles.placeholderText}
        textStyle={styles.textStyle}
        arrowIconStyle={styles.arrowIcon}
        dropDownContainerStyle={styles.dropDownContainerStyle}
        labelStyle={{color: colors.white}}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        style={[styles.background, style]}
        onSelectItem={onSelectItem}
        dropDownDirection="TOP"
      />
    </>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
    background: {
      height: Primary.Height,
      borderRadius: 5,
      borderColor: colors.borderLightBlue,
      backgroundColor: '#383838',
    },
    placeholderText: {
      fontFamily: poppinsMedium,
      fontSize: 12,
      color: colors.white
    },
    dropDownContainerStyle: {
      borderColor: colors.borderLightBlue,
    },
    textStyle: {
      color: colors.black,
    },
    NameLabel: {
      marginTop: 20,
      marginBottom: 5,
    },
    arrowIcon: {
      tintColor: colors.white,
    }
  
  });
