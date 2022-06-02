import { ActionTypes } from '../constants/action-types';
const { REACT_APP_USER_BRANCH } = process.env;
const branch = localStorage.getItem(REACT_APP_USER_BRANCH);
const initialState = branch ? JSON.parse(branch) : {};
export const userBranchReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_USER_BRANCH:
      state = action.payload;
      return state;
    case ActionTypes.EDIT_USER_BRANCH:
      return { ...state, ...action.payload };
    case ActionTypes.DELETE_USER_BRANCH:
      return {};
    default:
      return state;
  }
};
