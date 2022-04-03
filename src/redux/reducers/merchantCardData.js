import { ActionTypes } from '../constants/action-types';
const initialState = [
  // {
  //   title: 'Amount Generated',
  //   amount: ' N8,000,000',
  //   percentage: '2.3',
  //   className: 'card-one',
  // },
  // {
  //   title: 'Completed Orders',
  //   amount: 'N70,000',
  //   percentage: '5.0',
  //   className: 'card-two',
  // },
  // {
  //   title: 'Pending Orders',
  //   amount: 'N55,000',
  //   percentage: '5.0',
  //   className: 'card-one',
  // },
  // {
  //   title: 'Cancelled Orders',
  //   amount: 'N60,000',
  //   percentage: '5.0',
  //   className: 'card-two',
  // },
];
export const merchantCardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_MERCHANT_CARD:
      return [...state, action.payload];
    case ActionTypes.EDIT_MERCHANT_CARD:
      const update = state.map((card) =>
        card.id === action.payload.id ? action.payload : card
      );
      state = update;
      return state;
    case ActionTypes.DELETE_MERCHANT_CARD:
      const filtered = state.filter(
        (card) => card.title !== action.payload.title && card
      );
      state = filtered;
      return state;
    case ActionTypes.REFRESH_MERCHANT_CARD:
      state = action.payload;
      return state;
    default:
      return state;
  }
};
