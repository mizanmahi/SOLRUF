import { createSlice } from '@reduxjs/toolkit';

const initialState = { isOpen: false };

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
   },
});

// Action creators are generated for each case reducer function
export const { openLoginModal, closeLoginModal } = loginModalSlice.actions;

export default loginModalSlice.reducer;
