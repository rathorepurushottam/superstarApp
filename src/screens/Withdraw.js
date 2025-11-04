import { Dimensions, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { AppSafeAreaView } from "../common/AppSafeAreaView";
import { KeyBoardAware } from "../common/KeyBoardAware";
import { colors } from "../theme/color";
import NavigationService from "../navigation/NavigationService";
import {
  AppText,
  BLACK,
  EIGHTEEN,
  FIFTEEN,
  FORTEEN,
  GRY,
  POPPINS_BOLD,
  POPPINS_SEMI_BOLD,
  TWELVE,
  TWENTY_FOUR,
} from "../common/AppText";
import Checkbox from "../common/checkbox";
import FastImage from "react-native-fast-image";
import { backIcon, bankIcon, upiIcon } from "../helper/images";
import PrimaryButton from "../common/PrimaryButton";
import { useSelector } from "react-redux";

const { width, height } = Dimensions.get("window");

const Withdraw = () => {
  const userWallet = useSelector((state) => {
    return state.profile.userWallet;
  });
  let { deposits, winnings, cashbackRewards, bonusRewards } = userWallet;
  let totalBalance = deposits + winnings + cashbackRewards + bonusRewards;
  return (
    <AppSafeAreaView style={{ flex: 1, backgroundColor: "#FEFEFE" }}>
      <KeyBoardAware>
        <View style={styles.mainView}>
          <TouchableOpacity
            onPress={() => NavigationService.goBack()}
            style={{
              marginTop: Platform.OS === "ios" ? height * 0.05 : height * 0.02,
            }}
          >
            <FastImage
              source={backIcon}
              resizeMode="contain"
              style={{ width: width * 0.07, height: width * 0.07 }}
              tintColor={colors.black}
            />
          </TouchableOpacity>

          <AppText
            color={BLACK}
            type={EIGHTEEN}
            weight={POPPINS_SEMI_BOLD}
            style={{ margin: 15 }}
          >
            Withdraw Winning
          </AppText>

          <View style={styles.balanceView}>
            <AppText color={BLACK} type={EIGHTEEN}>
              Your Balance
            </AppText>
            <AppText
              color={BLACK}
              type={TWENTY_FOUR}
              weight={POPPINS_BOLD}
              style={{ marginTop: 20 }}
            >
              ₹ {totalBalance}
            </AppText>
          </View>
          <View style={[styles.balanceView, { marginTop: 10 }]}>
            <AppText color={BLACK} type={FIFTEEN}>
              Enter your withdraw amount
            </AppText>
            <TextInput
              placeholder="₹ 0.00"
              placeholderTextColor={colors.black}
              style={styles.inputStyle}
              maxLength={10}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            {/* <AppText color={BLACK} type={SIXTEEN}>Recommended</AppText> */}
            <View style={styles.recommendView}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FastImage
                  source={bankIcon}
                  resizeMode="contain"
                  style={{ width: 25, height: 25 }}
                />
                <AppText
                  color={BLACK}
                  type={FIFTEEN}
                  style={{ marginLeft: 10 }}
                >
                  ICICI
                </AppText>
                <AppText color={GRY} type={TWELVE} style={{ marginLeft: 10 }}>
                  xxxxx2365
                </AppText>
              </View>
              <Checkbox
                style={{
                  borderRadius: 8,
                  borderColor: "#3EAA35",
                  borderWidth: 2,
                }}
              />
            </View>
            <View style={styles.recommendView}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FastImage
                  source={upiIcon}
                  resizeMode="contain"
                  style={{ width: 25, height: 25 }}
                />
                <AppText
                  color={BLACK}
                  type={FIFTEEN}
                  style={{ marginLeft: 10 }}
                >
                  UPI
                </AppText>
                <AppText color={GRY} type={TWELVE} style={{ marginLeft: 10 }}>
                  {" "}
                  UPI 99xxxxxxxx2942@UPI
                </AppText>
              </View>
              <Checkbox
                style={{
                  borderRadius: 8,
                  borderColor: "#3EAA35",
                  borderWidth: 2,
                }}
              />
            </View>
          </View>
          <PrimaryButton title={"Withdraw"} buttonStyle={{ marginTop: 50 }} />
        </View>
      </KeyBoardAware>
    </AppSafeAreaView>
  );
};

export default Withdraw;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginHorizontal: 20,
  },
  balanceView: {
    borderWidth: 1,
    borderColor: "#D3D3D3",
    backgroundColor: "#E0E0E0",
    borderRadius: 25,
    padding: 30,
  },
  inputStyle: {
    backgroundColor: "#E6E6E6",
    borderWidth: 1,
    borderColor: "#CFCFCF",
    borderRadius: 10,
    fontSize: 16,
    paddingLeft: 20,
    fontWeight: "500",
    marginVertical: 15,
    color: "#000",
  },
  recommendView: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#178EA90D",
    borderRadius: 20,
    padding: 12,
    marginTop: 10,
    justifyContent: "space-between",
  },
});
