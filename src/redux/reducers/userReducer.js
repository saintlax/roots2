import { ActionTypes } from '../constants/action-types';
const { REACT_APP_USER } = process.env;
const user = localStorage.getItem(REACT_APP_USER);
const initialState = user ? JSON.parse(user) : {};
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_USER:
      state = action.payload;
      return state;
    case ActionTypes.EDIT_USER:
      return { ...state, ...action.payload };
    case ActionTypes.DELETE_USER:
      return {};
    default:
      return state;
  }
};
