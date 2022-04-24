import { ActionTypes } from '../constants/action-types';
const initialState = {
  commissions: 0,
  totalUsers: 0,
  totalMerchants: 0,
  approvedLoans: 0,
  pendingLoans: 0,
  declinedLoans: 0,
  totalPayments: 0,
};
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
