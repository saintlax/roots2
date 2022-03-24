import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { productReducer } from './productReducer';
import { branchReducer } from './branchReducer';
const reducers = combineReducers({
  users: userReducer,
  products: productReducer,
  branches: branchReducer,
});

export default reducers;
