import { ActionTypes } from '../constants/action-types';
const initialState = {
  orders: [
    {
      id: 1,
      branchId: 1,
      userId: 5,
      user: {
        firstName: 'Chike Obi',
        lastName: 'Austin',
        phoneNumber: '09087675765',
        id: 15,
      },
      status: 'Pending',
      product: {
        price: 4000,
        name: 'Item 1',
        description: 'Item 1 detail',
        branch: { name: 'Ogudu Branch', address: 'Akin street', id: 14 },
        id: 1,
      },
      productId: 1,
      merchantId: 0,
      createdOn: 'September 24, 2021',
      updatedOn: 'September 24, 2021',
      orderId: '#7777777',
      adminAction: [],
    },
    {
      id: 2,
      branchId: 1,
      userId: 5,
      user: {
        firstName: 'Austin',
        lastName: 'Theory',
        phoneNumber: '081654645435',
        id: 38,
      },
      status: 'Completed',
      product: {
        price: 1600,
        name: 'Item 2',
        description: 'Item 2 detail',
        branch: { name: 'Head Office', address: 'Umabi road', id: 11 },
        id: 2,
      },
      productId: 2,
      merchantId: 0,
      createdOn: 'January 02, 2020',
      updatedOn: 'September 24, 2021',
      orderId: '#8888888',
      adminAction: [],
    },
  ],
  temp: [],
};

export const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_ORDER:
      return { ...state, orders: [...state.orders, action.payload] };
    case ActionTypes.EDIT_ORDER:
      const update = state.orders.map((order) =>
        order.id === action.payload.id ? action.payload : order
      );
      return { ...state, orders: update };
    case ActionTypes.DELETE_ORDER:
      const filtered = state.orders.filter(
        (order) => order.id !== action.payload.id && order
      );
      return { ...state, orders: filtered };
    case ActionTypes.CREATE_TEMP_ORDERS:
      return { ...state, temp: [...state.orders, action.payload] };
    case ActionTypes.REFRESH_ORDERS:
      return { ...state, orders: action.payload };
    default:
      return state;
  }
};
