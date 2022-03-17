import { createSlice } from '@reduxjs/toolkit';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
   user,
   role: user ? user.role : '',
};

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      saveUser: (state, action) => {
         console.log(action.payload);
         state.user = action.payload;
         state.role = action.payload.user.role;
         state.token = action.payload.token;
         localStorage.setItem('token', action.payload.token);
      },
      removeUser: (state, action) => {
         state.user = null;
         state.role = null;
         state.token = null;
         localStorage.removeItem('token');
      },
   },
});

// Action creators are generated for each case reducer function
export const { saveUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
