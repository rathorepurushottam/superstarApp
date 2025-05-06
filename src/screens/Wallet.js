import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { AppSafeAreaView } from "../common/AppSafeAreaView";
import {
  AppText,
  BLACK,
  EIGHTEEN,
  FIFTEEN,
  FORTEEN,
  GRY,
  POPPINS_BOLD,
  POPPINS_REGULAR,
  POPPINS_SEMI_BOLD,
  SIXTEEN,
  TWELVE,
  TWENTY_FOUR,
  WHITE,
} from "../common/AppText";
import { KeyBoardAware } from "../common/KeyBoardAware";
import { colors } from "../theme/color";
import NavigationService from "../navigation/NavigationService";
import { ADD_CASH_SCREEN, WITHDRAW_SCREEN } from "../navigation/routes";

const Wallet = () => {
  return (
    <AppSafeAreaView>
      <KeyBoardAware>
        <View style={styles.mainView}>
          <AppText
            color={BLACK}
            type={EIGHTEEN}
            weight={POPPINS_SEMI_BOLD}
            style={{ margin: 15 }}
          >
            Wallet
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
              ₹ 200
            </AppText>
          </View>
          <View style={{ marginTop: 30 }}>
            <View style={styles.box}>
              <View style={{ marginLeft: 10 }}>
                <AppText color={GRY} type={SIXTEEN} weight={POPPINS_REGULAR}>
                  Deposit
                </AppText>
                <AppText color={BLACK} type={TWENTY_FOUR} weight={POPPINS_BOLD}>
                  ₹ 0.00
                </AppText>
              </View>
              <TouchableOpacity
                style={[styles.addButton, { backgroundColor: "#3DB767" }]}
                onPress={() => NavigationService.navigate(ADD_CASH_SCREEN)}
              >
                <Icon name="add" color={colors.white} size={15} />
                <AppText color={WHITE} type={TWELVE} style={{ marginLeft: 5 }}>
                  Add Cash
                </AppText>
              </TouchableOpacity>
            </View>
            <View style={styles.box}>
              <View style={{ marginLeft: 10 }}>
                <AppText color={GRY} type={SIXTEEN} weight={POPPINS_REGULAR}>
                  Winning
                </AppText>
                <AppText color={BLACK} type={TWENTY_FOUR} weight={POPPINS_BOLD}>
                  ₹ 0.00
                </AppText>
              </View>
              <TouchableOpacity
                style={[styles.addButton, { backgroundColor: "#F29024" }]}
                onPress={() => NavigationService.navigate(WITHDRAW_SCREEN)}
              >
                <Icon name="arrow-down" color={colors.white} size={15} />
                <AppText color={WHITE} type={TWELVE} style={{ marginLeft: 5 }}>
                  Withdraw
                </AppText>
              </TouchableOpacity>
            </View>
            <View style={styles.box}>
              <View style={{ marginLeft: 10 }}>
                <AppText color={GRY} type={SIXTEEN} weight={POPPINS_REGULAR}>
                  Cashback Rewards
                </AppText>
                <AppText color={BLACK} type={TWENTY_FOUR} weight={POPPINS_BOLD}>
                  ₹ 9.00
                </AppText>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <AppText
                    color={GRY}
                    type={FORTEEN}
                    weight={POPPINS_REGULAR}
                    style={{ marginRight: 20 }}
                  >
                    Cashback Details
                  </AppText>
                  <Icon name="chevron-forward" color={colors.gray} size={15} />
                </View>
              </View>
            </View>
            <View style={[styles.box, { borderBottomWidth: 0 }]}>
              <View style={{ marginLeft: 10 }}>
                <AppText color={GRY} type={SIXTEEN} weight={POPPINS_REGULAR}>
                  Bonus Rewards
                </AppText>
                <AppText color={BLACK} type={TWENTY_FOUR} weight={POPPINS_BOLD}>
                  ₹ 9.00
                </AppText>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <AppText
                    color={GRY}
                    type={FORTEEN}
                    weight={POPPINS_REGULAR}
                    style={{ marginRight: 20 }}
                  >
                    Bonus Details
                  </AppText>
                  <Icon name="chevron-forward" color={colors.gray} size={15} />
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.transactionView}>
            <AppText color={BLACK} type={FORTEEN}>
              Transaction History
            </AppText>
            <Icon name="chevron-forward" color={colors.black} size={15} />
          </TouchableOpacity>
        </View>
      </KeyBoardAware>
    </AppSafeAreaView>
  );
};

export default Wallet;

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
  addButton: {
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    // justifyContent: "space-between"
    // height: 40
  },
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    marginTop: 18,
  },
  transactionView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 10,
    padding: 12,
    marginTop: 20,
  },
});
