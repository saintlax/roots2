import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { productReducer } from './productReducer';
import { branchReducer } from './branchReducer';
import { merchantReducer } from './merchantReducer';
const reducers = combineReducers({
  users: userReducer,
  products: productReducer,
  branches: branchReducer,
  merchant: merchantReducer,
});

export default reducers;
