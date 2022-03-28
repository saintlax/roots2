import { ActionTypes } from '../constants/action-types';

const initialState = {};
export const sortCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_SORT_CATEGORY:
      state = action.payload;
      return state;
    case ActionTypes.EDIT_SORT_CATEGORY:
      return { ...state, ...action.payload };
    case ActionTypes.DELETE_SORT_CATEGORY:
      return {};
    default:
      return state;
  }
};
