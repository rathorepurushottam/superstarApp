
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { AppSafeAreaView } from '../common/AppSafeAreaView';
import NavigationService from '../navigation/NavigationService';
import FastImage from 'react-native-fast-image';
import { splash } from '../helper/images';

import { Screen } from '../theme/dimens';
import { AUTHSTACK, BOTTOM_NAVIGATION_STACK } from '../navigation/routes';

const AuthLoading = () => {
    useEffect(() => {
        setTimeout(() => {
        //    NavigationService.navigate(AUTHSTACK);
           NavigationService.navigate(BOTTOM_NAVIGATION_STACK);
        }, 3000);
    }, []);

    
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