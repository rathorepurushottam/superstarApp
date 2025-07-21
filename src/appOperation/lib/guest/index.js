import {GUEST_TYPE} from '../../types';

export default appOperation => ({
  register: data => appOperation.post('auth/sendOtp', data, GUEST_TYPE),

  otp_verification: data => appOperation.post('auth/verifyOtp', data, GUEST_TYPE),
  loginUPasswor: data => appOperation.post('auth/loginViaPass', data, GUEST_TYPE),
  forgot_password: data => appOperation.post('auth/sendResetPasswordOtp', data, GUEST_TYPE),
  refer_code: data => appOperation.post('auth/verifyReferralCode', data, GUEST_TYPE),
  resetPassword: data => appOperation.post('auth/resetPassword', data, GUEST_TYPE),

  resend_otp: id =>
    appOperation.get(`signup/${id}`, undefined, undefined, GUEST_TYPE),
});