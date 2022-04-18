import { ActionTypes } from '../constants/action-types';
const initialState = {
  activities: [],
  temp: [],
};

export const recentActivitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_RECENT_ACTIVITY:
      return { ...state, activities: [...state.activities, action.payload] };
    case ActionTypes.EDIT_RECENT_ACTIVITY:
      const update = state.activities.map((activity) =>
        activity.id === action.payload.id ? action.payload : activity
      );
      return { ...state, activities: update };
    case ActionTypes.DELETE_RECENT_ACTIVITY:
      const filtered = state.products.filter(
        (activity) => activity.id !== action.payload.id && activity
      );
      return { ...state, activities: filtered };
    case ActionTypes.CREATE_TEMP_RECENT_ACTIVITY:
      return { ...state, temp: [...state.activities, action.payload] };
    case ActionTypes.REFRESH_RECENT_ACTIVITY:
      return { ...state, activities: action.payload };
    default:
      return state;
  }
};
