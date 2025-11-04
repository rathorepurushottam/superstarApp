import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";
import { useSelector } from "react-redux";

import {
  AppText,
  BLACK,
  FORTEEN,
  POPPINS_BOLD,
} from "../AppText";
import {
  iconbell,
  SuperStar,
  userIcon,
  WalletIcon,
  searchIcon,
} from "../../helper/images";
import NavigationService from "../../navigation/NavigationService";
import { IMAGE_BASE_URL } from "../../helper/utility";

const Header = ({ onSearchPress }) => {
  const userWallet = useSelector((state) => state.profile.userWallet);
  const userData = useSelector((state) => state.profile.userData);

  const walletBalance =
    (userWallet?.deposits || 0) +
    (userWallet?.winnings || 0) +
    (userWallet?.cashbackRewards || 0) +
    (userWallet?.bonusRewards || 0);

  return (
    <View style={styles.container}>
      {/* Left Section */}
      <View style={styles.leftSection}>
        {/* Profile */}
        <TouchableOpacity
          onPress={() => NavigationService.navigate("Account")}
        >
          <FastImage
            resizeMode="contain"
            source={
              userData?.profile_photo
                ? { uri: IMAGE_BASE_URL + userData?.profile_photo }
                : userIcon
            }
            style={styles.personImage}
          />
        </TouchableOpacity>

        {/* Logo */}
        <FastImage
          source={SuperStar}
          resizeMode="contain"
          style={styles.logo}
        />
      </View>

      {/* Right Section */}
      <View style={styles.rightSection}>
        {/* Wallet */}
        <TouchableOpacity onPress={() => NavigationService.navigate("Wallet")}>
          <LinearGradient
            colors={["#FFFFFF33", "#FFFFFF26"]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            style={styles.walletView}
          >
            <View style={styles.walletContent}>
              <View style={styles.walletIconBox}>
                <FastImage
                  style={styles.walletIcon}
                  resizeMode="contain"
                  source={WalletIcon}
                  tintColor="#3EAA35"
                />
              </View>
              <AppText
                style={styles.walletText}
                type={FORTEEN}
                weight={POPPINS_BOLD}
                color={BLACK}
              >
                ₹ {walletBalance}
              </AppText>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Search */}
        <TouchableOpacity style={styles.notifiView} onPress={onSearchPress}>
          <FastImage
            source={searchIcon}
            resizeMode="contain"
            style={styles.notificationIcon}
          />
        </TouchableOpacity>

        {/* Notifications */}
        {/* <TouchableOpacity style={styles.notifiView}>
          <FastImage
            source={iconbell}
            resizeMode="contain"
            style={styles.notificationIcon}
          />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 90,
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  // Left
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
  },
  personImage: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  logo: {
    width: 150,
    height: 200,
    // marginLeft: 20,
  },

  // Right
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  walletView: {
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    height: 35,
    backgroundColor: "#C1AA9926",
    borderWidth: 1.5,
    borderColor: "#C1AA9926",
  },
  walletContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  walletIconBox: {
    height: 28,
    width: 28,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#9F9F9F",
    backgroundColor: "#FFFFFF80",
  },
  walletIcon: {
    height: 15,
    width: 15,
  },
  walletText: {
    marginLeft: 10,
  },

  // Notification
  notifiView: {
    height: 28,
    width: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationIcon: {
    height: 28,
    width: 28,
  },
});
