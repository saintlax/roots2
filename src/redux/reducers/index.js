import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { productReducer } from './productReducer';
import { branchReducer } from './branchReducer';
import { merchantReducer } from './merchantReducer';
import { userBranchReducer } from './userBranch';
import { productCategoryReducer } from './productCategoriesReducer';
const reducers = combineReducers({
  users: userReducer,
  products: productReducer,
  branches: branchReducer,
  merchant: merchantReducer,
  userBranch: userBranchReducer,
  productCategories: productCategoryReducer,
});

export default reducers;
