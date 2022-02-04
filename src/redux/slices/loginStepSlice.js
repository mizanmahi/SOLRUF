import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   loginMode: true,
   verificationMode: false,
   verificationMode2: false,
   registerMode: false,
};

export const loginStepSlice = createSlice({
   name: 'loginStep',
   initialState,
   reducers: {
      setLoginMode: (state, action) => {
         state.loginMode = action.payload;
      },
      setVerificationMode: (state, action) => {
         state.verificationMode = action.payload;
      },
      setVerificationMode2: (state, action) => {
         state.verificationMode2 = action.payload;
      },
      setRegisterMode: (state, action) => {
         state.registerMode = action.payload;
      },
   },
});

// Action creators are generated for each case reducer function
export const {
   setLoginMode,
   setVerificationMode,
   setVerificationMode2,
   setRegisterMode,
} = loginStepSlice.actions;

export default loginStepSlice.reducer;
