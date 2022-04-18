import { ActionTypes } from '../constants/action-types';
const { REACT_APP_MERCHANT_SUMMARY } = process.env;
const summary = localStorage.getItem(REACT_APP_MERCHANT_SUMMARY);
const initialState = summary ? JSON.parse(summary) : {};
export const merchantSummaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_MERCHANT_SUMMARY:
      state = action.payload;
      return state;
    case ActionTypes.EDIT_MERCHANT_SUMMARY:
      return { ...state, ...action.payload };
    case ActionTypes.DELETE_MERCHANT_SUMMARY:
      return {};
    default:
      return state;
  }
};
