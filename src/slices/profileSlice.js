import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  userData: undefined,
  ibatBalance: undefined,
  userWalletData: undefined,
  kycDetails: null,
  categories: [],
  posts: [],
  homePosts: [],
  myContest: [],
  aadharDetails: [],
  panDetails: [],
  depositTransactions: [],
  contestTransactions: [],
  withdrawalsTransactions: [],
  walletCreateData: undefined,
  SaveActivite: undefined,
  initGame: undefined,
  userWallet: undefined,
  paymentAuthToken: undefined,
  paymentDetails: undefined,
  paymentStatus: undefined,
  paymentSandBoxStatus: undefined,
  avatarList: [],
  remainingCashLimit: undefined,
  paymentInit: undefined,
  depositOffers: [],
  sanboxLinks: [],
  paymentType: undefined,
  userUPI: [],
  userBank: [],
  despositTransactions: [],
  lobbyTransactions: [],
  withdrawTransactions: [],
  tdsTransaction: [],
  gstTransaction: [],
  withdrawResponse: {},
  remainingInstantWithdraw: undefined,
  withdrawalFee: undefined,
  tdsPaid: undefined,
  bonusTransaction: [],
  leaderBoardTransaction: [],
  banStates: [],
  gstSettings: {},
  contestLeaderBoard: [],
};
export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUserData: (state, { payload }) => {
      state.userData = payload;
    },
    setIbatBalance: (state, { payload }) => {
      state.ibatBalance = payload;
    },
    setUserWalletData: (state, { payload }) => {
      state.userWalletData = payload;
    },
    setCategorires: (state, { payload }) => {
      state.categories = payload;
    },
    setHomePosts: (state, { payload }) => {
      state.homePosts = payload;
    },
    setPosts: (state, { payload }) => {
      state.posts = payload;
    },
    setMyContest: (state, { payload }) => {
      state.myContest = payload;
    },
    setKycDetails: (state, { payload }) => {
      state.kycDetails = payload;
    },
    setTransactionsDeposit: (state, { payload }) => {
      state.depositTransactions = payload;
    },
    setTransactionsContest: (state, { payload }) => {
      state.contestTransactions = payload;
    },
    setTransactionsWithdrawals: (state, { payload }) => {
      state.withdrawalsTransactions = payload;
    },
    setWalletCreate: (state, { payload }) => {
      state.walletCreateData = payload;
    },
    setActivite: (state, { payload }) => {
      state.SaveActivite = payload;
    },
    setAadharDetails: (state, { payload }) => {
      state.aadharDetails = payload;
    },
    setPanDetails: (state, { payload }) => {
      state.panDetails = payload;
    },
    setInitGame: (state, { payload }) => {
      state.initGame = payload;
    },
    setUserWallet: (state, { payload }) => {
      state.userWallet = payload;
    },
    setPaymentAuthToken: (state, {payload}) => {
      state.paymentAuthToken = payload
    },
    setPaymentInit: (state, {payload}) => {
      state.paymentInit = payload
    },
    setPaymentDetails: (state, {payload}) => {
      state.paymentDetails = payload
    },
    setPaymentStatus: (state, {payload}) => {
      state.paymentStatus = payload
    },
    setAvatarList: (state, {payload}) => {
      state.avatarList = payload
    },
    setRemainingCashLimit: (state, {payload}) => {
      state.remainingCashLimit = payload
    },
    setDepositOffers: (state, {payload}) => {
      state.depositOffers = payload
    },
    setSandboxLink: (state, {payload}) => {
      state.sanboxLinks = payload
    },
    setPaymentSandBoxStatus: (state, {payload}) => {
      state.paymentSandBoxStatus = payload
    },
    setPaymentType: (state, {payload}) => {
      state.paymentType = payload
    },
    setUserUPI: (state, {payload}) => {
      state.userUPI = payload
    },
    setUserBank: (state, {payload}) => {
      state.userBank = payload
    },
    setDepositTransactions: (state, {payload}) => {
      state.despositTransactions = payload
    },
    setLobbyTransactions: (state, {payload}) => {
      state.lobbyTransactions = payload;
    },
    setWithdrawTransactions: (state, {payload}) => {
      state.withdrawTransactions = payload;
    },
    setTdsTransactions: (state, {payload}) => {
      state.tdsTransaction = payload;
    },
    setGstTransaction: (state, {payload}) => {
      state.gstTransaction = payload;
    },
    setWithdrawResponse: (state, {payload}) => {
      state.withdrawResponse = payload;
    },
    setRemainingInstantWithdraw: (state, {payload}) => {
      state.remainingInstantWithdraw = payload;
    },
    setWithdrawalFee: (state, {payload}) => {
      state.withdrawalFee = payload;
    },
    setTdsPaid: (state, {payload}) => {
      state.tdsPaid = payload;
    },
    setBonusTransactions: (state, {payload}) => {
      state.bonusTransaction = payload;
    },
    setLeaderBoardTransactions: (state, {payload}) => {
      state.leaderBoardTransaction = payload;
    },
    setBanStates: (state, {payload}) => {
      state.banStates = payload;
    },
    setGstSettings: (state, {payload}) => {
      state.gstSettings = payload;
    },
    setContestLeaderBoard: (state, {payload}) => {
      state.contestLeaderBoard = payload;
    },
  },
});

export const {
  setUserData,
  setUserWalletData,
  setTransactionsDeposit,
  setTransactionsContest,
  setTransactionsWithdrawals,
  setKycDetails,
  setActivite,
  setWalletCreate,
  setAadharDetails,
  setPanDetails,
  setInitGame,
  setUserWallet,
  setPaymentAuthToken,
  setPaymentDetails,
  setPaymentStatus,
  setAvatarList,
  setRemainingCashLimit,
  setDepositOffers,
  setPaymentInit,
  setSandboxLink,
  setPaymentSandBoxStatus,
  setPaymentType,
  setUserUPI,
  setUserBank,
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
  setGstSettings,
  setCategorires,
  setPosts,
  setHomePosts,
  setMyContest,
  setContestLeaderBoard,
} = profileSlice.actions;

export default profileSlice.reducer;