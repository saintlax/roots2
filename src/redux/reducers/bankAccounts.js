import { ActionTypes } from '../constants/action-types';
const initialState = {
  accounts: [],
  temp: [],
};

export const bankAccountsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_BANK_ACCOUNT:
      return { ...state, accounts: [...state.accounts, action.payload] };
    case ActionTypes.EDIT_BANK_ACCOUNT:
      const update = state.accounts.map((account) =>
        account.id === action.payload.id ? action.payload : account
      );
      return { ...state, accounts: update };

    case ActionTypes.DELETE_BANK_ACCOUNT:
      const filtered = state.accounts.filter(
        (account) => account.id !== action.payload.id && account
      );
      return { ...state, accounts: filtered };
    case ActionTypes.CREATE_TEMP_BANK_ACCOUNT:
      return { ...state, temp: [...state.accounts, action.payload] };
    case ActionTypes.REFRESH_BANK_ACCOUNT:
      return { ...state, accounts: action.payload };
    default:
      return state;
  }
};
