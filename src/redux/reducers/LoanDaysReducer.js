import { ActionTypes } from '../constants/action-types';
const initialState = {};
export const loanDaysReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_LOAN_DAYS:
      state = action.payload;
      return state;
    case ActionTypes.EDIT_LOAN_DAYS:
      return { ...state, ...action.payload };
    case ActionTypes.DELETE_LOAN_DAYS:
      return {};
    default:
      return state;
  }
};
