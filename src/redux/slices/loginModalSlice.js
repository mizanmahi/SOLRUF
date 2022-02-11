import { createSlice } from '@reduxjs/toolkit';

const initialState = { isOpen: false, from: '' };

export const loginModalSlice = createSlice({
   name: 'loginModal',
   initialState,
   reducers: {
      openLoginModal: (state, action) => {
         state.isOpen = true;
      },
      closeLoginModal: (state, action) => {
         state.isOpen = false;
      },
      setLoginRedirect: (state, action) => {
         state.from = action.payload;
      },
      removeLoginRedirect: (state, action) => {
         state.from = '';
      }
   },
});

// Action creators are generated for each case reducer function
export const { openLoginModal, closeLoginModal, setLoginRedirect, removeLoginRedirect } = loginModalSlice.actions;

export default loginModalSlice.reducer;
