import { createSlice } from '@reduxjs/toolkit';

const createProductSlice = createSlice({
  name: 'createProduct',
  initialState: {
    loading: false,
    error: false,
    upload: false,
  },
  reducers: {
    createProductInProgress: (state, action) => {
      state.loading = true;
    },
    createProductSuccess: (state, action) => {
      state.error = false;
      state.loading = false;
    },
    createProductError: (state, action) => {
      state.error = true;
      state.loading = false;
    },
  },
});

export const {
  createProductInProgress,
  createProductSuccess,
  createProductError,
} = createProductSlice.actions;
export default createProductSlice.reducer;
