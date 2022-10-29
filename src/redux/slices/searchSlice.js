import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   searchTerm: '',
};

export const searchData = createSlice({
   name: 'search',
   initialState,
   reducers: {
      setSearchString: (state, action) => {
         state.searchTerm = action.payload;
      },
   },
});

export const { setSearchString } = searchData.actions;

export default searchData.reducer;
