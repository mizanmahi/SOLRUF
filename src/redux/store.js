import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import counterReducer from './slices/counterSlice';
import loginModalReducer from './slices/loginModalSlice';
import loginStepReducer from './slices/loginStepSlice';
import projectReducer from './slices/projectSlice';

export const store = configureStore({
   reducer: {
      // reducers will be here
      user: userReducer,
      count: counterReducer,
      loginModal: loginModalReducer,
      loginStep: loginStepReducer,
      project: projectReducer,
   },
});
