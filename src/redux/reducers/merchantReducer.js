import { ActionTypes } from '../constants/action-types';
const { REACT_APP_MERCHANT } = process.env;
const merchant = localStorage.getItem(REACT_APP_MERCHANT);
const initialState = merchant ? JSON.parse(merchant) : {};
export const merchantReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_MERCHANT:
      state = action.payload;
      return state;
    case ActionTypes.EDIT_MERCHANT:
      return { ...state, ...action.payload };
    case ActionTypes.DELETE_MERCHANT:
      return {};
    default:
      return state;
  }
};
