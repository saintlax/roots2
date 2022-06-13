import { ActionTypes } from '../constants/action-types';
const initialState = {};
export const adminChargeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_ADMIN_CHARGE:
      state = action.payload;
      return state;
    case ActionTypes.EDIT_ADMIN_CHARGE:
      return { ...state, ...action.payload };
    case ActionTypes.DELETE_ADMIN_CHARGE:
      return {};
    default:
      return state;
  }
};
