import {combineReducers} from 'redux';
import authSlice from '../slices/authSlice';
import profileSlice from '../slices/profileSlice';
import homeSlice from '../slices/homeSlice';

const appReducer = combineReducers({
  auth: authSlice,
  profile: profileSlice,
  home: homeSlice,
});


export default appReducer;