import { StyleSheet, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { AppSafeAreaView } from "../common/AppSafeAreaView";
import { AppText, BLACK, EIGHTEEN, FIFTEEN, FORTEEN, GRY, POPPINS_SEMI_BOLD, SIXTEEN, TWELVE } from "../common/AppText";
import { KeyBoardAware } from "../common/KeyBoardAware";
import { colors } from "../theme/color";
import FastImage from "react-native-fast-image";
import { gpayIcon, paytmIcon, phonepeIcon } from "../helper/images";
import Checkbox from "../common/checkbox";
import LinearGradient from "react-native-linear-gradient";
import NavigationService from "../navigation/NavigationService";

const AddCash = () => {
  return (
    <AppSafeAreaView>
      <KeyBoardAware>
        <View style={styles.mainView}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="chevron-back" color={colors.black} size={25} onPress={() => NavigationService.goBack()}/>
            <AppText
              color={BLACK}
              type={EIGHTEEN}
              weight={POPPINS_SEMI_BOLD}
              style={{ margin: 15 }}
            >
              Add Cash
            </AppText>
          </View>
          <View style={styles.balanceView}>
            <AppText color={BLACK} type={EIGHTEEN}>
              Enter Amount
            </AppText>
            <TextInput
              placeholder="₹ 0.00"
              placeholderTextColor={colors.black}
              style={styles.inputStyle}
              maxLength={10}
            />
            <View style={{flexDirection: "row"}}>
                <View style={styles.suggestionbox}>
                    <AppText color={BLACK} type={TWELVE}>₹ 100</AppText>
                </View>
                <View style={styles.suggestionbox}>
                    <AppText color={BLACK} type={TWELVE}>₹ 200</AppText>
                </View>
                <View style={styles.suggestionbox}>
                    <AppText color={BLACK} type={TWELVE}>₹ 500</AppText>
                </View>
            </View>
          </View>
          <View style={{marginTop: 50}}>
            <AppText color={BLACK} type={SIXTEEN}>Recommended</AppText>
            <View style={styles.recommendView}>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                <FastImage source={gpayIcon} resizeMode="contain" style={{width: 25, height: 25}} />
                <AppText color={BLACK} type={FIFTEEN} style={{marginLeft: 10}}>Google Pay</AppText>
                </View>
               <Checkbox style={{borderRadius: 8, borderColor: '#3EAA35', borderWidth: 2}}/>
            </View>
            <View style={styles.recommendView}>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                <FastImage source={phonepeIcon} resizeMode="contain" style={{width: 25, height: 25}} />
                <AppText color={BLACK} type={FIFTEEN} style={{marginLeft: 10}}>Phonepe Pay</AppText>
                </View>
               <Checkbox style={{borderRadius: 8, borderColor: '#3EAA35', borderWidth: 2}}/>
            </View>
          </View>
          <View style={{marginTop: 10}}>
            <AppText color={BLACK} type={SIXTEEN}>Other</AppText>
            <View style={styles.recommendView}>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                <FastImage source={paytmIcon} resizeMode="contain" style={{width: 25, height: 25}} />
                <AppText color={BLACK} type={FIFTEEN} style={{marginLeft: 10}}>Paytm Wallet</AppText>
                </View>
              <LinearGradient colors={['#19B861', '#3EAA35']} start={{x: 1, y: 0}} end={{x: 0, y: 0}} style={styles.linkButton}>
                <AppText type={FORTEEN}>Link</AppText>
              </LinearGradient>
            </View>
          </View>
        </View>
      </KeyBoardAware>
    </AppSafeAreaView>
  );
};

export default AddCash;

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
suggestionbox: {
    borderWidth: 1,
    borderColor: "#A6A6A6",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 30,
    paddingVertical: 8,
    alignItems :"center",
    marginHorizontal: 5,
    borderRadius: 6
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
linkButton: {
    paddingHorizontal: 22,
    paddingVertical: 6,
    borderRadius: 20
}
});
