import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   productData: null,
   productsLoading: false,
   productToBeEdited: null,
};

export const productSlice = createSlice({
   name: 'product',
   initialState,
   reducers: {
      setProductData: (state, action) => {
         state.productData = action.payload;
      },
      setProductsLoading: (state, action) => {
         state.productsLoading = action.payload;
      },
      setProductToBeEdited: (state, action) => {
         state.productToBeEdited = action.payload;
      },
   },
});

// Action creators are generated for each case reducer function
export const { setProductData, setProductsLoading, setProductToBeEdited } =
   productSlice.actions;

export default productSlice.reducer;
