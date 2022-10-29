import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   sendOtpMode: true,
   verificationMode: false,
   verificationMode2: false,
};

export const mobileVerifySlice = createSlice({
   name: 'mobileVerifyMode',
   initialState,
   reducers: {
      setOtpSendMode: (state, action) => {
         state.sendOtpMode = action.payload;
      },
      setVerificationMode: (state, action) => {
         state.verificationMode = action.payload;
      },
      setVerificationMode2: (state, action) => {
         state.verificationMode2 = action.payload;
      }
   },
   extraReducers: (builder) => {
      // this is used when we want to do something when a particular action is dispatched for other slice
   }
});

// Action creators are generated for each case reducer function
export const {
   setOtpSendMode,
   setVerificationMode,
   setVerificationMode2,
} = mobileVerifySlice.actions;

export default mobileVerifySlice.reducer;
