import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   loading : false
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
       setProfileData: (state, action) => {
          state.profileData = action.payload;
       },
       loadingStart : (state,action) => {
         state.loading = true
       },
       loadingEnd : (state,action) => {
         state.loading = false
       },
       removeProfileData : (state,action) => {
          state.profileData = null
       }
    },
});

export const { setProfileData,loadingStart,loadingEnd,removeProfileData } = profileSlice.actions;
export default profileSlice.reducer;