import { ActionTypes } from '../constants/action-types';
const initialState = {};
export const adminSummaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_ADMIN_SUMMARY:
      state = action.payload;
      return state;
    case ActionTypes.EDIT_ADMIN_SUMMARY:
      return { ...state, ...action.payload };
    case ActionTypes.DELETE_ADMIN_SUMMARY:
      return {};
    default:
      return state;
  }
};
