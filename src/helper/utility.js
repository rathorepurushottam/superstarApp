import { Share, ToastAndroid } from "react-native";
import { poppinsBold } from "../theme/typography";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_TOKEN_KEY } from "../libs/constant";
import { appOperation } from "../appOperation";

export const BASE_URL = "http://103.110.127.91:3333/";
// export const BASE_URL = 'http://192.168.29.86:3333/';

export const IMAGE_BASE_URL = "http://103.110.127.91:3333/public";

export const onAppStart = async (store) => {
  try {
    const customerToken = await AsyncStorage.getItem(USER_TOKEN_KEY);
    appOperation.setCustomerToken(customerToken);
  } catch (error) {
    console.log(error);
  }
};

export const toastAlert = {
  // showToastSuccess: (message, duration = 2500) => { },
  showToastError: (message, duration = 2500) => {
    Platform.OS == "ios"
      ? Toast.show({
          type: "success",
          text1: "SuperStar",
          text2: `${message}`,
          text2Style: { fontSize: 12, fontFamily: poppinsBold },
          text1Style: { fontFamily: poppinsBold },
        })
      : ToastAndroid.show(message, ToastAndroid.BOTTOM, ToastAndroid.LONG);
  },
};

export const validatePhoneNumber = (phoneNumber) => {
  const expression = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
  return expression.test(phoneNumber);
};

export const validateEmail = (email) => {
  const expression =
    /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

  return expression.test(email);
};

export const validateAadharNumber = (num) => {
  const expression =
    /^([0-9]{4}[0-9]{4}[0-9]{4}$)|([0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|([0-9]{4}-[0-9]{4}-[0-9]{4}$)/i;

  return expression.test(num);
};

export const validatePanNumber = (num) => {
  const expression = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/i;

  return expression.test(num);
};

export const validateIfsc = (num) => {
  const expression = /^[A-Z]{4}0[A-Z0-9]{6}$/i;

  return expression.test(num);
};

export const validateUpiId = (num) => {
  const expression = /^[0-9A-Za-z.-]{2,256}@[A-Za-z]{2,64}$/i;

  return expression.test(num);
};

export const validatePassword = (value) => {
  const expression =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i;

  return expression.test(value);
};

export const logError = (error) => {
  console.log(error);
};

export function formatNumber(num) {
  if (num >= 100000) {
    // Convert to Lakh (L)
    return (num / 100000)?.toFixed(2)?.replace(/\.00$/, "") + "L";
  } else if (num >= 1000) {
    // Convert to Thousand (K)
    return (num / 1000)?.toFixed(2)?.replace(/\.00$/, "") + "K";
  }
  return num?.toString(); // Return as is for smaller numbers
}

export const shareToAny = () => {
  const shareOptions = {
    message: `🚀 Check out this amazing post!  

I thought you’d love it — watch the video and let me know what you think.  
🔥 Don’t miss it!  
`,
  };
  try {
    Share.share(shareOptions);
  } catch (error) {
    console.log(error);
  }
};

export const shareProfile = () => {
  const shareOptions = {
    message: `🚀 Check out this amazing my profile!  

I thought you’d love it — watch the video and let me know what you think.  
🔥 Don’t miss it!  
`,
  };
  try {
    Share.share(shareOptions);
  } catch (error) {
    console.log(error);
  }
};

// export const shareMessage = code => {
//   let temp = `Join through my referral link, and we’ll both score some awesome rewards! 💰\n\n1. Download the PokerTales app from here: https://pokertales.com/download-apk/${code}\n2. Get ₹25 Bonus Instantly.\n\n Let’s play and have fun!`;
//   return temp;
// };

export function timeDifference(date) {
  if (!(date instanceof Date) || isNaN(date)) {
    return "Invalid Time";
  }

  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  // return timeRange = `${formatTime(startDate)} - ${formatTime(endDate)}`;
}
