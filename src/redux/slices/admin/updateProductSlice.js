import { createSlice } from '@reduxjs/toolkit';

const updateProductSlice = createSlice({
  name: 'updateProduct',
  initialState: {
    loading: false,
    error: false,
    upload: false,
  },
  reducers: {
    updateProductInProgress: (state, action) => {
      state.loading = true;
    },
    updateProductSuccess: (state, action) => {
      state.error = false;
      state.loading = false;
    },
    updateProductError: (state, action) => {
      state.error = true;
      state.loading = false;
    },
  },
});

export const {
    updateProductInProgress,
    updateProductSuccess,
    updateProductError,
} = updateProductSlice.actions;
export default updateProductSlice.reducer;
