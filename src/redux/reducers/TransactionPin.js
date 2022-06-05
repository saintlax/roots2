import { ActionTypes } from '../constants/action-types';
const initialState = {};
export const transactionPinReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_PIN:
      state = action.payload;
      return state;
    case ActionTypes.EDIT_PIN:
      return { ...state, ...action.payload };
    case ActionTypes.DELETE_PIN:
      return {};
    default:
      return state;
  }
};
