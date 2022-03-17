import { combineReducers } from 'redux';

import userReducer from './slices/userSlice';
import counterReducer from './slices/counterSlice';
import loginModalReducer from './slices/loginModalSlice';
import loginStepReducer from './slices/loginStepSlice';
import projectReducer from './slices/projectSlice';
import scrollStepsReducer from './slices/blogScrollStepsSlice';
import portfolioReducer from './slices/portfolio.slice';
import createProductSlice from './slices/admin/createProductSlice';
import createAttributeSlice from './slices/admin/createAttributeSlice';

export default combineReducers({
  user: userReducer,
  count: counterReducer,
  loginModal: loginModalReducer,
  loginStep: loginStepReducer,
  project: projectReducer,
  scrollSteps: scrollStepsReducer,
  portfolio: portfolioReducer,
  createProduct: createProductSlice,
  createAttribute: createAttributeSlice,
});
