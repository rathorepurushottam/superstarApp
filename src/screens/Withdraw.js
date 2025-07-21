import { StyleSheet, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { AppSafeAreaView } from "../common/AppSafeAreaView";
import { KeyBoardAware } from "../common/KeyBoardAware";
import { colors } from "../theme/color";
import NavigationService from "../navigation/NavigationService";
import { AppText, BLACK, EIGHTEEN, FIFTEEN, FORTEEN, GRY, POPPINS_BOLD, POPPINS_SEMI_BOLD, TWELVE, TWENTY_FOUR } from "../common/AppText";
import Checkbox from "../common/checkbox";
import FastImage from "react-native-fast-image";
import { bankIcon, upiIcon } from "../helper/images";
import PrimaryButton from "../common/PrimaryButton";
import { useSelector } from "react-redux";

const Withdraw = () => {
  const userWallet = useSelector((state) => {
    return state.profile.userWallet;
  });
  let { deposits, winnings, cashbackRewards, bonusRewards } = userWallet;
  let totalBalance = deposits + winnings + cashbackRewards + bonusRewards;
  return (
    <AppSafeAreaView>
      <KeyBoardAware>
        <View style={styles.mainView}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon
              name="chevron-back"
              color={colors.black}
              size={25}
              onPress={() => NavigationService.goBack()}
            />
            <AppText
              color={BLACK}
              type={EIGHTEEN}
              weight={POPPINS_SEMI_BOLD}
              style={{ margin: 15 }}
            >
             Withdraw Winning
            </AppText>
          </View>
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
          <View style={[styles.balanceView, {marginTop: 10}]}>
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
          <View style={{marginTop: 10}}>
            {/* <AppText color={BLACK} type={SIXTEEN}>Recommended</AppText> */}
            <View style={styles.recommendView}>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                <FastImage source={bankIcon} resizeMode="contain" style={{width: 25, height: 25}} />
                <AppText color={BLACK} type={FIFTEEN} style={{marginLeft: 10}}>ICICI</AppText>
                <AppText color={GRY} type={TWELVE} style={{marginLeft: 10}}>xxxxx2365</AppText>
                </View>
               <Checkbox style={{borderRadius: 8, borderColor: '#3EAA35', borderWidth: 2}}/>
            </View>
            <View style={styles.recommendView}>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                <FastImage source={upiIcon} resizeMode="contain" style={{width: 25, height: 25}} />
                <AppText color={BLACK} type={FIFTEEN} style={{marginLeft: 10}}>UPI</AppText>
                <AppText color={GRY} type={TWELVE} style={{marginLeft: 10}}> UPI 99xxxxxxxx2942@UPI</AppText>
                </View>
               <Checkbox style={{borderRadius: 8, borderColor: '#3EAA35', borderWidth: 2}}/>
            </View>
          </View>
          <PrimaryButton title={'Withdraw'} buttonStyle={{marginTop: 50}}/>
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
    marginVertical: 15
},
recommendView: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#178EA90D",
    borderRadius: 20,
    padding: 12,
    marginTop: 10,
    justifyContent: "space-between"
},
});
