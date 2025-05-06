import { useEffect, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";

import {
  AppText,
  BLACK,
  BLUE,
  BOTTOMTEXT,
  DISABLETEXT,
  FORTEEN,
  POPPINS_BOLD,
  POPPINS_MEDIUM,
  POPPINS_SEMI_BOLD,
  RED,
  TWELVE,
  TWENTY,
} from "./AppText";
import { colors } from "../theme/color";
import FastImage from "react-native-fast-image";
import { timerIcon } from "../helper/images";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   otpVerification,
//   phoneOtpVerification,
//   userSignup,
// } from "../actions/authActions";
// import { SpinnerSecond } from "./SnipperSecond";
import { universalPaddingHorizontal } from "../theme/dimens";
import {
  getHash,
  removeListener,
  startOtpListener,
} from "react-native-otp-verify";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NavigationService from "../navigation/NavigationService";
import { HOME_SCREEN_MAIN } from "../navigation/routes";

const LoginOTP = ({
  otp,
  setOtp,
  phoneNumber,
  referCode,
  onCloseOtp,
  isForgot,
  onResetPassword,
  isChange,
  oldNumber,
}) => {
//   const dispatch = useDispatch();
//   const loading = useSelector((state) => {
//     return state.auth.isLoading;
//   });
  const [timer, setTimer] = useState(30);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState("");
  const [isCorrect, setIsCorrect] = useState(true);
  const [error, setError] = useState("");
  const [hash, setHash] = useState("");
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    // Check if a timer exists on app load
    const initializeTimer = async () => {
      const storedStartTime = await AsyncStorage.getItem('otpStartTime');
      if (storedStartTime) {
        const elapsedTime = Math.floor((Date.now() - parseInt(storedStartTime, 10)) / 1000);
        const remainingTime = 300 - elapsedTime; // 300 seconds = 5 minutes
        if (remainingTime > 0) {
          setTimer(remainingTime);
          setIsButtonDisabled(true);
        }
      }
    };

    initializeTimer();
  }, []);

  const handleResendOTP = async () => {
    if (attempts <= 4) {
      setTimer(30); // Reset the timer
      // setIsButtonDisabled(true);
      // let number = parseInt(phoneNumber);
      let number = phoneNumber.includes("@") ? phoneNumber : parseInt(phoneNumber);
      console.log(number, "number");
      let data = {
        signId: isChange ? oldNumber : number,
        type: isForgot
          ? "changePassword"
          : isChange
          ? "changePhone"
          : "loginOtp",
        newNumber: isChange ? number : "",
      };
    //   dispatch(userSignup(data));
    } else {
      const startTime = Date.now();
      await AsyncStorage.setItem("otpStartTime", startTime.toString());
      setError('OTP limit has exceeded');
      setTimer(300);
    }
    setAttempts((prevAttempts) => prevAttempts + 1);
    setIsButtonDisabled(true);
  };

  useEffect(() => {
    getHash()
      .then((hashArray) => {
        if (hashArray && hashArray.length > 0) {
          setHash(hashArray[0]);
          console.log(hashArray[0], "hash");
        }
      })
      .catch((error) => {
        setError(`Error getting hash: ${error.message}`);
      });

    startOtpListener((receivedMessage) => {
      setMessage(receivedMessage);
      console.log(receivedMessage, "receivedMessage");
      const otpMatch = /(\d{6})/g.exec(receivedMessage);
      console.log(otpMatch, "otpMatch");
      if (otpMatch && otpMatch[1]) {
        const extractedOtp = otpMatch[1];
        setOtp(extractedOtp);
        // setCode(extractedOtp);
        onSubmit(extractedOtp);
      }
    })
      .then(() => setIsListening(true))
      .catch((error) => {
        setError(`Error starting listener: ${error.message}`);
      });

    return () => {
      removeListener();
      setIsListening(false);
    };
  }, []);

  const onSubmit = async (otpCode) => {
    const verificationCode = otpCode || otp;
    if (verificationCode.length !== 6) {
      console.log(verificationCode, "verificationCode");
      toastAlert.showToastError("Please provide a valid OTP");
    } else {
      let otp = parseInt(verificationCode);
      // let number = parseInt(phoneNumber);
      let number = phoneNumber.includes("@") ? phoneNumber : parseInt(phoneNumber);
      let _data = {
        signId: number,
        otp: otp,
        refCode: referCode,
      };
      NavigationService.navigate(HOME_SCREEN_MAIN);
    //   {
    //     isChange
    //       ? dispatch(
    //           phoneOtpVerification(
    //             {
    //               signId: oldNumber,
    //               otp: otp,
    //               type: "changePhone",
    //               newNumber: number,
    //             },
    //             onCloseOtp,
    //             setError
    //           )
    //         )
    //       : dispatch(otpVerification(_data, onCloseOtp, setError, isChange));
    //   }
    }
  };

  useEffect(() => {
    let interval;
    if (isButtonDisabled && timer > 0) {
      // Start the countdown
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      // Enable the button when timer reaches 0
      setIsButtonDisabled(false);
      AsyncStorage.removeItem("otpStartTime");
    }

    return () => clearInterval(interval); // Clean up the interval on unmount or re-render
  }, [timer, isButtonDisabled]);

  function maskNumber(number) {
    const str = number.toString();
    const masked = str.slice(0, 2) + "******" + str.slice(-2);
    return masked;
  };

  function maskEmail(email) {
    const [localPart, domain] = email.split('@');
    const firstChar = localPart[0];
    const lastChars = localPart.slice(-2);
    const maskedLocalPart = `${firstChar}****${lastChars}`;
    return `${maskedLocalPart}@${domain}`;
  }

  const handleForgotFlow = (code) => {
    console.log(otp?.length, "otp?.length");
    // let number = parseInt(phoneNumber);
    let number = phoneNumber.includes("@") ? phoneNumber : parseInt(phoneNumber);
    let otp = parseInt(code);
    onResetPassword();
    // dispatch(
    //   phoneOtpVerification(
    //     { signId: number, otp: otp, type: "changePassword" },
    //     onCloseOtp,
    //     setError,
    //     isForgot,
    //     onResetPassword
    //   )
    // );
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
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
        Verification
      </AppText>
      <View style={styles.menuView}>
        <AppText type={FORTEEN} color={BLACK} weight={POPPINS_MEDIUM}>
          OTP has sent to {phoneNumber.includes("@") ? maskEmail(phoneNumber) :  maskNumber(phoneNumber)}
        </AppText>
        <TouchableOpacity onPress={onCloseOtp}>
          <AppText type={FORTEEN} color={BLACK} weight={POPPINS_MEDIUM}>
            Change
          </AppText>
        </TouchableOpacity>
      </View>

      <OtpInput
        numberOfDigits={6}
        focusColor={colors.darkBlue}
        focusStickBlinkingDuration={500}
        onTextChange={(text) => setOtp(text)}
        onFilled={(code) => {
          // onCloseOtp();
          if (isForgot) {
                  handleForgotFlow(code);
                } else {
                  onCloseOtp();
                }

        }}
        // onFilled={(code) => {
        //   if (code.length === 6) {
        //     // let number = parseInt(phoneNumber);
        //     let number = phoneNumber.includes("@") ? phoneNumber : parseInt(phoneNumber);
        //     if (isForgot) {
        //       handleForgotFlow(code);
        //     } else {
        //       let otp = parseInt(code);
        //       let _data = {
        //         signId: number,
        //         otp: otp,
        //         refCode: referCode,
        //       };
        //       {
        //         isChange
        //           ? dispatch(
        //               phoneOtpVerification(
        //                 {
        //                   signId: oldNumber,
        //                   otp: otp,
        //                   type: "changePhone",
        //                   newNumber: number,
        //                 },
        //                 onCloseOtp,
        //                 setError
        //               )
        //             )
        //           : dispatch(
        //               otpVerification(_data, onCloseOtp, setError, isChange)
        //             );
        //       }
        //     }
        //   }
        // }}
        autoFocus={true}
        textInputProps={{
          accessibilityLabel: "One-Time Password",
        }}
        theme={{
          containerStyle: styles.otpContainer,
          pinCodeContainerStyle: !error
            ? styles.underlineStyleBase
            : styles.errorUnderlineStyleBase,
          pinCodeTextStyle: styles.pinCodeText,
          focusStickStyle: error && styles.errorUnderlineStyleBase,
          focusedPinCodeContainerStyle: error ? styles.errorUnderlineStyleBase : styles.underlineStyleHighLighted,
        }}
      />
      {error && (
        <AppText
          type={TWELVE}
          color={RED}
          style={{
            marginVertical: 5,
            paddingHorizontal: universalPaddingHorizontal,
            // textAlign: "center",
          }}
          weight={POPPINS_SEMI_BOLD}
        >
          {error}
        </AppText>
      )}

      <View style={[styles.menuView, { marginTop: 10 }]}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 1,
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {isButtonDisabled && (
              <>
                <FastImage
                  source={timerIcon}
                  resizeMode="contain"
                  tintColor={colors.black}
                  style={{ width: 15, height: 15, marginRight: 3 }}
                />
                <AppText
                  //  onPress={onResend}
                  type={FORTEEN}
                  color={BOTTOMTEXT}
                  weight={POPPINS_SEMI_BOLD}
                >
                  {/* {`00:${timer}`} */}
                  {formatTime(timer)}
                </AppText>
              </>
            )}
          </View>

          <TouchableOpacity
            onPress={handleResendOTP}
            disabled={isButtonDisabled}
          >
            <AppText
              //  onPress={onResend}
              type={FORTEEN}
              color={isButtonDisabled ? DISABLETEXT : BOTTOMTEXT}
              weight={POPPINS_SEMI_BOLD}
            >
              Resend OTP
            </AppText>
          </TouchableOpacity>
          {/* <SecondaryButton title={'Resend OTP'}/> */}
        </View>
      </View>
      {/* <SpinnerSecond loading={loading} /> */}
    </View>
  );
};

export default LoginOTP;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  underlineStyleBase: {
    width: 46,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#F5F5F5",
    color: colors.black,
    borderWidth: 1,
    borderColor: "#E4E4E4",
  },
  errorUnderlineStyleBase: {
    width: 46,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#F5F5F5",
    color: colors.black,
    borderWidth: 1,
    borderColor: colors.lightRed,
  },
  underlineStyleHighLighted: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.darkBlue,
    textAlign: "center",
  },
  menuView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: universalPaddingHorizontal,
  },
  otpContainer: {
    width: "100%",
    alignSelf: "center",
    marginTop: 20,
    height: 50,
    paddingHorizontal: universalPaddingHorizontal,
  },
  pinCodeText: {
    fontFamily: POPPINS_BOLD,
    color: colors.darkBlue,
    fontSize: 18,
  },
});