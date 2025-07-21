import { CUSTOMER_TYPE } from "../../types";

export default (appOperation) => ({
  log_out: (data) => appOperation.post(`client_logout`, data, CUSTOMER_TYPE),
  get_profile: () =>
    appOperation.get(`profile/getProfile`, undefined, undefined, CUSTOMER_TYPE),
  get_categories: () =>
    appOperation.get(`category/get-all-categories`, undefined, undefined, CUSTOMER_TYPE),
  get_post_by_categories: (id) =>
    appOperation.get(`post/get-posts-by-category/${id}`, undefined, undefined, CUSTOMER_TYPE),
   get_posts: () =>
    appOperation.get(`post/get-all-posts`, undefined, undefined, CUSTOMER_TYPE),
   get_home_posts: () =>
    appOperation.get(`home/get-home-feeds`, undefined, undefined, CUSTOMER_TYPE),
   get_user_wallet: () =>
    appOperation.get(`wallet/getWallet`, undefined, undefined, CUSTOMER_TYPE),
   post_toggle_likes: (id) =>
    appOperation.post(`post/toggle-post-like/${id}`, {}, CUSTOMER_TYPE),
   commmet_by_user: (data) =>
    appOperation.post(`post/add-comment`, data, CUSTOMER_TYPE),
   get_my_contest: () =>
    appOperation.get(`contest/get-my-contests`, undefined, undefined, CUSTOMER_TYPE),
   get_live_contest: () =>
    appOperation.get(`contest/get-live-contests`, undefined, undefined, CUSTOMER_TYPE),
   get_upcoming_contest: () =>
    appOperation.get(`contest/get-upcoming-contests`, undefined, undefined, CUSTOMER_TYPE),
   get_completed_contest: () =>
    appOperation.get(`contest/get-completed-contests`, undefined, undefined, CUSTOMER_TYPE),
   kyc_verification: (data) =>
    appOperation.patch(`profile/updateBasicInfo`, data, CUSTOMER_TYPE),
   create_post: (data) =>
    appOperation.post(`post/create-post`, data, CUSTOMER_TYPE),
  get_aadhar_otp: (data) =>
    appOperation.post(`kyc/get-aadhar-otp`, data, CUSTOMER_TYPE),
  walletcreate: (id) =>
    appOperation.post(`wallet/create-wallet?user=${id}`, {}, CUSTOMER_TYPE),
  getKycDetails: () =>
    appOperation.get(`kyc/get-kyc`, undefined, undefined, CUSTOMER_TYPE),
  get_ban_state: () =>
    appOperation.get(`kyc/banStates`, undefined, undefined, CUSTOMER_TYPE),
  get_transactions: () =>
    appOperation.get(`transactions`, undefined, undefined, CUSTOMER_TYPE),
  get_tds_transactions: () =>
    appOperation.get(`transactions/gstTdsCertificate`, undefined, undefined, CUSTOMER_TYPE),
  get_avatar_list: () =>
    appOperation.get(`admin/avatar-list`, undefined, undefined, CUSTOMER_TYPE),
  sendKycOtp: (data) =>
    appOperation.post(`user/send-kyp-otp`, data, CUSTOMER_TYPE),
  
  verifyKycOtp: (data) =>
    appOperation.post(`kyc/verify-aadhar-otp`, data, CUSTOMER_TYPE),
  submit_aadhar_details: (data) =>
    appOperation.post(`kyc/submit-aadhar-kyc`, data, CUSTOMER_TYPE),
  submit_pan_details: (data) =>
    appOperation.post(`kyc/submit-pan-kyc`, data, CUSTOMER_TYPE),
  user_log_out: (data) =>
    appOperation.post(`user/log-out`, data, CUSTOMER_TYPE),
  uploadImg: (data) => appOperation.post(`upload`, data, CUSTOMER_TYPE),
  getSeriesData: () =>
    appOperation.post("TeamData/Serieslist", {}, CUSTOMER_TYPE),
  phone_otp_verify: (data) =>
    appOperation.post(`user/verify-otp`, data, CUSTOMER_TYPE),
  email_otp_verify: (data) =>
    appOperation.post(`user/update-email`, data, CUSTOMER_TYPE),
  editProfile: (data, id) =>
    appOperation.put(`user/update-profile?user=${id}`, data, CUSTOMER_TYPE),
  alltransactions: (type) =>
    appOperation.post(`user/transactions/${type}`, {}, CUSTOMER_TYPE),
  getAllContest: (matchId, contestId) =>
    appOperation.get(
      `match/contests/${matchId}/${contestId}`,
      undefined,
      undefined,
      CUSTOMER_TYPE
    ),
  getIntro: () =>
    appOperation.get("intro", undefined, undefined, CUSTOMER_TYPE),
  getMyTeam: (id) =>
    appOperation.get(
      `match/my-teams/${id}`,
      undefined,
      undefined,
      CUSTOMER_TYPE
    ),
  getAllPlayers: (id, data) =>
    appOperation.post(`match/all-players/${id}`, data, CUSTOMER_TYPE),
  player_detail: (id) =>
    appOperation.get(
      `match/player-profile/${id}`,
      undefined,
      undefined,
      CUSTOMER_TYPE
    ),
  match_reminder: (data) =>
    appOperation.post(`user/save-match-reminders`, data, CUSTOMER_TYPE),
  otherUserProfile: (data) =>
    appOperation.get(
      `user/getprofile?user_id=${data}`,
      undefined,
      undefined,
      CUSTOMER_TYPE
    ),
  upiVerifiy: (data) =>
    appOperation.post(`user/upiverifcation`, data, CUSTOMER_TYPE),
  phonePeGetway: (data) =>
    appOperation.post(`payment/gateway`, data, CUSTOMER_TYPE),
  phonePeGetwayTest: (data) =>
    appOperation.post(`paymenttest/gateway`, data, CUSTOMER_TYPE),

  adharverify: (data) =>
    appOperation.post(`user/verify_adhar`, data, CUSTOMER_TYPE),
  share_url: (id) =>
    appOperation.get(
      `match/share-team/${id}`,
      undefined,
      undefined,
      CUSTOMER_TYPE
    ),
  getMyJoinedContest: (id) =>
    appOperation.get(
      `match/my-contests/${id}`,
      undefined,
      undefined,
      CUSTOMER_TYPE
    ),
  saveTeam: (data) =>
    appOperation.post(`match/create-team`, data, CUSTOMER_TYPE),
  editTeam: (data) =>
    appOperation.put(`match/update-team`, data, CUSTOMER_TYPE),
  refresh_token: () =>
    appOperation.get(`user/refresh-token`, undefined, undefined, CUSTOMER_TYPE),
  fcm_token: (data) =>
    appOperation.post(`user/save-firebase-token`, data, CUSTOMER_TYPE),
  getPrizeList: (id) =>
    appOperation.get(
      `match/winner-prizes/${id}`,
      undefined,
      undefined,
      CUSTOMER_TYPE
    ),
  getPrizeListPrivate: (id, privateis) =>
    appOperation.get(
      `match/winner-prizes/${id}/${privateis}`,
      undefined,
      undefined,
      CUSTOMER_TYPE
    ),
  joinContest: (data) =>
    appOperation.post(`match/join-contest`, data, CUSTOMER_TYPE),

  getMyMatchesData: (status) =>
    appOperation.get(
      `match/list?status=${status}&limit=100&skip=0`,
      undefined,
      undefined,
      CUSTOMER_TYPE
    ),
  createContest: (newData) =>
    appOperation.post(
      `match/usercontest/${newData?.matchid1}`,
      newData?.data1,
      CUSTOMER_TYPE
    ),
  getMyCreateContest: (id) =>
    appOperation.get(
      `match/myusercontest/${id}`,
      undefined,
      undefined,
      CUSTOMER_TYPE
    ),
  joinContestUserPri: (data) =>
    appOperation.post(`match/joinuserContest`, data, CUSTOMER_TYPE),
  share_Team: (data) =>
    appOperation.get(
      `match/share-team/${data?.newId}/${data?.second}/${data?.matchid}`,
      undefined,
      undefined,
      CUSTOMER_TYPE
    ),
  getMyShareCreateContest: (id, category) =>
    appOperation.get(
      `match/sharedcontest/${id}?contest_category_id=${category}`,
      undefined,
      undefined,
      CUSTOMER_TYPE
    ),
  share_Team_Data: (data) =>
    appOperation.get(
      `match/matchedata/${data?.first}/${data?.second}`,
      undefined,
      undefined,
      CUSTOMER_TYPE
    ),
  addharSendOtp: (data) =>
    appOperation.post(`user/addadharotp`, data, CUSTOMER_TYPE),
  updateSelfie: (data) =>
    appOperation.put(`user/updateselfie`, data, CUSTOMER_TYPE),
  adhaarOtpVerifiry: (data) =>
    appOperation.post(`user/verifyaadhar`, data, CUSTOMER_TYPE),
  emailOtpVerifiry: (data) =>
    appOperation.post(`verify_email`, data, CUSTOMER_TYPE),
  panVerifiyKyc: (data) =>
    appOperation.post(`user/pan_verify`, data, CUSTOMER_TYPE),
  dlVerifiyKyc: (data) =>
    appOperation.post(`user/dlverify`, data, CUSTOMER_TYPE),
  bankVerifiyKyc: (data) =>
    appOperation.post(`user/verifybankpenny`, data, CUSTOMER_TYPE),
  ifscVerifiyKyc: (data) =>
    appOperation.post(`user/checkifsc`, data, CUSTOMER_TYPE),
  deleteaccount: () =>
    appOperation.get(`user/bankdelete`, undefined, undefined, CUSTOMER_TYPE),
  deleteUpi: () =>
    appOperation.get(`user/upidelete`, undefined, undefined, CUSTOMER_TYPE),
  payout: (data) => appOperation.post(`payment/withdraw`, data, CUSTOMER_TYPE),
  get_init_game: (data) =>
    appOperation.post(`poker/init-game`, data, CUSTOMER_TYPE),
  get_remaining_cash_limit: () =>
    appOperation.get(
      `user/get-remaining-deposit-limit`,
      undefined,
      undefined,
      CUSTOMER_TYPE
    ),
  get_payment_token: (data) =>
    appOperation.post(`payment/auth/token`, data, CUSTOMER_TYPE),
  get_payment_init: (data) =>
    appOperation.post(`wallet/init-payment-order`, data, CUSTOMER_TYPE),
  get_payment_link: (data) =>
    appOperation.post(`payment/order`, data, CUSTOMER_TYPE),
  get_sandbox_order: (data) =>
    appOperation.post(`pg/orders/sessions`, data, CUSTOMER_TYPE),
  get_payment_status: (id) =>
    appOperation.get(
      `payment/order/${id}/status`,
      undefined,
      undefined,
      CUSTOMER_TYPE
    ),
  get_payment_sandbox_status: (id) =>
    appOperation.get(
      `wallet/get-payment-status/${id}`,
      undefined,
      undefined,
      CUSTOMER_TYPE
    ),
  update_username: (data) =>
    appOperation.post(`user/update-username`, data, CUSTOMER_TYPE),
  update_profile: (data) =>
    appOperation.put(`user/update-profile`, data, CUSTOMER_TYPE),
  track_user: (data) =>
    appOperation.post(`user/track-user`, data, CUSTOMER_TYPE),
  update_email: (data) =>
    appOperation.post(`user/email-verification-otp`, data, CUSTOMER_TYPE),
  reset_password: (data) =>
    appOperation.post(`user/reset-password`, data, CUSTOMER_TYPE),
  submit_upi: (data) =>
    appOperation.post(`payment/submit-upi`, data, CUSTOMER_TYPE),
  submit_bank: (data) =>
    appOperation.post(`payment/submit-bank`, data, CUSTOMER_TYPE),
  update_deposit_break: (data) =>
    appOperation.put(`user/deposit-break`, data, CUSTOMER_TYPE),
  update_time_limt: (data) =>
    appOperation.put(`user/screen-time-break`, data, CUSTOMER_TYPE),
  get_deposit_offers: (data) =>
    appOperation.post(`admin/bonus-code-type`, data, CUSTOMER_TYPE),
  get_deposit_type: (data) =>
    appOperation.get(
      `user/user-pg-settings`,
      undefined,
      undefined,
      CUSTOMER_TYPE
    ),
  get_payment_type: (data) =>
    appOperation.get(`payment/user-banks`, undefined, undefined, CUSTOMER_TYPE),
  user_withdrawal: (data) =>
    appOperation.post(`payment/create-payout`, data, CUSTOMER_TYPE),
  user_standard_withdrawal: (data) =>
    appOperation.post(`wallet/manual-withdrawal`, data, CUSTOMER_TYPE),
  revert_transaction: (data) =>
    appOperation.put(`wallet/revert-manual-withdrawal`, data, CUSTOMER_TYPE),
});