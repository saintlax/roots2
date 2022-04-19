import { ActionTypes } from '../constants/action-types';
const initialState = {
  loans: [],
  temp: [],
};

export const adminLoansReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_ADMIN_LOAN:
      return { ...state, loans: [...state.loans, action.payload] };
    case ActionTypes.EDIT_ADMIN_LOAN:
      const update = state.loans.map((loan) =>
        loan.id === action.payload.id ? action.payload : loan
      );
      return { ...state, loans: update };
    case ActionTypes.DELETE_ADMIN_LOAN:
      const filtered = state.loans.filter(
        (loan) => loan.id !== action.payload.id && loan
      );
      return { ...state, loans: filtered };
    case ActionTypes.CREATE_TEMP_ADMIN_LOANS:
      return { ...state, temp: [...state.loans, action.payload] };
    case ActionTypes.REFRESH_ADMIN_LOANS:
      return { ...state, loans: action.payload };
    default:
      return state;
  }
};
