import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productCategoryData: null,
  productSubCategoryData: null,
};

export const viewProductSlice = createSlice({
  name: "viewProduct",
  initialState,
  reducers: {
    setProductData: (state, action) => {
      const product = action.payload;
      state.productCategoryData = product.productCategoryData;
      state.productSubCategoryData = product.productSubCategoryData;
    },
    clearProductData: (state) => {
      state.productCategoryData = null;
      state.productSubCategoryData = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProductData, clearProductData } = viewProductSlice.actions;
export default viewProductSlice.reducer;
