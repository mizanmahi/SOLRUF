import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createPortfolio: false,
  portfolioData: null,
  extra: null,
};

export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    setCreatePortfolio: (state, action) => {
      console.log(action);
      state.createPortfolio = action.payload;
    },
    setPortfolioData: (state, action) => {
      console.log(action);
      state.portfolioData = action.payload;
    },
    setExtra: (state, action) => {
      console.log(action);
      state.extra = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCreatePortfolio, setPortfolioData, setExtra } =
  portfolioSlice.actions;

export default portfolioSlice.reducer;
