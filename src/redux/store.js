import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
      // reducers will be here
      user: userReducer,
  },
})