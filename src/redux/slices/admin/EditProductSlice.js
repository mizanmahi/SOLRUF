import { createSlice } from '@reduxjs/toolkit';

const editProductSlice = createSlice({
   name: 'editProduct',
   initialState: {
      productToBeEdited: null,
   },
   reducers: {
      addEditProduct: (state, action) => {
         state.productToBeEdited = action.payload;
      },
   },
});

export const { addEditProduct } = editProductSlice.actions;
export default editProductSlice.reducer;


// Language: javascript



