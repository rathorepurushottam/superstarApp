import { updateDeviceToken, userLogout } from "./authActions";
import { Dispatch } from "redux";
import { appOperation } from "../appOperation";
import { logError, toastAlert } from "../helper/utility";
// import NavigationService from '../navigation/NavigationService';
// import {
//   BOTTOM_NAVIGATION_STACK,
//   BOTTOM_TAB_PROFILE_SCREEN,
//   MY_BALANCE,
//   OTP,
// } from '../navigation/routes';
import { setLoading } from "../slices/authSlice";
import {
  setAvatarList,
  setKycDetails,
  setCategorires,
  setPosts,
  setHomePosts,
  setTransactionsDeposit,
  setRemainingCashLimit,
  setUserData,
  setAadharDetails,
  setPanDetails,
  setInitGame,
  setUserWallet,
  setContestCategories,
  setPaymentAuthToken,
  setPaymentStatus,
  setDepositOffers,
  setPaymentInit,
  setSandboxLink,
  setPaymentDetails,
  setPaymentType,
  setPaymentSandBoxStatus,
  setUserBank,
  setUserUPI,
  setDepositTransactions,
  setLobbyTransactions,
  setWithdrawTransactions,
  setTdsTransactions,
  setGstTransaction,
  setWithdrawResponse,
  setRemainingInstantWithdraw,
  setWithdrawalFee,
  setTdsPaid,
  setBonusTransactions,
  setLeaderBoardTransactions,
  setBanStates,
  setMyContest,
} from "../slices/profileSlice";
import {
  AUTHSTACK,
  BOTTOM_NAVIGATION_STACK,
  BOTTOM_TAB_HOMESCREEN,
  LOGIN,
  PROFILE_SCREEN,
  WEB_URL_SCREEN,
} from "../navigation/routes";
import NavigationService from "../navigation/NavigationService";
import { Linking, Vibration } from "react-native";
// import { setCreateWallet } from '../slices/matchSlice';

export const getUserProfile =
  (isNavigate, isUpdate = false) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await appOperation.customer.get_profile();
      // console.log(response, "getUserProfile");
      if (response?.status) {
        //   isNavigate ? NavigationService.reset(BOTTOM_NAVIGATION_STACK) : null;
        //   isUpdate ? NavigationService.navigate(BOTTOM_TAB_PROFILE_SCREEN) : null;
        // NavigationService.reset(BOTTOM_NAVIGATION_STACK);
        isNavigate ? null : NavigationService.reset(BOTTOM_NAVIGATION_STACK);
        dispatch(setUserData(response?.data?.user));
        // dispatch(updateDeviceToken());
      } else {
        NavigationService.reset(AUTHSTACK);
        // toastAlert.showToastError(response?.message);
      }
    } catch (e) {
      logError(e);
      NavigationService.reset(AUTHSTACK);
      toastAlert.showToastError(e?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };


  export const getCategories = () => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await appOperation.customer.get_categories();
      // console.log(res, "res");
      if (res?.status) {
        dispatch(setLoading(false));
        dispatch(setCategorires(res?.data));
      }
    } catch (e) {
      dispatch(setLoading(false));
      console.log("error in kycDetailsApi", e);
    } finally {
      dispatch(setLoading(false));
    }
  };

  export const getPostByCategories = (id) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await appOperation.customer.get_post_by_categories(id);
      console.log(res, "getPostByCategories");
      if (res?.status) {
        dispatch(setLoading(false));
        dispatch(setHomePosts(res?.data));
      }
    } catch (e) {
      dispatch(setLoading(false));
      console.log("error in getPostByCategories", e);
    } finally {
      dispatch(setLoading(false));
    }
  };

  export const getHomePosts = () => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await appOperation.customer.get_home_posts();
      // console.log(res, "getHomePosts");
      if (res?.status) {
        dispatch(setLoading(false));
        dispatch(setHomePosts(res?.data));
      }
    } catch (e) {
      dispatch(setLoading(false));
      console.log("error in getHomePosts", e);
    } finally {
      dispatch(setLoading(false));
    }
  };

  export const getPosts = () => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await appOperation.customer.get_posts();
      // console.log(res, "getPosts");
      if (res?.status) {
        dispatch(setLoading(false));
        dispatch(setPosts(res?.data));
      }
    } catch (e) {
      dispatch(setLoading(false));
      console.log("error in kycDetailsApi", e);
    } finally {
      dispatch(setLoading(false));
    }
  };

  export const getUserWallet = () => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await appOperation.customer.get_user_wallet();
      // console.log(res, "getUserWallet");
      if (res?.status) {
        dispatch(setUserWallet(res?.data?.wallet));
      }
    } catch (e) {
      console.log("error in getUserWallet", e);
    } finally {
      dispatch(setLoading(false));
    }
  };

  // export const getContestCategories = () => async (dispatch) => {
  //   try {
  //     dispatch(setLoading(true));
  //     const res = await appOperation.customer.get_contest_categories();
  //     // console.log(res, "getContestCategories");
  //     if (res?.status) {
  //       dispatch(setContestCategories(res?.data));
  //     }
  //   } catch (e) {
  //     console.log("error in getContestCategories", e);
  //   } finally {
  //     dispatch(setLoading(false));
  //   }
  // };
  
  export const getMyContest = () => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await appOperation.customer.get_my_contest();
      console.log(res, "getMyContest");
      if (res?.status) {
        dispatch(setMyContest(res?.data?.contests));
      }
    } catch (e) {
      console.log("error in getMyContest", e);
    } finally {
      dispatch(setLoading(false));
    }
  };

  export const getLiveContest = () => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await appOperation.customer.get_live_contest();
      console.log(res, "getLiveContest");
      if (res?.status) {
        dispatch(setMyContest(res?.data));
      }
    } catch (e) {
      console.log("error in getLiveContest", e);
    } finally {
      dispatch(setLoading(false));
    }
  };

  export const getUpcomingContest = () => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await appOperation.customer.get_upcoming_contest();
      console.log(res, "getUpcomingContest");
      if (res?.status) {
        dispatch(setMyContest(res?.data));
      }
    } catch (e) {
      console.log("error in getUpcomingContest", e);
    } finally {
      dispatch(setLoading(false));
    }
  };

  export const getCompletedContest = () => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await appOperation.customer.get_completed_contest();
      console.log(res, "getCompletedContest");
      if (res?.status) {
        dispatch(setMyContest(res?.data));
      }
    } catch (e) {
      console.log("error in getCompletedContest", e);
    } finally {
      dispatch(setLoading(false));
    }
  };

  export const toggleLike = (id) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await appOperation.customer.post_toggle_likes(id);
      // console.log(res, "response");
      dispatch(setLoading(false));
      if (res.code !== 200) {
        toastAlert.showToastError(res.message);
      } else {
        dispatch(getHomePosts());
      }
    } catch (e) {
      dispatch(setLoading(false));
      console.log("error in toggleLike", e);
    }
  };

  export const commentByUser = (data, close) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await appOperation.customer.commmet_by_user(data);
      // console.log(res, "commentByUser");
      dispatch(setLoading(false));
      if (res.status) {
        close();
        toastAlert.showToastError(res.message);
        dispatch(getHomePosts());
      } else {
        toastAlert.showToastError(res.message);
      }
    } catch (e) {
      dispatch(setLoading(false));
      console.log("error in commentByUser", e);
    }
  };

  export const kycVerification = (data) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await appOperation.customer.kyc_verification(data);
      // console.log('res:::', response);
      if (response?.status) {
        toastAlert.showToastError(response.message);
        dispatch(getUserProfile());
        NavigationService.navigate(PROFILE_SCREEN);
      } else {
        toastAlert.showToastError(response.message);
      }
    } catch (e) {
      // logger(e);
      console.log(e, 'error')
      // toastAlert.showToastError(e.message);
    } finally {
      dispatch(setLoading(false));
    }
  };


  export const createPost = (data, setIsOpen = () => {}) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await appOperation.customer.create_post(data);
      console.log('res:::', response);
      if (response?.status) {
        setIsOpen(true);
        // toastAlert.showToastError(response.message);
        dispatch(getPosts());
        NavigationService.navigate(BOTTOM_NAVIGATION_STACK);
      } else {
        toastAlert.showToastError(response.message);
      }
    } catch (e) {
      // logger(e);
      console.log(e, 'error')
      // toastAlert.showToastError(e.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getAadharOtp =
  (
    data,
    setRefId,
    onKycOtp = () => {},
    setSignFocus = () => {},
    setIsValid = () => {}
  ) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await appOperation.customer.get_aadhar_otp(data);
      if (response?.success) {
        setRefId(response?.refId);
        // toastAlert.showToastError(response?.message);
        onKycOtp();
      } else {
       
        setSignFocus(false);
        setIsValid(response?.message);
        // toastAlert.showToastError(response?.message);
      }
      // dispatch(getUserProfile(false, false));
    } catch (e) {
      dispatch(setLoading(false));
     
      logError(e, "getAadharOtp");
    } finally {
      dispatch(setLoading(false));
    }
  };
export const getKycDetails = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await appOperation.customer.getKycDetails();
    if (res?.success) {
      dispatch(setLoading(false));
      dispatch(setKycDetails(res?.data));
    }
  } catch (e) {
    dispatch(setLoading(false));
    console.log("error in kycDetailsApi", e);
  } finally {
    dispatch(setLoading(false));
  }
};

export const getBanStates = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await appOperation.customer.get_ban_state();
    if (res?.success) {
      dispatch(setLoading(false));
      dispatch(setBanStates(res?.data));
    }
  } catch (e) {
    dispatch(setLoading(false));
    console.log("error in getBanStates", e);
  } finally {
    dispatch(setLoading(false));
  }
};

export const getTransactions = (setFilterDepositData = () => {}, setFilterWithdrawData = () => {}) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await appOperation.customer.get_transactions();
    // console.log(res?.data, "getTransactions");
    if (res?.success) {
      dispatch(setLoading(false));
      dispatch(setDepositTransactions(res?.data?.depositTransactions));
      setFilterDepositData(res?.data?.depositTransactions);
      dispatch(setLobbyTransactions(res?.data?.pokerGameTransactions));
      dispatch(setWithdrawTransactions(res?.data?.withdrawalTransactions));
      setFilterWithdrawData(res?.data?.withdrawalTransactions);
      dispatch(setBonusTransactions(res?.data?.bonusTransactions));
      dispatch(setLeaderBoardTransactions(res?.data?.leaderBoardTransactions));
    }
  } catch (e) {
    dispatch(setLoading(false));
    console.log("error in getTransactions", e);
  } finally {
    dispatch(setLoading(false));
  }
};

export const getTdsTransactions = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await appOperation.customer.get_tds_transactions();
    // console.log(res, "getTdsTransactions");
    if (res?.success) {
      dispatch(setLoading(false));
      dispatch(setTdsTransactions(res?.data?.tdsReceipts));
      dispatch(setGstTransaction(res?.data?.gstReceipts));
    }
  } catch (e) {
    dispatch(setLoading(false));
    console.log("error in getTdsTransactions", e);
  } finally {
    dispatch(setLoading(false));
  }
};

export const getAvatarList = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await appOperation.customer.get_avatar_list();
    // console.log(res, "res");
    if (res?.success) {
      dispatch(setLoading(false));
      dispatch(setAvatarList(res?.data));
    }
  } catch (e) {
    dispatch(setLoading(false));
    console.log("error in getAvatarList", e);
  } finally {
    dispatch(setLoading(false));
  }
};



export const verifyPanNumber =
  (data, close = () => {}, setSignFocus = () => {}, setIsValid = () => {}) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await appOperation.customer.verifyPanNumber(data);
      if (res.success) {
        // toastAlert.showToastError('Pan Details Fetched');
        dispatch(setPanDetails(res.data));
        dispatch(getKycDetails());
        close();
      } else {
        setSignFocus(false);
        setIsValid(res?.message);
        // toastAlert.showToastError(res?.message);
      }
    } catch (e) {
      dispatch(setLoading(false));
      setIsValid(e?.message);
      console.log("error in Pan Number", e);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const submitUPI =
  (data, close = () => {}, setError = () => {}) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await appOperation.customer.submit_upi(data);
      if (res.success) {
        // dispatch(getKycDetails());
        dispatch(getUserPaymentMode());
        toastAlert.showToastError(res?.message);
        close();
      } else {
        setError(res?.message);
      }
    } catch (e) {
      dispatch(setLoading(false));
      console.log("error in submitUPI", e);
      setError(e?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const submitBank =
  (data, close = () => {}, setNumberError= () => {}) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await appOperation.customer.submit_bank(data);
      if (res.success) {
        // dispatch(getKycDetails());
        dispatch(getUserPaymentMode());
        toastAlert.showToastError(res?.message);
        close();
      } else {
        setNumberError(res?.message);
      }
    } catch (e) {
      dispatch(setLoading(false));
      console.log("error in submitBank", e);
      setNumberError(e?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const upateUserName =
  (data, setUserNError = () => {}) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await appOperation.customer.update_username(data);
      // console.log(res, "upateUserName");
      if (res.success) {
        let isNavigate = true;
        setUserNError("");
        toastAlert.showToastError(res.message);
        dispatch(getUserProfile(isNavigate));
      } else {
        // toastAlert.showToastError(res?.message);
        setUserNError(res?.message);
      }
    } catch (e) {
      dispatch(setLoading(false));
      setUserNError(e?.message);
      console.log("error upateUserName", e);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const upateProfile = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await appOperation.customer.update_profile(data);
    // console.log(res, "upateProfile");
    if (res.success) {
      let isNavigate = true;
      toastAlert.showToastError(res.message);
      dispatch(getUserProfile(isNavigate));
    } else {
      toastAlert.showToastError(res?.message);
    }
  } catch (e) {
    dispatch(setLoading(false));
    toastAlert.showToastError(e?.message);
    console.log("error upateProfile", e);
  } finally {
    dispatch(setLoading(false));
  }
};

export const upateTrackUser = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await appOperation.customer.track_user(data);
    // console.log(res, "res");
  } catch (e) {
    dispatch(setLoading(false));
    // toastAlert.showToastError(e?.message);
    console.log("error upateTrackUser", e);
  } finally {
    dispatch(setLoading(false));
  }
};

export const upateUserEmail =
  (data, onOpen = () => {}) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await appOperation.customer.update_email(data);
      // console.log(res, "upateUserEmail");
      if (res.success) {
        let isNavigate = true;
        toastAlert.showToastError(res.message);
        dispatch(getUserProfile(isNavigate));
        onOpen();
      } else {
        toastAlert.showToastError(res?.message);
      }
    } catch (e) {
      dispatch(setLoading(false));
      toastAlert.showToastError(e?.message);
      console.log("error upateUserEmail", e);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const resetPassword =
  (data, onCloseReset = () => {}, setError = () => {}, setIsOpen = () => {}) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await appOperation.customer.reset_password(data);
      console.log(response, "response");
      if (response?.success) {
        // toastAlert.showToastError(response?.message);
        setIsOpen(true);
        onCloseReset();
      } else {
        setError(response?.message);
      }
    } catch (e) {
      dispatch(setLoading(false));
      logError(e);
      setError(e?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const verifyKycOtp =
  (data, onCloseOtp = () => {}, setError) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await appOperation.customer.verifyKycOtp(data);
      dispatch(setLoading(false));
      if (res.success) {
        setError("");
        // toastAlert.showToastError("Aadhar Details Fetched");
        dispatch(setAadharDetails(res.data));
        dispatch(getKycDetails());
        onCloseOtp();
        //   NavigationService.navigate(MY_BALANCE);
      } else {
        toastAlert.showToastError(res.message);
        setError(res.message);
      }
    } catch (e) {
      dispatch(setLoading(false));
      console.log(e);
    } finally {
      dispatch(setLoading(false));
    }
  };
export const submitAadharDetails =
  (onClose = () => {}) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await appOperation.customer.submit_aadhar_details();
      if (res.success) {
        let isNavigate = true;
        toastAlert.showToastError(res?.message);
        dispatch(getUserProfile(isNavigate));
        dispatch(getKycDetails());
        onClose();
      } else {
        toastAlert.showToastError(res?.message);
      }
    } catch (e) {
      dispatch(setLoading(false));
      console.log("error in submitAadharDetails", e);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const submitPanDetails =
  (onClose = () => {}) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await appOperation.customer.submit_pan_details();
      if (res.success) {
        let isNavigate = true;
        toastAlert.showToastError(res?.message);
        dispatch(getUserProfile(isNavigate));
        dispatch(getKycDetails());
        onClose();
      } else {
        toastAlert.showToastError(res?.message);
      }
    } catch (e) {
      dispatch(setLoading(false));
      console.log("error in submitpanDetails", e);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const userLogOut =
  (onClose = () => {}) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await appOperation.customer.user_log_out();
      if (res.success) {
        // toastAlert.showToastError(res?.message);
        onClose();
        NavigationService.reset(AUTHSTACK);
      } else {
        toastAlert.showToastError(res?.message);
      }
    } catch (e) {
      dispatch(setLoading(false));
      console.log("error in userLogOut", e);
    } finally {
      dispatch(setLoading(false));
    }
  };
export const getTransactionsDeposit = (type) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await appOperation.customer.alltransactions(type);
    if (response?.success) {
      dispatch(setTransactionsDeposit(response?.data));
    }
  } catch (e) {
    logError(e);
  } finally {
    dispatch(setLoading(false));
  }
};

export const editProfile = (data, id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await appOperation.customer.editProfile(data, id);
    if (res?.code == 200) {
      toastAlert.showToastError(res?.message);
      dispatch(getUserProfile(false, true));
      //   NavigationService.reset(BOTTOM_NAVIGATION_STACK)
    }
    dispatch(setLoading(false));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};

export const revertTransaction = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await appOperation.customer.revert_transaction(data);
    console.log(res, "res");
    if (res?.code == 200) {
      toastAlert.showToastError(res?.message);
      dispatch(getTransactions());
    }
    dispatch(setLoading(false));
  } catch (e) {
    console.log(e);
    toastAlert.showToastError(e?.message);
  } finally {
    dispatch(setLoading(false));
  }
};

export const userWithdrawal =
  (data, onShowWithdrawStatus = () => {}) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await appOperation.customer.user_withdrawal(data);
      console.log(res, "userWithdrawal");
      if (res?.success) {
        // toastAlert.showToastError(res?.message);
        dispatch(getUserWallet());
        dispatch(setWithdrawResponse(res?.data));
        dispatch(getPaymentType());
        dispatch(getTransactions());
        onShowWithdrawStatus();
      }
      dispatch(setLoading(false));
    } catch (e) {
      console.log(e);
      toastAlert.showToastError(e?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  export const userStandardWithdrawal =
  (data, onShowWithdrawStatus = () => {}) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await appOperation.customer.user_standard_withdrawal(data);
      console.log(res, "userWithdrawal");
      if (res?.success) {
        // toastAlert.showToastError(res?.message);
        dispatch(getUserWallet());
        dispatch(setWithdrawResponse(res?.data));
        dispatch(getPaymentType());
        dispatch(getTransactions());
        onShowWithdrawStatus();
      }
      dispatch(setLoading(false));
    } catch (e) {
      console.log(e);
      toastAlert.showToastError(e?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const updateRemainingCashLimit =
  (
    data,
    setDesc = () => {},
    setIsOpen = () => {},
    onCloseGaming = () => {},
    setError = () => {}
  ) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await appOperation.customer.update_deposit_break(data);
      // console.log(res, "updateRemainingCashLimit");
      if (res.success) {
        setDesc(res?.message);
        setIsOpen(true);
        dispatch(getRemainingCashLimit());
        onCloseGaming();
        setError("");
      }
      dispatch(setLoading(false));
    } catch (e) {
      console.log(e);
      setError(e?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const updateTimeLimit =
  (
    data,
    setDesc = () => {},
    setIsOpen = () => {},
    onCloseGaming = () => {},
    setError = () => {}
  ) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await appOperation.customer.update_time_limt(data);
      // console.log(res, "updateTimeLimit");
      if (res.success) {
        setDesc(res?.message);
        setIsOpen(true);
        dispatch(getRemainingCashLimit());
        onCloseGaming();
        setError("");
      }
      dispatch(setLoading(false));
    } catch (e) {
      console.log(e);
      setError(e?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getInitGame = (type) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await appOperation.customer.get_init_game();
    if (res.success) {
      toastAlert.showToastError(res?.message);
      dispatch(setInitGame(res?.data));
      if (type === "cashGame") {
        NavigationService.navigate(WEB_URL_SCREEN, {
          title: "Cash Game",
          link: res?.data?.["redirect-url"] + "&page=tables",
        });
      } else {
        NavigationService.navigate(WEB_URL_SCREEN, {
          title: "Tournaments",
          link: res?.data?.["redirect-url"] + "&page=tournaments",
        });
      }
    } else {
      toastAlert.showToastError(res?.message);
    }
  } catch (e) {
    dispatch(setLoading(false));
    console.log("error in getInitGame", e);
  } finally {
    dispatch(setLoading(false));
  }
};

export const getUserWalletURL = () => async (dispatch) => {
  try {
    // dispatch(setLoading(true));
    const res = await appOperation.customer.get_user_wallet();
    if (res?.success) {
      // dispatch(setUserWallet(res?.data));
    }
  } catch (e) {
    console.log("error in getUserWalletURL", e);
  } finally {
    // dispatch(setLoading(false));
  }
};

export const getRemainingCashLimit = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await appOperation.customer.get_remaining_cash_limit();
    if (res?.success) {
      dispatch(setRemainingCashLimit(res?.data));
    }
  } catch (e) {
    dispatch(setLoading(false));
    console.log("error in kycDetailsApi", e);
  } finally {
    dispatch(setLoading(false));
  }
};

export const getDepositOffers = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await appOperation.customer.get_deposit_offers(data);
    // console.log(res, "getDepositOffers");
    if (res?.success) {
      dispatch(setDepositOffers(res?.data));
    }
  } catch (e) {
    dispatch(setLoading(false));
    console.log("error in getDepositOffers", e);
  } finally {
    dispatch(setLoading(false));
  }
};

export const getPaymentType = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await appOperation.customer.get_deposit_type(data);
    console.log(res, "getPaymentType");
    if (res?.success) {
      dispatch(setPaymentType(res?.data));
      dispatch(
        setRemainingInstantWithdraw(res?.data?.remainingInstantWithdrawals)
      );
      dispatch(setTdsPaid(res?.data?.tdsPaid));
      dispatch(setWithdrawalFee(res?.data?.withdrawalFee));
    }
  } catch (e) {
    dispatch(setLoading(false));
    console.log("error in getPaymentType", e);
    // if (e === 'Unauthorized Request') {
    //   dispatch(userLogOut());
    // }
  } finally {
    dispatch(setLoading(false));
  }
};

export const getUserPaymentMode = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await appOperation.customer.get_payment_type(data);
    if (res?.success) {
      dispatch(setUserBank(res?.data?.bank));
      dispatch(setUserUPI(res?.data?.upi));
    }
  } catch (e) {
    dispatch(setLoading(false));
    console.log("error in getUserPaymentMode", e);
  } finally {
    dispatch(setLoading(false));
  }
};

export const getPaymentAuthToken = (data, pay) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await appOperation.customer.get_payment_token(data);
    // console.log(res, "getPaymentAuthToken")
    if (res?.code == 200) {
      dispatch(setPaymentAuthToken(res?.authToken?.access_token));
      appOperation.setCustomerToken(res?.authToken?.access_token);
      let data = {
        amount: pay,
      };
      dispatch(getPaymentLink(data));
      //   NavigationService.reset(BOTTOM_NAVIGATION_STACK)
    }
    // dispatch(setLoading(false));
  } catch (e) {
    console.log(e);
    toastAlert.showToastError("Something went wrong please try again later");
  } finally {
    dispatch(setLoading(false));
  }
};

export const getPaymentInit =
  (
    data,
    handlePaymetOption,
    setIsOpenn = () => {},
    setDepositError = () => {}
  ) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await appOperation.customer.get_payment_init(data);
      console.log(res, "getPaymentInit");
      if (res?.success) {
        dispatch(setPaymentInit(res?.data));
        let data = {
          payment_method: {
            upi: {
              channel: "link",
              upi_id: "john@okxdfcbak",
              upi_redirect_url: true,
              upi_expiry_minutes: 10,
              authorize_only: false,
              authorization: {
                approve_by: "2025-02-28T10:20:12+05:30",
                start_time: "2025-02-28T10:20:12+05:30",
                end_time: "2025-02-28T10:20:12+05:30",
              },
            },
          },
          payment_session_id: res?.data?.payment_session_id,
        };
        dispatch(getSandboxOrders(data, handlePaymetOption));

        // dispatch(getPaymentLink(data));
        //   NavigationService.reset(BOTTOM_NAVIGATION_STACK)
      } else {
        setIsOpenn(true);
        setDepositError(res?.message);
      }
      // dispatch(setLoading(false));
    } catch (e) {
      console.log(e, "error");
      // toastAlert.showToastError("Something went wrong please try again later");
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getSandboxOrders =
  (data, handlePaymetOption) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await appOperation.customer.get_sandbox_order(data);
      // console.log(res, "getSandboxOrders");
      if (res?.code == 200) {
        dispatch(setSandboxLink(res?.data?.payload));
        handlePaymetOption();
        //   NavigationService.reset(BOTTOM_NAVIGATION_STACK)
      }
      // dispatch(setLoading(false));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getPaymentLink =
  (
    data,
    handlePaymetOption = () => {},
    setIsOpenn = () => {},
    setDepositError = () => {}
  ) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await appOperation.customer.get_payment_link(data);
      console.log(res, "getPaymentLink");
      if (res?.code === 200) {
        dispatch(setPaymentDetails(res));
        appOperation.setCustomerToken(res?.data?.token);
        handlePaymetOption();
      } else {
        setIsOpenn(true);
        setDepositError(res?.message);
      }
      // dispatch(setLoading(false));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setLoading(false));
    }
  };

  export const getPaymentState = (id, handlePaymentStatus) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      let attempts = 0;
      const maxRetries = 2; // Maximum retries
      const interval = 5000; // Poll every 5 seconds
  
      const pollStatus = async () => {
        try {
          const res = await appOperation.customer.get_payment_status(id);
          console.log(res, "getPaymentState");
          if (res?.code == 200) {
            dispatch(setPaymentStatus(res));
            
            // Check if payment reached a terminal state
            if (["Confirmed", "Cancelled"].includes(res?.transaction?.status)) {
              handlePaymentStatus();
              dispatch(setPaymentStatus(res));
             
              dispatch(getUserWallet());
              dispatch(setLoading(false));
              return; // Stop polling
            }
          } 
          attempts++;
          if (attempts >= maxRetries) {
            handlePaymentStatus();
            dispatch(setPaymentStatus(res));
            dispatch(setLoading(false));
            return;
          }
          // Continue polling after interval
          setTimeout(pollStatus, interval);
        } catch (e) {
          console.error("Error fetching payment status:", e);
          toastAlert.showToastError(e?.message);
          dispatch(setLoading(false));
        }
      };
  
      // Start polling
      pollStatus();
    } catch (e) {
      console.log(e);
      toastAlert.showToastError(e?.message);
      dispatch(setLoading(false));
    }
  };
  

// export const getPaymentState = (id, handlePaymetStatus) => async (dispatch) => {
//   try {
//     dispatch(setLoading(true));
//     // console.log('running');
//     const res = await appOperation.customer.get_payment_status(id);
//     // console.log(res?.transaction?.status, "getPaymentState");
//     if (res?.code == 200) {
//       dispatch(setPaymentStatus(res));
//       // if(res?.transaction?.status === "Pending"){
//       //   console.log("condtion");
//       //   setTimeout((ele=>{
//       //     console.log("1st timeeeee")
//       //     dispatch(getPaymentState(id, handlePaymetStatus));
//       //   }),5000);
//       //   // return;
//       // }
//       // console.log("out");
//       handlePaymetStatus();
//       // toastAlert.showToastError(res?.message);
//       dispatch(getUserWallet());
//     } else {
//       dispatch(setPaymentStatus(res));
//       handlePaymetStatus();
//       toastAlert.showToastError(res?.message);
//       dispatch(getUserWallet());
//     }
//     dispatch(setLoading(false));
//   } catch (e) {
//     console.log(e);
//     toastAlert.showToastError(e?.message);
//   } finally {
//     dispatch(setLoading(false));
//   }
// };

export const getPaymentSandboxState =
  (id, handlePaymetStatus) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await appOperation.customer.get_payment_sandbox_status(id);
      console.log(res, "getPaymentSandboxState");
      if (res?.success) {
        dispatch(setPaymentSandBoxStatus(res));
        handlePaymetStatus();
        toastAlert.showToastError(res?.message);
        dispatch(getUserWallet());
      } else {
        dispatch(setPaymentSandBoxStatus(res));
        handlePaymetStatus();
        toastAlert.showToastError(res?.message);
        dispatch(getUserWallet());
      }
      dispatch(setLoading(false));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setLoading(false));
    }
  };



  export const supportForUser = (data) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await appOperation.customer.support_for_user(data);
      // console.log(res, "commentByUser");
      // dispatch(setLoading(false));
      if (res.status) {
        toastAlert.showToastError(res.message);
        NavigationService.goBack();
      } else {
        toastAlert.showToastError(res.message);
      }
    } catch (e) {
      dispatch(setLoading(false));
      console.log("error in supportForUser", e);
    } finally {
      dispatch(setLoading(false));
    }
  };