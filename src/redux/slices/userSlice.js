import { createSlice } from '@reduxjs/toolkit';

const user = JSON.parse(sessionStorage.getItem('user'));

const initialState = {
   user,
};

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      setUser: (state, action) => {
         state.user = action.payload;
      },
      removeUser: (state, action) => {
         state.user = null;
         sessionStorage.removeItem('user');
      },
   },
});

// Action creators are generated for each case reducer function
export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
