import { ActionTypes } from '../constants/action-types';
const initialState = {
  users: [],
  temp: [],
};

export const allUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_ALL_USERS:
      return { ...state, users: [...state.users, action.payload] };
    case ActionTypes.EDIT_ALL_USERS:
      const update = state.users.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
      return { ...state, users: update };
    case ActionTypes.DELETE_ALL_USERS:
      const filtered = state.users.filter(
        (user) => user.id !== action.payload.id && user
      );
      return { ...state, users: filtered };
    case ActionTypes.CREATE_TEMP_ALL_USERS:
      return { ...state, temp: [...state.users, action.payload] };
    case ActionTypes.REFRESH_ALL_USERS:
      return { ...state, users: action.payload };
    default:
      return state;
  }
};
