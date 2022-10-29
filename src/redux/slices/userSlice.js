import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   user: null,
   role: '',
   enquiryDetails: null,
};

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      saveUser: (state, action) => {
         state.user = action.payload;
         state.role = action.payload.user.role;
         state.token = action.payload.token;
         localStorage.setItem('token', action.payload.token);
      },
      updateUser: (state, action) => {
         state.user = action.payload;
         state.role = action.payload.user.role;
         state.token = action.payload.token;
      },
      removeUser: (state, action) => {
         state.user = null;
         state.role = null;
         state.token = null;
         localStorage.removeItem('token');
      },
      setEnquiryDetails: (state, action) => {
         state.enquiryDetails = action.payload;
      },
      removeEnquiryDetails: (state, action) => {
         state.enquiryDetails = null;
      },
   },
});

// Action creators are generated for each case reducer function
export const {
   saveUser,
   updateUser,
   removeUser,
   setEnquiryDetails,
   removeEnquiryDetails,
} = userSlice.actions;

export default userSlice.reducer;
