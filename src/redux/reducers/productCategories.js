import { ActionTypes } from '../constants/action-types';
const initialState = {
  categories: [],
  temp: [],
};

export const adminProductCategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_ADMIN_PRODUCT_CATEGORY:
      return { ...state, categories: [...state.categories, action.payload] };
    case ActionTypes.EDIT_ADMIN_PRODUCT_CATEGORY:
      const update = state.categories.map((category) =>
        category.id === action.payload.id ? action.payload : category
      );
      return { ...state, categories: update };
    case ActionTypes.DELETE_ADMIN_PRODUCT_CATEGORY:
      const filtered = state.categories.filter(
        (category) => category.id !== action.payload.id && category
      );
      return { ...state, categories: filtered };
    case ActionTypes.CREATE_TEMP_ADMIN_PRODUCT_CATEGORY:
      return { ...state, temp: [...state.categories, action.payload] };
    case ActionTypes.REFRESH_ADMIN_PRODUCT_CATEGORY:
      return { ...state, categories: action.payload };
    default:
      return state;
  }
};
