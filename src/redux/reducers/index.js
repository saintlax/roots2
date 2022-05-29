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
import { merchantSummaryReducer } from './merchantSummaryReducer';
import { adminSummaryReducer } from './adminSummaryReducer';
import { recentActivitiesReducer } from './recentActivitiesReducer';
import { adminLoansReducer } from './adminLoansReducer';
import { commissionReducer } from './commissionReducer';
import { loanDaysReducer } from './LoanDaysReducer';
import { allMerchantsReducer } from './allMerchantsReducer';
import { allUsersReducer } from './allUsersReducer';
import { withdrawalReducer } from './withdrawalReducer';
import { banksReducer } from './bankReducer';
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
  merchantSummary: merchantSummaryReducer,
  adminSummary: adminSummaryReducer,
  recentActivities: recentActivitiesReducer,
  adminLoans: adminLoansReducer,
  adminCommission: commissionReducer,
  loanDays: loanDaysReducer,
  allMerchants: allMerchantsReducer,
  allUsers: allUsersReducer,
  withdrawals: withdrawalReducer,
  banks: banksReducer,
});

export default reducers;
