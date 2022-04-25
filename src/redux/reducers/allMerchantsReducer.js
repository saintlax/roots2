import { ActionTypes } from '../constants/action-types';
const initialState = {
  merchants: [],
  temp: [],
};

export const allMerchantsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_ALL_MERCHANT:
      return { ...state, merchants: [...state.merchants, action.payload] };
    case ActionTypes.EDIT_ALL_MERCHANT:
      const update = state.merchants.map((merchant) =>
        merchant.id === action.payload.id ? action.payload : merchant
      );
      return { ...state, merchants: update };
    case ActionTypes.DELETE_ALL_MERCHANT:
      const filtered = state.merchants.filter(
        (merchant) => merchant.id !== action.payload.id && merchant
      );
      return { ...state, merchants: filtered };
    case ActionTypes.CREATE_TEMP_ALL_MERCHANT:
      return { ...state, temp: [...state.merchants, action.payload] };
    case ActionTypes.REFRESH_ALL_MERCHANT:
      return { ...state, merchants: action.payload };
    default:
      return state;
  }
};
