import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   selectedProductByVendor: null,
   editMode: false,
};

export const vendorProductSlice = createSlice({
   name: 'counter',
   initialState,
   reducers: {
      addSelectedProductByVendor: (state, action) => {
         state.selectedProductByVendor = action.payload;
      },
      setEditMode: (state, action) => {
         state.editMode = action.payload;
      }
   },
});

// Action creators are generated for each case reducer function
export const { addSelectedProductByVendor, setEditMode } = vendorProductSlice.actions;

export default vendorProductSlice.reducer;
