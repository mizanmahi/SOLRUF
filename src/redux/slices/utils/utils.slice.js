import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   statesOfIndia: [],
   selectedDashboardDropDownMenuMobile: 0,
   networkSnackbarOpen: false,
   networkSnackbarOpen2: false,
   snackbarInitiated: false,
};

export const utilsSlice = createSlice({
   name: 'utils',
   initialState,
   reducers: {
      saveStates: (state, action) => {
         state.statesOfIndia = action.payload;
      },
      setSelectedDashboardDropDownMenuMobile: (state, action) => {
         state.selectedDashboardDropDownMenuMobile = action.payload;
      },
      setNetworkSnackbarOpen: (state, action) => {
         state.networkSnackbarOpen = action.payload;
      },
      setNetworkSnackbar2Open: (state, action) => {
         state.networkSnackbarOpen2 = action.payload;
      },
      setSnackbarInitiated: (state, action) => {
         state.snackbarInitiated = action.payload;
      },
   },
});

// Action creators are generated for each case reducer function
export const {
   saveStates,
   setSelectedDashboardDropDownMenuMobile,
   setNetworkSnackbarOpen,
   setNetworkSnackbar2Open,
   setSnackbarInitiated
} = utilsSlice.actions;

export default utilsSlice.reducer;
