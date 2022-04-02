import { ActionTypes } from '../constants/action-types';
const initialState = {
  loans: [
    {
      id: 1,
      amount: 200,
      branchId: 1,
      userId: 5,
      user: {},
      status: 'Completed',
      description: 'I need money for weed',
      products: [],
      merchantId: 0,
      payments: [],
      approvals: [],
      createdOn: '',
      updatedOn: '',
      date: 'September 24, 2021',
      time: '10:28pm',
    },
    {
      id: 2,
      amount: 5800,
      branchId: 1,
      userId: 5,
      user: {},
      status: 'Pending',
      description: 'Some crap',
      products: [],
      merchantId: 0,
      payments: [],
      approvals: [],
      createdOn: '',
      updatedOn: '',
      date: 'June 11, 2021',
      time: '08:43am',
    },
    {
      id: 2,
      amount: 5800,
      branchId: 1,
      userId: 5,
      user: {},
      status: 'Completed',
      description: 'Some crap2',
      products: [],
      merchantId: 0,
      payments: [],
      approvals: [],
      createdOn: '',
      updatedOn: '',
      date: 'July 30, 2021',
      time: '08:43am',
    },
  ],
  temp: [],
};

export const loanReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_LOAN:
      return { ...state, loans: [...state.loans, action.payload] };
    case ActionTypes.EDIT_LOAN:
      const update = state.loans.map((loan) =>
        loan.id === action.payload.id ? action.payload : loan
      );
      return { ...state, loans: update };
    case ActionTypes.DELETE_LOAN:
      const filtered = state.loans.filter(
        (loan) => loan.id !== action.payload.id && loan
      );
      return { ...state, loans: filtered };
    case ActionTypes.CREATE_TEMP_LOANS:
      return { ...state, temp: [...state.loans, action.payload] };
    case ActionTypes.REFRESH_LOANS:
      return { ...state, loans: action.payload };
    default:
      return state;
  }
};
