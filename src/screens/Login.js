import { useEffect, useRef, useState } from "react";
import { ImageBackground, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppSafeAreaView } from "../common/AppSafeAreaView";
import { KeyBoardAware } from "../common/KeyBoardAware";
import { backgroundIcon, backgroundImg } from "../helper/images";
import { Screen, universalPaddingHorizontal } from "../theme/dimens";
import { colors } from "../theme/color";
import FastImage from "react-native-fast-image";
import { AppText, BOLD, FORTEEN, GOLDEN, ORANGE, POPPINS_BOLD, POPPINS_MEDIUM, POPPINS_REGULAR, RED, SEMI_BOLD, TEXTGREY, TWELVE, TWENTY_TWO } from "../common/AppText";
import InputBox from "../common/InputBox";
import PrimaryButton from "../common/PrimaryButton";
import Checkbox from "../common/checkbox";
import RBSheet from "react-native-raw-bottom-sheet";
import LoginWithPassword from "../common/LoginWithPassword";
import ReferCode from "../common/ReferCode";
import { toastAlert, validatePhoneNumber } from "../helper/utility";
import LoginOTP from "../common/LoginOTP";
import ForgotPassword from "../common/ForgotPassword";
import ResetPassword from "../common/ResetPassword";
import CustomModal from "../common/CustomModal";
import NavigationService from "../navigation/NavigationService";
import { BOTTOM_NAVIGATION_STACK, HOME_SCREEN_MAIN } from "../navigation/routes";
import { userSignup } from "../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import {PermissionsAndroid, Platform} from 'react-native';
import { SpinnerSecond } from "../common/SpinnerSecond";


const Login = () => {
  const dispatch = useDispatch();
    const refRBSheetLogin = useRef();
    const refRBSheetRefer = useRef();
    const refRBSheetForgot = useRef();
    const refRBSheetOTP = useRef();
    const refRBSheetPassword = useRef();
    const [phoneFocus, setPhoneFocus] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [isAgeSelected, setIsAgeSelected] = useState(true);
    const [isPromonSelected, setIsPromoSelected] = useState(true);
    const [isRememberSelected, setIsRememberSelected] = useState(true);
    const [isForgot, setIsForgot] = useState(false);
    const [referCode, setReferCode] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const loading = useSelector((state) => state.auth.loading);


  const handleOpenForgot = () => {
    refRBSheetLogin?.current?.close();
    refRBSheetForgot?.current?.open();
    setIsForgot(true);
    setOtp('');
  };

  const handleCloseForgot = () => {
    refRBSheetForgot?.current?.close();
    refRBSheetOTP?.current?.open();
    // setIsLogin(true);
  };
   useEffect(() => {requestCameraPermission()}, []);
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to your camera',
            buttonPositive: 'OK',
          },
        );
  
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission granted');
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };
  

    const handleOTP = () => {
        // if (locationAccess !== 'granted') {
        //   toastAlert.showToastError("Please allow location access to log in");
        //   return;
        // };
        if (!phoneNumber) {
          toastAlert.showToastError("Please enter Mobile Number");
          return;
        }
        if (!validatePhoneNumber(phoneNumber)) {
          toastAlert.showToastError("Please Enter Correct Mobile Number");
          return;
        }
        if (!isAgeSelected) {
          toastAlert.showToastError("Please click on terms and condtions");
          return;
          
        } 
        if (!isPromonSelected) {
          toastAlert.showToastError("Please click on Promtional SMS.");
          return;
        } 
        else {
          let number = parseInt(phoneNumber);
          let data = {
            mobile_number: number,
          };
    
          dispatch(userSignup(data, handleOtp));
          setPhoneNumber(number);
        }
    
        setIsForgot(false);
        setOtp('');
        handleOtp();
      };

      const handleResetPassword = () => {
        refRBSheetOTP?.current?.close();
        if (isForgot) {
          refRBSheetPassword?.current?.open();
        }
    
      };
    
      const handleOtp = () => {
        refRBSheetOTP?.current?.open();
      };
    

    const handleCloseRefer = () => {
        refRBSheetRefer.current.close();
      };
    
      const handleCloseLogin = () => {
        refRBSheetLogin.current.close();
      };
    
      const handleCloseResetPass = () => {
        refRBSheetPassword.current.close();
        refRBSheetLogin.current.open();
      };
    
      const handleCloseOtp = () => {
        refRBSheetOTP.current.close();
        if (isForgot) {
          refRBSheetForgot?.current?.close();
        } else {
          NavigationService.navigate(BOTTOM_NAVIGATION_STACK);
        }
      };

  return (
    <AppSafeAreaView>
      <KeyBoardAware>
        <ImageBackground
          source={backgroundImg}
          resizeMode="cover"
          style={styles.backImage}
        >
          <FastImage
            source={backgroundIcon}
            resizeMode="contain"
            style={{
              width: 200,
              height: 200,
              alignSelf: "center",
              marginTop: Screen.Height / 12,
            }}
          />
          <View style={styles.mainView}>
            <View
              style={{
                borderColor: "#6C6F7C",
                backgroundColor: "#6C6F7C",
                borderWidth: 2,
                width: "25%",
                alignSelf: "center",
                borderRadius: 10,
                marginVertical: 10,
              }}
            ></View>
            <AppText
              type={TWENTY_TWO}
              color={ORANGE}
              weight={POPPINS_BOLD}
              style={{ marginVertical: 15 }}
            >
              Login or Register
            </AppText>
            <InputBox
              placeholder={"Enter mobile number"}
              top
              phone
              keyboardType={'numeric'}
              textInputStyle={{ color: "white", fontSize: 16 }}
              onFocus={() => setPhoneFocus(true)}
              onBlur={() => setPhoneFocus(false)}
              containerStyle={{
                borderWidth: phoneFocus ? 1 : 0,
                borderColor: phoneFocus && "#FFFFFF26",
                borderRadius: 15
              }}
              maxLength={10}
              value={phoneNumber}
              onChange={setPhoneNumber}
              cursorColor={colors.white}
            />
            <View style={styles.referView}>
              <TouchableOpacity
                onPress={() => {
                  setReferCode('');
                  refRBSheetRefer.current.open();
                }}
              >
                <AppText
                  type={FORTEEN}
                  color={RED}
                  weight={POPPINS_MEDIUM}
                >
                  Referral Code?
                </AppText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => refRBSheetLogin.current.open()}
              >
                <AppText
                  type={FORTEEN}
                  color={ORANGE}
                  weight={POPPINS_REGULAR}
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: colors.orangeText,
                  }}
                >
                  Use Password?
                </AppText>
              </TouchableOpacity>
            </View>
            <PrimaryButton
              title={"Get OTP"}
              disabled={!phoneNumber || !isPromonSelected || !isAgeSelected || phoneNumber.length < 10}
              weight={POPPINS_MEDIUM}
              onPress={handleOTP}
            />
             <TouchableOpacity
              onPress={() => setIsAgeSelected(!isAgeSelected)}
              style={[styles.checkbox, {marginTop: 30}]}
            >
              <Checkbox
                onPress={() => setIsAgeSelected(!isAgeSelected)}
                value={isAgeSelected}
                style={{borderColor: colors.white}}
              />
              <View>
              <AppText
                type={TWELVE}
                color={TEXTGREY}
                weight={POPPINS_REGULAR}
                style={{ marginHorizontal: 10 }}
              >
                I certify that I am 18 years old and I agree to the 
              </AppText>
              <AppText
                  color={GOLDEN}
                  // onPress={() =>  NavigationService.navigate(SUB_MENU_SCREEN, {data: 'Terms & Conditions'})}
                  style={{
                    // borderBottomWidth: 1,
                    // borderBottomColor: colors.goldenColor,
                    // marginRight: 50,
                    textDecorationLine: "underline",
                    marginLeft: 12
                  }}
                >
                 Terms & Conditions
                </AppText>
              </View>
              
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsPromoSelected(!isPromonSelected)}
              style={styles.checkbox}
            >
              <Checkbox
                onPress={() => setIsPromoSelected(!isPromonSelected)}
                value={isPromonSelected}
                style={{borderColor: colors.white}}
              />
              <AppText
                type={TWELVE}
                weight={POPPINS_REGULAR}
                color={TEXTGREY}
                style={{ marginHorizontal: 10, lineHeight: 20 }}
              >
                Agree to receiving promotional & marketing emails/ SMS.
              </AppText>
            </TouchableOpacity>
          </View>
          
        </ImageBackground>
      </KeyBoardAware>
      <RBSheet
        ref={refRBSheetLogin}
        closeOnDragDown={true}
        height={450}
        customStyles={{
          container: {
            backgroundColor: colors.white,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          },
          draggableIcon: {
            backgroundColor: "transparent",
            display: "none",
          },
        }}
      >
        <LoginWithPassword
          setIsRememberSelected={setIsRememberSelected}
          isRememberSelected={isRememberSelected}
          onOpenForgot={handleOpenForgot}
          onCloseLogin={handleCloseLogin}
        />
      </RBSheet>
      <RBSheet
        ref={refRBSheetRefer}
        closeOnDragDown={true}
        height={250}
        customStyles={{
          container: {
            backgroundColor: colors.white,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          },
          draggableIcon: {
            backgroundColor: "transparent",
            display: "none",
          },
        }}
      >
        <ReferCode
         onCloseRefer={handleCloseRefer} setReferCode={setReferCode} referCode={referCode}
         />
      </RBSheet>
      <RBSheet
        ref={refRBSheetOTP}
        closeOnDragDown={true}
        height={280}
        customStyles={{
          container: {
            backgroundColor: colors.white,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          },
          draggableIcon: {
            backgroundColor: "transparent",
            display: "none",
          },
        }}
      >
        <LoginOTP
          onResetPassword={handleResetPassword}
          setOtp={setOtp}
          otp={otp}
          phoneNumber={phoneNumber}
          referCode={referCode}
          onCloseOtp={handleCloseOtp}
          isForgot={isForgot}
        />
      </RBSheet>
      <RBSheet
        ref={refRBSheetForgot}
        closeOnDragDown={true}
        height={280}
        customStyles={{
          container: {
            backgroundColor: colors.white,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          },
          draggableIcon: {
            backgroundColor: "transparent",
            display: "none",
          },
        }}
      >
        <ForgotPassword onCloseForgot={handleCloseForgot} setPhoneNumber={setPhoneNumber}/>
      </RBSheet>
      <RBSheet
        ref={refRBSheetPassword}
        closeOnDragDown={true}
        height={450}
        customStyles={{
          container: {
            backgroundColor: colors.white,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          },
          draggableIcon: {
            backgroundColor: "transparent",
            display: "none",
          },
        }}
      >
        <ResetPassword onCloseResetPass={handleCloseResetPass} signId={phoneNumber} otp={otp} setIsForgot={setIsForgot} setIsOpen={setIsOpen}/>
      </RBSheet>
      <CustomModal isOpen={isOpen} setIsOpen={setIsOpen} desc={'Your password has been successfully changed.'} title={'Success'}/>
      <SpinnerSecond loading={loading} />
    </AppSafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  backImage: {
    height: "100%",
    width: "100%",
  },
  mainView: {
    marginTop: 60,
    flex: 1,
    backgroundColor: colors.darkBlue,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: universalPaddingHorizontal,
  },
  referView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  checkbox: {
    flexDirection: "row",
    marginTop: 10,
  },
  bottomView: {
    marginTop: 10,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },
});
