import { StyleSheet, TouchableOpacity, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

import {
  AppText,
  BLACK,
  BLUE,
  BOTTOMTEXT,
  FORTEEN,
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
  POPPINS_SEMI_BOLD,
  LIGHTBLUE,
  MENUTEXT,
  TWENTY,
  WHITE,
} from "./AppText";
import InputBox from "./InputBox";
import { universalPaddingHorizontal } from "../theme/dimens";
import { colors } from "../theme/color";
// import { TouchableOpacityView } from "./TouchableOpacityView";
import Checkbox from "./checkbox";
import PrimaryButton from "./PrimaryButton";
import { useRef, useState } from "react";
import ForgotPassword from "./ForgotPassword";
import { toastAlert, validatePassword } from "../helper/utility";
// import { useDispatch, useSelector } from "react-redux";
// import { forgotPassword, userSignup } from "../actions/authActions";
// import { SpinnerSecond } from "./SnipperSecond";

const ResetPassword = ({
  onCloseResetPass,
  signId,
  otp,
  setIsForgot,
  isProfile,
  setResetPasswords,
  setIsOpen,
}) => {
//   const dispatch = useDispatch();
//   const loading = useSelector((state) => {
//     return state.auth.isLoading;
//   });
  const [showPass, setShowPass] = useState(false);
  const [showConfPass, setShowConfPass] = useState(true);
  // const [showCurrentPass, setShowCurrentPass] = useState(true);
  const [newPassFocus, setNewPassFocus] = useState(false);
  const [conPassFocus, setConPassFocus] = useState(false);
  // const [currentPassFocus, setCurrentPassFocus] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  // const [currentPass, setCurrentPass] = useState("");
  const [validPass, setValidPass] = useState(false);

  const handleResetPassword = () => {
    if (!newPassword) {
      toastAlert.showToastError("Please enter New Password");
      return;
    }
    if (!confirmPass) {
      toastAlert.showToastError("Please enter Confirm Password");
      return;
    }
    if (newPassword?.length < 7 && confirmPass?.length < 7) {
      toastAlert.showToastError(
        "Your password must be at least 8 characters long"
      );
      return;
    }
    if (confirmPass !== newPassword) {
      toastAlert.showToastError(
        "New Password and Confirm Password does not Match!"
      );
      return;
    }
    // if (isProfile) {
    //   if (!currentPass) {
    //     toastAlert.showToastError(
    //       "Please Enter current Password"
    //     );
    //     return;
    //   }
    //   if(currentPass === newPassword) {
    //     toastAlert.showToastError(
    //       "New Password should be not same as Current Password"
    //     );
    //     return;
    //   }
    // }
    // if (isProfile) {
    //   setResetPasswords({
    //     newPassword: newPassword,
    //     confirmPass: confirmPass,
    //     // currentPass: currentPass,
    //   });
    //   let data = {
    //     signId: signId,
    //     type: "changePassword",
    //   };
    //   dispatch(userSignup(data, onCloseResetPass));
    // } else {
    //   setIsForgot(false);
    //   let data = {
    //     otp: parseInt(otp),
    //     newPassword: newPassword,
    //     confirmPassword: confirmPass,
    //     signId: signId,
    //   };
    //   dispatch(forgotPassword(data, onCloseResetPass, setIsOpen));
    // }
    setIsOpen(true);
    onCloseResetPass();
  };

  const handleValidatPass = (value) => {
    console.log(value, "value");
    setNewPassword(value);
    value?.length > 7 ? setValidPass(true) : setValidPass(false);
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
        New Password
      </AppText>
      {/* {isProfile && (
        <InputBox
          placeholder={"Enter Old Password"}
          top
          placeholderTextColor={"#00000066"}
          textInputStyle={{
            borderWidth: 1,
            borderColor: currentPassFocus ? "#1251AE" : "#E4E4E4",
            borderRadius: 12,
            backgroundColor: "#F5F5F5",
            height: 55,
          }}
          style={{ paddingHorizontal: universalPaddingHorizontal, marginVertical: 10 }}
          value={currentPass}
          onChange={(value) => setCurrentPass(value)}
          onBlur={() => setCurrentPassFocus(false)}
          onFocus={() => setCurrentPassFocus(true)}
          isPassword={true}
          secureTextEntry={showCurrentPass}
          onToggle={() => setShowCurrentPass(!showCurrentPass)}
          cursorColor={colors.black}
        />
      )} */}

      <InputBox
        placeholder={"Enter New Password"}
        top
        placeholderTextColor={"#00000066"}
        
        textInputStyle={{
          borderWidth: 1,
          borderColor: newPassFocus
            ? "#FD6666"
            : validPass
            ? colors.green
            : "#E4E4E4",
          borderRadius: 12,
          backgroundColor: "#F5F5F5",
          height: 55,
        }}
        style={{ paddingHorizontal: universalPaddingHorizontal }}
        value={newPassword}
        onChange={(value) => handleValidatPass(value)}
        onBlur={() => setNewPassFocus(false)}
        onFocus={() => setNewPassFocus(true)}
        isPassword={true}
        secureTextEntry={showPass}
        onToggle={() => setShowPass(!showPass)}
        cursorColor={colors.black}
      />
      <View style={styles.referView}>
        <AppText type={FORTEEN} color={BLACK} weight={POPPINS_MEDIUM}>
          Password must contain at least
        </AppText>

        <TouchableOpacity style={styles.checkbox}>
          <View style={styles.conditionView}>
            {!validPass ? (
              <Checkbox
                value={true}
                style={{ borderColor: colors.darkBlue, borderRadius: 20 }}
                innerStyle={{
                  backgroundColor: colors.darkBlue,
                  borderRadius: 20,
                }}
                login
              />
            ) : (
              <Checkbox
                value={true}
                style={{ borderColor: colors.green, borderRadius: 20 }}
                innerStyle={{
                  backgroundColor: colors.green,
                  borderRadius: 20,
                }}
                login
              />
            )}

            <AppText color={MENUTEXT} style={{ marginLeft: 10 }}>
              8-20 Characters Long
            </AppText>
          </View>
        </TouchableOpacity>
      </View>
      <InputBox
        placeholder={"Enter Confirm New Password"}
        top
        placeholderTextColor={"#00000066"}
        textInputStyle={{
          borderWidth: 1,
          borderColor: conPassFocus ? "#FD6666" : "#E4E4E4",
          borderRadius: 12,
          backgroundColor: "#F5F5F5",
          marginTop: 15,
          height: 55,
        }}
        style={{ paddingHorizontal: universalPaddingHorizontal }}
        value={confirmPass}
        onChange={(value) => setConfirmPass(value)}
        onBlur={() => setConPassFocus(false)}
        onFocus={() => setConPassFocus(true)}
        isPassword={true}
        secureTextEntry={showConfPass}
        onToggle={() => setShowConfPass(!showConfPass)}
        cursorColor={colors.black}
      />

      <PrimaryButton
        title={"Submit"}
        weight={POPPINS_MEDIUM}
        disabled={!newPassword || !confirmPass || newPassword !== confirmPass}
        onPress={handleResetPassword}
        buttonStyle={{
          marginTop: 50,
          paddingHorizontal: universalPaddingHorizontal,
        }}
      />
      {/* <SpinnerSecond loading={loading} /> */}
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  referView: {
    // flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    paddingHorizontal: universalPaddingHorizontal,
  },
  checkbox: {
    flexDirection: "column",
    marginTop: 10,
  },
  conditionView: {
    flexDirection: "row",
    marginVertical: 5,
  },
});