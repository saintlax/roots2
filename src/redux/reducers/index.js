import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { productReducer } from './productReducer';
import { branchReducer } from './branchReducer';
import { merchantReducer } from './merchantReducer';
import { userBranchReducer } from './userBranch';
import { productCategoryReducer } from './productCategoriesReducer';
import { sortCategoryReducer } from './sortCategoryReducer';
import { loanReducer } from './loanReducer';
import { ordersReducer } from './ordersReducers';
import { merchantRolesReducer } from './merchantRolesReducer';
import { merchantCardReducer } from './merchantCardData';
const reducers = combineReducers({
  user: userReducer,
  products: productReducer,
  branches: branchReducer,
  merchant: merchantReducer,
  userBranch: userBranchReducer,
  productCategories: productCategoryReducer,
  sortCategory: sortCategoryReducer,
  loans: loanReducer,
  orders: ordersReducer,
  roles: merchantRolesReducer,
  merchantCards: merchantCardReducer,
});

export default reducers;
