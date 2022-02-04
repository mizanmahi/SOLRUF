import { createSlice } from '@reduxjs/toolkit';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
   user,
};

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      saveUser: (state, action) => {
         state.user = action.payload;
         localStorage.setItem('user', JSON.stringify(action.payload));
      },
      removeUser: (state, action) => {
         state.user = null;
         localStorage.removeItem('user');
      },
   },
});

// Action creators are generated for each case reducer function
export const { saveUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
