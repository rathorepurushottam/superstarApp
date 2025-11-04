import React, { useState } from "react";
import { 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  View, 
  Platform, 
  ScrollView,
  Dimensions
} from "react-native";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";

import { AppSafeAreaView } from "../common/AppSafeAreaView";
import Checkbox from "../common/checkbox";
import { KeyBoardAware } from "../common/KeyBoardAware";

import {
  AppText,
  BLACK,
  EIGHTEEN,
  FIFTEEN,
  FORTEEN,
  GRY,
  POPPINS_SEMI_BOLD,
  SIXTEEN,
  TWELVE,
} from "../common/AppText";

import { colors } from "../theme/color";
import { backIcon, gpayIcon, paytmIcon, phonepeIcon } from "../helper/images";
import NavigationService from "../navigation/NavigationService";

const { width, height } = Dimensions.get("window");

const AddCash = () => {
  const [amount, setAmount] = useState("");
  const [selectedPayment, setSelectedPayment] = useState(null);

  const suggestions = [100, 200, 500];

  const handlePaymentSelect = (method) => setSelectedPayment(method);

  return (
    <AppSafeAreaView style={{ flex: 1, backgroundColor: "#FEFEFE" }}>
      <KeyBoardAware>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => NavigationService.goBack()}
            style={{ marginTop: Platform.OS === "ios" ? height * 0.05 : height * 0.02 }}
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
            style={{ marginVertical: height * 0.02 }}
          >
            Add Cash
          </AppText>

          {/* Enter Amount */}
          <View style={styles.balanceView}>
            <AppText color={BLACK} type={EIGHTEEN}>
              Enter Amount
            </AppText>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              placeholder="₹ 0.00"
              placeholderTextColor={colors.black}
              style={styles.inputStyle}
              maxLength={10}
              keyboardType="numeric"
            />
            <View style={{ flexDirection: "row", marginTop: height * 0.01 }}>
              {suggestions.map((amt) => (
                <TouchableOpacity
                  key={amt}
                  style={styles.suggestionbox}
                  onPress={() => setAmount(amt.toString())}
                >
                  <AppText color={BLACK} type={TWELVE}>
                    ₹ {amt}
                  </AppText>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Recommended Payment Methods */}
          <AppText color={BLACK} type={SIXTEEN} style={{ marginTop: height * 0.03 }}>
            Recommended
          </AppText>

          <View style={styles.recommendView}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FastImage source={gpayIcon} resizeMode="contain" style={styles.iconStyle} />
              <AppText color={BLACK} type={FIFTEEN} style={{ marginLeft: width * 0.02 }}>
                Google Pay
              </AppText>
            </View>
            <Checkbox
              checked={selectedPayment === "gpay"}
              onPress={() => handlePaymentSelect("gpay")}
              style={{
                borderRadius: 8,
                borderColor: "#3EAA35",
                borderWidth: 2,
              }}
            />
          </View>

          <View style={styles.recommendView}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FastImage source={phonepeIcon} resizeMode="contain" style={styles.iconStyle} />
              <AppText color={BLACK} type={FIFTEEN} style={{ marginLeft: width * 0.02 }}>
                PhonePe
              </AppText>
            </View>
            <Checkbox
              checked={selectedPayment === "phonepe"}
              onPress={() => handlePaymentSelect("phonepe")}
              style={{
                borderRadius: 8,
                borderColor: "#3EAA35",
                borderWidth: 2,
              }}
            />
          </View>

          {/* Other Payment */}
          <AppText color={BLACK} type={SIXTEEN} style={{ marginTop: height * 0.02 }}>
            Other
          </AppText>

          <View style={styles.recommendView}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FastImage source={paytmIcon} resizeMode="contain" style={styles.iconStyle} />
              <AppText color={BLACK} type={FIFTEEN} style={{ marginLeft: width * 0.02 }}>
                Paytm Wallet
              </AppText>
            </View>
            <TouchableOpacity onPress={() => console.log("Link Paytm")}>
              <LinearGradient
                colors={["#19B861", "#3EAA35"]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                style={styles.linkButton}
              >
                <AppText type={FORTEEN} color="#fff">
                  Link
                </AppText>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyBoardAware>
    </AppSafeAreaView>
  );
};

export default AddCash;

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: width * 0.05,
    paddingBottom: height * 0.05,
  },
  balanceView: {
    borderWidth: 1,
    borderColor: "#D3D3D3",
    backgroundColor: "#E0E0E0",
    borderRadius: width * 0.06,
    padding: width * 0.06,
  },
  inputStyle: {
    backgroundColor: "#E6E6E6",
    borderWidth: 1,
    color: "#000",
    borderColor: "#CFCFCF",
    borderRadius: width * 0.025,
    fontSize: width * 0.04,
    paddingLeft: width * 0.05,
    fontWeight: "500",
    marginVertical: height * 0.02,
  },
  suggestionbox: {
    borderWidth: 1,
    borderColor: "#A6A6A6",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: width * 0.07,
    paddingVertical: height * 0.010,
    alignItems: "center",
    marginHorizontal: width * 0.012,
    borderRadius: width * 0.015,
  },
  recommendView: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#178EA90D",
    borderRadius: width * 0.05,
    padding: width * 0.03,
    marginTop: height * 0.015,
    justifyContent: "space-between",
  },
  linkButton: {
    paddingHorizontal: width * 0.06,
    paddingVertical: height * 0.008,
    borderRadius: width * 0.05,
  },
  iconStyle: {
    width: width * 0.06,
    height: width * 0.06,
  },
});
