import { createSlice } from "@reduxjs/toolkit";

const initialState = {createPortfolio: false, };

export const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState,
    reducers: {
       setCreatePortfolio: (state, action) => {
          console.log(action);
          state.createPortfolio = action.payload;
       },
    },
 });
 
 // Action creators are generated for each case reducer function
 export const { setCreatePortfolio } = portfolioSlice.actions;
 
 export default portfolioSlice.reducer;
 