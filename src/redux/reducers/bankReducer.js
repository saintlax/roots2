import { ActionTypes } from '../constants/action-types';
const initialState = {
  banks: [],
  temp: [],
};

export const banksReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_BANK:
      return { ...state, banks: [...state.banks, action.payload] };
    case ActionTypes.EDIT_BANK:
      const update = state.banks.map((bank) =>
        bank.id === action.payload.id ? action.payload : bank
      );
      return { ...state, banks: update };
    case ActionTypes.DELETE_BANK:
      const filtered = state.banks.filter(
        (bank) => bank.id !== action.payload.id && bank
      );
      return { ...state, banks: filtered };
    case ActionTypes.CREATE_TEMP_BANK:
      return { ...state, temp: [...state.banks, action.payload] };
    case ActionTypes.REFRESH_BANK:
      return { ...state, banks: action.payload };
    default:
      return state;
  }
};
