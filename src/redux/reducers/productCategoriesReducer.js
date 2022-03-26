import { ActionTypes } from '../constants/action-types';
const initialState = [
  { id: 1, name: 'Shoes' },
  { id: 2, name: 'Bags' },
  { id: 3, name: 'Clothes' },
];
export const productCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_PRODUCT_CATEGORY:
      return [...state, action.payload];
    case ActionTypes.EDIT_PRODUCT_CATEGORY:
      const update = state.map((cat) =>
        cat.id === action.payload.id ? action.payload : cat
      );
      state = update;
      return state;
    case ActionTypes.DELETE_PRODUCT_CATEGORY:
      const filtered = state.filter(
        (cat) => cat.id !== action.payload.id && cat
      );
      state = filtered;
      return state;
    default:
      return state;
  }
};
