import {
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import FastImage from "react-native-fast-image";
import {
  AppText,
  BLACK,
  FORTEEN,
  POPPINS_BOLD,
  POPPINS_SEMI_BOLD,
  TWELVE,
  WHITE,
} from "../AppText";
import { iconbell, threeIcon, userIcon, WalletIcon } from "../../helper/images";
import LinearGradient from "react-native-linear-gradient";
import { useSelector } from "react-redux";
import NavigationService from "../../navigation/NavigationService";
import { IMAGE_BASE_URL } from "../../helper/utility";

const Header = () => {
  const userWallet = useSelector((state) => {
    return state.profile.userWallet;
  });
  const userData = useSelector((state) => {
    return state.profile.userData;
  });
  // let { deposits, winnings, cashbackRewards, bonusRewards } = userWallet;
  // let totalBalance = deposits + winnings + cashbackRewards + bonusRewards;
  return (
    <View style={styles.topContainer}>
      <View style={{ width: "50%" }}>
        <TouchableOpacity>
          <FastImage
            resizeMode="contain"
            source={
              !userData?.profile_photo
                ? userIcon
                : { uri: IMAGE_BASE_URL + userData?.profile_photo }
            }
            style={styles.personImage}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "50%",
          alignItems: "center",
          gap: 10
        }}
      >
        <TouchableOpacity onPress={() => NavigationService.navigate("Wallet")}>
          <LinearGradient
            colors={["#FFFFFF33", "#FFFFFF26"]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            style={[styles.walletView]}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={styles.walletbox}>
                <FastImage
                  style={{ height: 15, width: 15 }}
                  resizeMode="contain"
                  source={WalletIcon}
                  tintColor={"#3EAA35"}
                />
              </View>
              <View>
                <AppText
                  style={{ marginLeft: 10 }}
                  type={FORTEEN}
                  weight={POPPINS_BOLD}
                  color={BLACK}
                >
                  ₹{" "}
                  {userWallet?.deposits +
                    userWallet?.winnings +
                    userWallet?.cashbackRewards +
                    userWallet?.bonusRewards}
                </AppText>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notifiView}>
          <FastImage
            source={iconbell}
            resizeMode="contain"
            style={styles.notificationIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  topContainer: {
    height: 90,
    width: "100%",
    paddingLeft: 20,
    paddingRight: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  personImage: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  combineIcon: {
    height: 35,
    width: 73,
    marginLeft: 85,
    marginTop: "8%",
  },
  notificationIcon: {
    height: 28,
    width: 28,
    right: 25,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 20,
  },
  walletView: {
    borderRadius: 59,
    flexDirection: "row",
    marginTop: 2,
    height: 35,
    backgroundColor: "#C1AA9926",
    borderWidth: 2,
    borderColor: "#C1AA9926",
    marginLeft: 30,
    width: 90,
  },
  walletbox: {
    height: 28,
    width: 28,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "#9F9F9F",
    backgroundColor: "#FFFFFF80",
  },
  belldot: {
    height: 4,
    width: 4,
    backgroundColor: "#EC536A",
    position: "absolute",
    borderRadius: 10,
  },
  notifiView: {
    height: 28,
    with: 28,
    marginRight: -8,
  },
});
