import { createSlice } from "@reduxjs/toolkit";

const initialState = {count: 0};

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
       increase: (state, action) => {
          state.count++;
       },
       decrease: (state, action) => {
            state.count--;
       },
    },
 });

 // Action creators are generated for each case reducer function
 export const { increase, decrease } = counterSlice.actions;
 
 export default counterSlice.reducer;
 