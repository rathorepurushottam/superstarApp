import React from "react";
import { Platform, View } from "react-native";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {createDrawerNavigator} from '@react-navigation/drawer';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavigationService from "./NavigationService";
import {
  ADD_CASH_SCREEN,
  AUTH_LOADING_SCREEN,
  AUTHSTACK,
  BOTTOM_NAVIGATION_STACK,
  CREATE_POST_SCREEEN,
  EDIT_PROFILE_SCREEN,
  HOME_SCREEN_MAIN,
  LEADERBOARD_SCREEN,
  LOGIN,
  MORE_MENU_SCREEN,
  PREVIEW_POST_SCREEN,
  PROFILE_SCREEN,
  VIEW_POST_SCREEN,
  WITHDRAW_SCREEN,
} from "./routes";
import AuthLoading from "../screens/AuthLoading";
import Login from "../screens/Login";
import Home from "../screens/Home";
import { colors } from "../theme/color";
import { contestIcon, feedIcon, homeIcon, profileIcon, WalletIcon } from "../helper/images";
import { AppText, GRY, POPPINS_SEMI_BOLD, RED, TEN } from "../common/AppText";
import FastImage from "react-native-fast-image";
import Feeds from "../screens/Feeds";
import Wallet from "../screens/Wallet";
import AddCash from "../screens/AddCash";
import Withdraw from "../screens/Withdraw";
import Profile from "../screens/Profile";
import Contest from "../screens/Contest";
import CreatePost from "../screens/CreatePost";
import Leaderboard from "../screens/Leaderboard";
import EditProfile from "../screens/EditProfile";
import CustomDrawer from "../screens/CustomDrawer";
import MoreMenu from "../screens/MoreMenu";
import PreviewPost from "../screens/PreviewPost";
import ViewPost from "../screens/ViewPost";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Navigator = () => {
  return (
    <NavigationContainer
      ref={(navigatorRef) => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
    >
      <RootStackScreen />
    </NavigationContainer>
  );
};

export default Navigator;

const RootStackScreen = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen
      name={AUTH_LOADING_SCREEN}
      component={AuthLoading}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={AUTHSTACK}
      component={AuthStack}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={BOTTOM_NAVIGATION_STACK}
      component={BottomMainTab}
      options={{ headerShown: false }}
    />
     <Stack.Screen
      name={ADD_CASH_SCREEN}
      component={AddCash}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={WITHDRAW_SCREEN}
      component={Withdraw}
      options={{ headerShown: false }}
    />
     <Stack.Screen
      name={CREATE_POST_SCREEEN}
      component={CreatePost}
      options={{ headerShown: false }}
    />
     <Stack.Screen
      name={LEADERBOARD_SCREEN}
      component={Leaderboard}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={MORE_MENU_SCREEN}
      component={MoreMenu}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={EDIT_PROFILE_SCREEN}
      component={EditProfile}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={PREVIEW_POST_SCREEN}
      component={PreviewPost}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={VIEW_POST_SCREEN}
      component={ViewPost}
      options={{ headerShown: false }}
    />
    
    
  </Stack.Navigator>
);

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={LOGIN} component={Login} />
    </Stack.Navigator>
  );
};

const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen
      name={HOME_SCREEN_MAIN}
      component={Home}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const BottomMainTab = () => {
  const BottomTab = createBottomTabNavigator();
  return (
    <BottomTab.Navigator
      backBehavior="initialRoute"
      // initialRouteName={HOME_SCREEN_MAIN}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: colors.white,
          height: Platform.OS === "ios" ? 80 : 70,
          width: "100%",
          elevation: 0,
          zIndex: 1,
        },
        tabBarAllowFontScaling: false,
        tabBarShowLabel: false,
      }}
    >
      <BottomTab.Screen
        name={"Home"}
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", width: "100%" }}>
              <FastImage
                source={homeIcon}
                tintColor={focused ? colors.lightRed : colors.gray}
                style={{
                  width: 25,
                  height: 25,
                  marginTop: 25,
                }}
                resizeMode="contain"
              />
              <AppText
                style={{ marginTop: 4 }}
                color={focused ? RED : GRY}
                weight={POPPINS_SEMI_BOLD}
                type={TEN}
              >
                Home
              </AppText>
            </View>
          ),
        }}
      />
      <BottomTab.Screen
        name={"Contest"}
        component={Contest}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", width: "150%" }}>
              <FastImage
                source={contestIcon}
                tintColor={focused ? colors.lightRed : colors.gray}
                style={{
                  width: 25,
                  height: 25,
                  marginTop: 25,
                }}
                resizeMode="contain"
              />
              <AppText
                style={{ marginTop: 4 }}
                color={focused ? RED : GRY}
                weight={POPPINS_SEMI_BOLD}
                type={TEN}
              >
                Contest
              </AppText>
            </View>
          ),
        }}
      />

      <BottomTab.Screen
        name={"Wallet"}
        component={Wallet}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", width: "130%" }}>
              <FastImage
                tintColor={focused ? colors.lightRed : colors.gray}
                source={WalletIcon}
                style={{
                  width: 25,
                  height: 25,
                  marginTop: 25,
                }}
                resizeMode="contain"
              />
              <AppText
                style={{ marginTop: 3 }}
                color={focused ? RED : GRY}
                weight={POPPINS_SEMI_BOLD}
                type={TEN}
              >
                Wallet
              </AppText>
            </View>
          ),
        }}
      />

      <BottomTab.Screen
        name={"Feed"}
        component={Feeds}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", width: "100%" }}>
              <FastImage
                tintColor={focused ? colors.lightRed : colors.gray}
                source={feedIcon}
                style={{
                  width: 25,
                  height: 25,
                  marginTop: 25,
                }}
                resizeMode="contain"
              />
              <AppText
                style={{ marginTop: 4 }}
                color={focused ? RED : GRY}
                weight={POPPINS_SEMI_BOLD}
                type={TEN}
              >
                Feed
              </AppText>
            </View>
          ),
        }}
      />

      <BottomTab.Screen
        name={"Account"}
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", width: "150%" }}>
              <FastImage
               tintColor={focused ? colors.lightRed : colors.gray}
                source={profileIcon}
                style={{
                  width: 25,
                  height: 25,
                  marginTop: 25,
                }}
                resizeMode="contain"
              />
              <AppText
                style={{ marginTop: 4 }}
                color={focused ? RED : GRY}
                weight={POPPINS_SEMI_BOLD}
                type={TEN}
              >
                Account
              </AppText>
            </View>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

// const ProfileDrawer = ({navigation}) => {
//   const isFocused = useIsFocused();
//   return (
//     <Drawer.Navigator
//       drawerStyle={{width: '75%'}}
//       drawerContent={props => (
//         <CustomDrawer
//           {...props}
//           navigation={navigation}
//           isFocused={isFocused}
//         />
//       )}
//       screenOptions={{
//         drawerActiveBackgroundColor: '#EBF4FF',
//         drawerActiveTintColor: 'black',
//         drawerInactiveBackgroundColor: 'blue',
//         headerShown: false,
//       }}
//       drawerPosition={'left'}>
//       <Drawer.Screen
//         name="Profile"
//         component={ProfileStack}
//         options={{
//           headerShown: false,
//         }}
//         drawerStyle={{borderWidth: 1}}
//       />
//     </Drawer.Navigator>
//   );
// };


// const ProfileStack = () => (
//   <Stack.Navigator
//     screenOptions={{
//       headerShown: false,
//     }}>
//     <Stack.Screen
//       name={'Profile'}
//       component={Profile}
//       options={{headerShown: false}}
//     />
//   </Stack.Navigator>
// );