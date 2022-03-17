import { createSlice } from '@reduxjs/toolkit';

const createAttributeSlice = createSlice({
  name: 'createAttribute',
  initialState: {
    loading: false,
    error: false,
  },
  reducers: {
    createAttribureInProgress: (state, action) => {
      state.loading = true;
    },
    createAttributeSuccess: (state, action) => {
      state.error = false;
      state.loading = false;
    },
    createAttributetError: (state, action) => {
      state.error = true;
      state.loading = false;
    },
  },
});

export const {
  createAttribureInProgress,
  createAttributeSuccess,
  createAttributetError,
} = createAttributeSlice.actions;
export default createAttributeSlice.reducer;
