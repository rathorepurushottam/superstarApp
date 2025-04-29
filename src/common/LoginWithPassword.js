import { StyleSheet, TouchableOpacity, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

import {
  AppText,
  BLACK,
  BLUE,
  BOTTOMTEXT,
  FORTEEN,
  INTER_MEDIUM,
  INTER_REGULAR,
  INTER_SEMI_BOLD,
  LIGHTBLUE,
  POPPINS_MEDIUM,
  POPPINS_SEMI_BOLD,
  RED,
  TWELVE,
  TWENTY,
  WHITE,
} from "./AppText";
import InputBox from "./InputBox";
import { universalPaddingHorizontal } from "../theme/dimens";
import { colors } from "../theme/color";
// import { TouchableOpacityView } from "./TouchableOpacityView";
import Checkbox from "./checkbox";
import PrimaryButton from "./PrimaryButton";
import { useEffect, useRef, useState } from "react";
// import ForgotPassword from "./ForgotPassword";
import {
  toastAlert,
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from "../helper/utility";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUsingPassword } from "../actions/authActions";
// import { SpinnerSecond } from "./SnipperSecond";
// import { setUserData } from "../slices/profileSlice";
// import { setUserName, setUserPassword } from "../slices/authSlice";
// import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginWithPassword = ({
  setIsRememberSelected,
  isRememberSelected,
  onOpenForgot,
  onCloseLogin,
}) => {
//   const dispatch = useDispatch();
//   const loading = useSelector((state) => {
//     return state.auth.isLoading;
//   });
  const [showPass, setShowPass] = useState(true);
  const [signId, setSignId] = useState("");
  const [password, setPassword] = useState("");
  const [signFocus, setSignFocus] = useState(false);
  const [passFocus, setPassFocus] = useState(false);
  const [validPass, setValidPass] = useState(true);
  const [error, setError] = useState("");

//   useEffect(() => {
//     handleGetCredentails();
//   }, []);

//   const handleGetCredentails = async () => {
//     const signId = await AsyncStorage.getItem("userName");
//     const password = await AsyncStorage.getItem("password");
//     setSignId(signId);
//     setPassword(password);
//   };

  const handleLoginUsingPassword = () => {
    if (!signId) {
      // toastAlert.showToastError("Please enter Email or Mobile Number");
      setError("Please enter Email or Mobile Number");
      return;
    }
    if (signId.includes("@")) {
      if (!validateEmail(signId)) {
        // toastAlert.showToastError("Please Enter Correct Mobile Number");
        setError("Please Enter Correct Email Id");
        return;
      }
    } else if (!validatePhoneNumber(signId)) {
      // toastAlert.showToastError("Please Enter Correct Mobile Number");
      setError("Please Enter Correct Mobile Number");
      return;
    }

    if (!password) {
      setPassFocus(false);
      setValidPass(false);
      // toastAlert.showToastError("Please enter password");
      setError("Please enter password");
      return;
    }
    if (password?.length < 8) {
      setPassFocus(false);
      setValidPass(false);
      setError('Password should be 8 characters long')
      // toastAlert.showToastError("Invalid password format.");
      return;
    }
    // if (isRememberSelected) {
    //   AsyncStorage.setItem("userName", signId);
    //   AsyncStorage.setItem("password", password);
    // } else {
    //   AsyncStorage.removeItem("userName");
    //   AsyncStorage.removeItem("password");
    // }
    // let number = signId.includes("@") ? signId : parseInt(signId);
    // let data = {
    //   password: password,
    //   signId: number,
    // };

    // dispatch(loginUsingPassword(data, onCloseLogin, setError));
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
        Login via Password
      </AppText>
      <InputBox
        placeholder={"Email or mobile"}
        top
        placeholderTextColor={"#00000066"}
        textInputStyle={{
          borderWidth: 1,
          borderColor: signFocus ? "#FD6666" : "#E4E4E4",
          borderRadius: 12,
          backgroundColor: "#F5F5F5",
          height: 55,
        }}
        style={{ paddingHorizontal: universalPaddingHorizontal }}
        onFocus={() => setSignFocus(true)}
        onBlur={() => setSignFocus(false)}
        onChange={(value) => setSignId(value)}
        value={signId}
        cursorColor={colors.black}
      />
      <InputBox
        placeholder={"Password"}
        top
        placeholderTextColor={"#00000066"}
        textInputStyle={{
          borderWidth: 1,
          borderColor: !error
            ? passFocus
              ? "#FD6666"
              : !validPass
              ? "red"
              : "#E4E4E4"
            : "red",
          borderRadius: 12,
          backgroundColor: "#F5F5F5",
          marginTop: 25,
          height: 55,
        }}
        style={{ paddingHorizontal: universalPaddingHorizontal }}
        onFocus={() => setPassFocus(true)}
        onBlur={() => setPassFocus(false)}
        value={password}
        onChange={(value) => setPassword(value)}
        isPassword={true}
        secureTextEntry={showPass}
        onToggle={() => setShowPass(!showPass)}
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
      <View style={[styles.referView, { marginTop: !error ? 60 : 20 }]}>
        <TouchableOpacity
          onPress={() => setIsRememberSelected(!isRememberSelected)}
          style={styles.checkbox}
        >
          <Checkbox
            onPress={() => setIsRememberSelected(!isRememberSelected)}
            value={isRememberSelected}
            // style={{ borderColor: colors.black, marginRight: 10 }}
            innerStyle={{ backgroundColor: colors.black , borderRadius: 3}}
            login
          />
          <AppText
            type={FORTEEN}
            color={BOTTOMTEXT}
            weight={POPPINS_MEDIUM}
            style={{ marginLeft: 10 }}
          >
            Remember me
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity onPress={onOpenForgot}>
          <AppText type={FORTEEN} color={BOTTOMTEXT} weight={POPPINS_MEDIUM}>
            Forgot Password?
          </AppText>
        </TouchableOpacity>
      </View>
      <PrimaryButton
        title={"Login"}
        weight={INTER_MEDIUM}
        disabled={!signId || !password}
        buttonStyle={{
          marginTop: 40,
          paddingHorizontal: universalPaddingHorizontal,
        }}
        onPress={handleLoginUsingPassword}
      />
      {/* <SpinnerSecond loading={loading} /> */}
    </View>
  );
};

export default LoginWithPassword;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    paddingHorizontal: universalPaddingHorizontal,
  },
  referView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: universalPaddingHorizontal,
  },
  checkbox: {
    flexDirection: "row",
    // marginTop: 30,
  },
});