
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { AppSafeAreaView } from '../common/AppSafeAreaView';
import NavigationService from '../navigation/NavigationService';
import FastImage from 'react-native-fast-image';
import { splash } from '../helper/images';

import { Screen } from '../theme/dimens';
import { AUTHSTACK, BOTTOM_NAVIGATION_STACK } from '../navigation/routes';
import { getUserProfile } from '../actions/profileAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_TOKEN_KEY } from '../libs/constant';
import { useDispatch } from 'react-redux';

const AuthLoading = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        bootstrapAsync();
      }, []);
    
      const bootstrapAsync = async () => {
        try {
          const token = await AsyncStorage.getItem(USER_TOKEN_KEY);
          if (token) {
            dispatch(getUserProfile(false, false));
          } else {
            setTimeout(()=>{
              NavigationService.navigate(AUTHSTACK);
            },2000)
          }
        } catch (e) {
          console.log(e);
        }
      };
    
    return (
        <AppSafeAreaView statusColor={'#00071C'}>
            <FastImage source={splash} resizeMode="cover" style={styles.splashImage}/>
            {/* <SpinnerSecond loading={loading} /> */}
        </AppSafeAreaView>
    );
};

export default AuthLoading;

const styles = StyleSheet.create({
    splashImage: {
        flex: 1,
        Width: Screen.Width,
        Height: Screen.Height
    }
})