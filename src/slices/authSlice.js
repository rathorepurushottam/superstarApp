import {createSlice} from '@reduxjs/toolkit';

export const initialState = {
  isLoading: false,
  locationAccess: undefined,
};
export const authSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setLoading: (state, {payload}) => {
      state.isLoading = payload;
    },
    setLocationAcces: (state, {payload}) => {
      state.locationAccess = payload;
    },
  },
});

export const {setLoading, setLocationAcces} = authSlice.actions;

export default authSlice.reducer;