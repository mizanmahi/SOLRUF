import { combineReducers } from "redux";

import userReducer from "./slices/userSlice";
import counterReducer from "./slices/counterSlice";
import loginModalReducer from "./slices/loginModalSlice";
import loginStepReducer from "./slices/loginStepSlice";
import projectReducer from "./slices/projectSlice";
import scrollStepsReducer from "./slices/blogScrollStepsSlice";
import portfolioReducer from "./slices/portfolio.slice";
import createProductSlice from "./slices/admin/createProductSlice";
import createAttributeSlice from "./slices/admin/createAttributeSlice";
import editProductSlice from "./slices/admin/EditProductSlice";
import VendorProductListReducer from "./slices/Vendor/VendorProductListSlice";
import updateProductSlice from "./slices/admin/updateProductSlice";
import ProfileSlice from "./slices/ProfileSlice";
import utilsSlice from "./slices/utils/utils.slice";
import mobileVerifyStepSlice from "./mobileVerifyStepSlice";
import tableSlice from "./slices/tableSlice";
import productSlice from "./slices/productSlice";
import cartSlice from "./slices/cart/cartSlice";
import searchSlice from "./slices/searchSlice";
import viewProductSlice from "./slices/viewProductSlice";

export default combineReducers({
  user: userReducer,
  count: counterReducer,
  loginModal: loginModalReducer,
  loginStep: loginStepReducer,
  project: projectReducer,
  product: productSlice,
  scrollSteps: scrollStepsReducer,
  portfolio: portfolioReducer,
  createProduct: createProductSlice,
  updateProductSlice: updateProductSlice,
  createAttribute: createAttributeSlice,
  editProductAdmin: editProductSlice,
  profile: ProfileSlice,
  vendorProductList: VendorProductListReducer,
  utils: utilsSlice,
  mobileVerifyMode: mobileVerifyStepSlice,
  tableData: tableSlice,
  cart: cartSlice,
  search: searchSlice,
  viewProduct: viewProductSlice,
});
