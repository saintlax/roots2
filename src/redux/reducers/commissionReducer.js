import { ActionTypes } from '../constants/action-types';
const initialState = {};
export const commissionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMISSION:
      state = action.payload;
      return state;
    case ActionTypes.EDIT_COMMISSION:
      return { ...state, ...action.payload };
    case ActionTypes.DELETE_COMMISSION:
      return {};
    default:
      return state;
  }
};
