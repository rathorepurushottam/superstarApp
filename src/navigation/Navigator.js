import React, { useRef } from "react";
import { Platform, View, Animated } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FastImage from "react-native-fast-image";

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
  VIEW_POST_SCREEN,
  WITHDRAW_SCREEN,
} from "./routes";

import AuthLoading from "../screens/AuthLoading";
import Login from "../screens/Login";
import Home from "../screens/Home";
import Feeds from "../screens/Feeds";
import Wallet from "../screens/Wallet";
import AddCash from "../screens/AddCash";
import Withdraw from "../screens/Withdraw";
import Profile from "../screens/Profile";
import Contest from "../screens/Contest";
import CreatePost from "../screens/CreatePost";
import Leaderboard from "../screens/Leaderboard";
import EditProfile from "../screens/EditProfile";
import MoreMenu from "../screens/MoreMenu";
import PreviewPost from "../screens/PreviewPost";
import ViewPost from "../screens/ViewPost";
import Support from "../screens/Support";

import { BottomTabBar } from "@react-navigation/bottom-tabs";

import { colors } from "../theme/color";
import {
  contestIcon,
  feedIcon,
  homeIcon,
  profileIcon,
  WalletIcon,
} from "../helper/images";
import { AppText, GRY, POPPINS_SEMI_BOLD, RED, TEN } from "../common/AppText";
import { navigationRef } from "./NavigationService";

// ------------------ Navigators ------------------ //
const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const defaultStackOptions = { headerShown: false };

// ------------------ Root Stack ------------------ //
const RootStackScreen = () => (
  <Stack.Navigator screenOptions={defaultStackOptions}>
    <Stack.Screen name={AUTH_LOADING_SCREEN} component={AuthLoading} />
    <Stack.Screen name={AUTHSTACK} component={AuthStack} />
    <Stack.Screen name={BOTTOM_NAVIGATION_STACK} component={BottomMainTab} />
    <Stack.Screen name={ADD_CASH_SCREEN} component={AddCash} />
    <Stack.Screen name={WITHDRAW_SCREEN} component={Withdraw} />
    <Stack.Screen name={CREATE_POST_SCREEEN} component={CreatePost} />
    <Stack.Screen name={LEADERBOARD_SCREEN} component={Leaderboard} />
    <Stack.Screen name={MORE_MENU_SCREEN} component={MoreMenu} />
    <Stack.Screen name={EDIT_PROFILE_SCREEN} component={EditProfile} />
    <Stack.Screen name={PREVIEW_POST_SCREEN} component={PreviewPost} />
    <Stack.Screen name={VIEW_POST_SCREEN} component={ViewPost} />
    <Stack.Screen name={"Support_Screen"} component={Support} />
  </Stack.Navigator>
);

// ------------------ Auth Stack ------------------ //
const AuthStack = () => (
  <Stack.Navigator screenOptions={defaultStackOptions}>
    <Stack.Screen name={LOGIN} component={Login} />
  </Stack.Navigator>
);

// ------------------ Bottom Tabs with Animation ------------------ //
const BottomMainTab = () => {

  return (
    <BottomTab.Navigator
      // tabBar={(props) => <AnimatedTabBar {...props} tabOffset={tabOffset} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.white,
          height: 90, // badi tab
          borderTopWidth: 0,
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          paddingBottom: Platform.OS === "ios" ? 20 : 20,
        },
        tabBarItemStyle: {
          flexDirection: "column",
          justifyContent: "center", // vertical center
          alignItems: "center", // horizontal center
        },
        tabBarLabelStyle: {
          marginBottom: 0,
          fontSize: 12,
        },
        
        tabBarShowLabel: false,
      }}
    >
      {renderTab(
        "Home",
        (props) => (
          <Home {...props} />
        ),
        homeIcon
      )}
      {renderTab(
        "Contest",
        (props) => (
          <Contest {...props} />
        ),
        contestIcon
      )}
      {renderTab(
        "Wallet",
        (props) => (
          <Wallet {...props}  />
        ),
        WalletIcon
      )}
      {renderTab(
        "Reels",
        (props) => (
          <Feeds {...props}  />
        ),
        feedIcon
      )}
      {renderTab(
        "Account",
        (props) => (
          <Profile {...props} />
        ),
        profileIcon
      )}
    </BottomTab.Navigator>
  );
};

// ------------------ Helper for Tabs ------------------ //
const renderTab = (name, Component, icon) => (
  <BottomTab.Screen
    key={name}
    name={name}
    children={Component}
    options={{
      tabBarIcon: ({ focused }) => (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            minWidth: 60,
          }}
        >
          <FastImage
            source={icon}
            tintColor={focused ? colors.lightRed : colors.gray}
            style={{ width: 25, height: 25, marginTop: 20 }}
            resizeMode="contain"
          />
          <AppText
            style={{ marginTop: 4 }}
            color={focused ? RED : GRY}
            weight={POPPINS_SEMI_BOLD}
            type={TEN}
            numberOfLines={1}
          >
            {name}
          </AppText>
        </View>
      ),
    }}
  />
);

// ------------------ App Container ------------------ //
const Navigator = () => <RootStackScreen />;

export default Navigator;
