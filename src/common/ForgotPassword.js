import { useState } from "react";
import { StyleSheet, View } from "react-native";
import PrimaryButton from "./PrimaryButton";
import {
  AppText,
  BLACK,
  BLUE,
  POPPINS_MEDIUM,
  POPPINS_SEMI_BOLD,
  RED,
  TWELVE,
  TWENTY,
} from "./AppText";
import InputBox from "./InputBox";
import {
  toastAlert,
  validateEmail,
  validatePhoneNumber,
} from "../helper/utility";
// import { forgotPassword, userSignup } from "../actions/authActions";
// import { useDispatch, useSelector } from "react-redux";
// import { SpinnerSecond } from "./SnipperSecond";
import { universalPaddingHorizontal } from "../theme/dimens";
import { colors } from "../theme/color";

const ForgotPassword = ({ onCloseForgot, setPhoneNumber }) => {
//   const dispatch = useDispatch();
//   const loading = useSelector((state) => {
//     return state.auth.isLoading;
//   });
  const [signId, setSignId] = useState("");
  const [signFocus, setSignFocus] = useState(false);
  const [error, setError] = useState("");

  const handleForgotPassword = () => {
    if (!signId) {
      toastAlert.showToastError("Please enter Email or Mobile Number");
      setError("Please enter Email or Mobile Number");
      return;
    }

    if (signId.includes("@")) {
      if (!validateEmail(signId)) {
        toastAlert.showToastError("Please Enter Correct Email Id");
        setError("Please Enter Correct Email Id");
        return;
      }
    } else if (!validatePhoneNumber(signId)) {
      toastAlert.showToastError("Please Enter Correct Mobile Number");
      setError("Please Enter Correct Mobile Number");
      return;
    }
    let number = signId.includes("@") ? signId : parseInt(signId);
    onCloseForgot();
    // let data = {
    //   signId: number,
    //   type: "changePassword",
    // };
    // setPhoneNumber(number);

    // dispatch(userSignup(data, onCloseForgot, setError));
  };
  return (
    <View styles={styles.mainView}>
      <View
        style={{
          borderColor: "#5E6272",
          backgroundColor: "#5E6272",
          borderWidth: 2,
          width: "20%",
          alignSelf: "center",
          borderRadius: 10,
          marginVertical: 10,
        }}
      ></View>
      <AppText
        type={TWENTY}
        color={BLACK}
        style={{
          marginVertical: 15,
          paddingHorizontal: universalPaddingHorizontal,
        }}
        weight={POPPINS_SEMI_BOLD}
      >
        Forgot Password
      </AppText>
      <InputBox
        placeholder={"Email or Phone"}
        top
        placeholderTextColor={"#00000066"}
        textInputStyle={{
          borderWidth: 1,
          borderColor: error
            ? colors.lightRed
            : signFocus
            ? "#FD6666"
            : "#E4E4E4",
          borderRadius: 12,
          backgroundColor: "#F5F5F5",
          height: 55,
        }}
        keyboardType={"default"}
        style={{ paddingHorizontal: universalPaddingHorizontal }}
        onFocus={() => setSignFocus(true)}
        onBlur={() => setSignFocus(false)}
        onChange={(value) => setSignId(value)}
        value={signId}
        cursorColor={colors.black}
      />

      {error && (
        <AppText
          type={TWELVE}
          color={RED}
          style={{
            marginTop: 10,
            paddingHorizontal: universalPaddingHorizontal,
            // textAlign: "center",
          }}
          weight={POPPINS_SEMI_BOLD}
        >
          {error}
        </AppText>
      )}

      <PrimaryButton
        title={"Get OTP"}
        weight={POPPINS_MEDIUM}
        disabled={!signId}
        buttonStyle={{
          marginTop: 20,
          paddingHorizontal: universalPaddingHorizontal,
        }}
        onPress={handleForgotPassword}
      />
      {/* <SpinnerSecond loading={loading} /> */}
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
});