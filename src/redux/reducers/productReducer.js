import { ActionTypes } from '../constants/action-types';
const initialState = {
  products: [
    {
      id: 1,
      name: 'Item 1',
      price: 200,
      qty: 1,
      totalOrders: '500',
      description: 'Bought chicken from mega chicken',
      status: 'Completed',
      images: [],
      branchId: 6,
      merchantId: 0,
      user: {},
      category: 'Shoes',
    },
    {
      id: 2,
      name: 'Item 2',
      price: 300,
      qty: 1,
      totalOrders: '500',
      description: 'Hello is a goood day',
      status: 'BAD',
      images: [],
      branchId: 7,
      merchantId: 0,
      user: {},
      category: 'Bags',
    },
    {
      id: 3,
      name: 'Item 3',
      price: 700,
      qty: 3,
      totalOrders: '500',
      description: 'God please help me. I am lost',
      status: 'Completed',
      images: [],
      branchId: 8,
      merchantId: 0,
      user: {},
      category: 'Clothes',
    },
    {
      id: 4,
      name: 'Item 4',
      price: 230,
      qty: 3,
      totalOrders: '500',
      description: 'Hello Bags of legend',
      status: 'Completed',
      images: [],
      branchId: 8,
      merchantId: 0,
      user: {},
      category: 'Bags',
    },
  ],
  temp: [],
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_PRODUCT:
      return { ...state, products: [...state.products, action.payload] };
    // return [...state, action.payload];
    case ActionTypes.EDIT_PRODUCT:
      const update = state.products.map((product) =>
        product.id === action.payload.id ? action.payload : product
      );
      return { ...state, products: update };
    //state = update;
    //return state;
    case ActionTypes.DELETE_PRODUCT:
      const filtered = state.products.filter(
        (product) => product.id !== action.payload.id && product
      );
      return { ...state, products: filtered };
    //state = filtered;
    //return state;
    case ActionTypes.CREATE_TEMP_PRODUCTS:
      return { ...state, temp: [...state.products, action.payload] };
    case ActionTypes.REFRESH_PRODUCTS:
      return { ...state, products: action.payload };
    default:
      return state;
  }
};
