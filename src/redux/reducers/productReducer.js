import { ActionTypes } from '../constants/action-types';
const initialState = [
  {
    id: 1,
    name: 'Item 1',
    price: 200,
    qty: 1,
    totalOrders: '500',
    description: 'Bought chicken from mega chicken',
    status: 'Completed',
    images: [],
    branchId: 0,
    merchantId: 0,
    user: {},
  },
];
export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_PRODUCT:
      return [...state, action.payload];
    case ActionTypes.EDIT_PRODUCT:
      const update = state.map((product) =>
        product.id === action.payload.id ? action.payload : product
      );
      state = update;
      return state;
    case ActionTypes.DELETE_PRODUCT:
      const filtered = state.filter(
        (product) => product.id !== action.payload.id && product
      );
      state = filtered;
      return state;
    default:
      return state;
  }
};
