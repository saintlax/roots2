import { ActionTypes } from '../constants/action-types';
const initialState = [
  {
    id: 6,
    name: 'Head Office',
    merchantId: 9,
    priviledges: [],
  },
];
export const merchantRolesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_ROLE:
      return [...state, action.payload];
    case ActionTypes.EDIT_ROLE:
      const update = state.map((role) =>
        role.id === action.payload.id ? action.payload : role
      );
      state = update;
      return state;
    case ActionTypes.DELETE_ROLE:
      const filtered = state.filter(
        (role) => role.id !== action.payload.id && role
      );
      state = filtered;
      return state;
    case ActionTypes.REFRESH_ROLE:
      state = action.payload;
      return state;
    default:
      return state;
  }
};
