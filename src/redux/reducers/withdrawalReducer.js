import { ActionTypes } from '../constants/action-types';
const initialState = {
  withdrawals: [],
  temp: [],
};

export const withdrawalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_WITHDRAWAL:
      return { ...state, withdrawals: [...state.withdrawals, action.payload] };
    case ActionTypes.EDIT_WITHDRAWAL:
      const update = state.withdrawals.map((withdrawal) =>
        withdrawal.id === action.payload.id ? action.payload : withdrawal
      );
      return { ...state, withdrawals: update };
    case ActionTypes.DELETE_WITHDRAWAL:
      const filtered = state.withdrawals.filter(
        (withdrawal) => withdrawal.id !== action.payload.id && withdrawal
      );
      return { ...state, withdrawals: filtered };
    case ActionTypes.CREATE_TEMP_WITHDRAWAL:
      return { ...state, temp: [...state.withdrawals, action.payload] };
    case ActionTypes.REFRESH_WITHDRAWAL:
      return { ...state, withdrawals: action.payload };
    default:
      return state;
  }
};
