import {combineReducers} from "redux";
 import {userReducer} from "./userReducer";
import {productReducer} from "./productReducer"

const reducers = combineReducers({
    allUsers: userReducer,
    allproducts: productReducer
});

export default reducers;
