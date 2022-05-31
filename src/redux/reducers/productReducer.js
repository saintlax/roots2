import { ActionTypes } from '../constants/action-types';
const initialState = {
  products: [],
  temp: [],
  topSelling: [
    // {
    //   name: 'Ipad',
    //   email: 'anayo@gmail.com',
    //   address: 'Ajah, Lagos',
    //   phone: '+23470345678',
    //   date: '22-01-2022',
    //   amount: '20,000',
    //   totalOrders: '500',
    //   prodName: 'Ipad',
    //   description: 'Bought Headset from mega slot',
    //   category: 'Gadget',
    //   branches: '20',
    //   status: 'Completed',
    //   imageUrl: '',
    //   dateCreated: '22-01-2022',
    //   orderId: '#546382',
    // },
    // {
    //   name: 'Hp Omen',
    //   email: 'anayo@gmail.com',
    //   address: 'Lekki, Lagos',
    //   phone: '+23470345678',
    //   date: '22-01-2022',
    //   amount: '250,000',
    //   totalOrders: '1,500',
    //   prodName: 'Hp Omen',
    //   description: 'Loan repayment',
    //   category: 'Food',
    //   branches: '50',
    //   status: 'Pending',
    //   imageUrl: '',
    //   dateCreated: '22-01-2022',
    //   orderId: '#546382',
    // },
    // {
    //   name: 'Black shoe',
    //   email: 'anayo@gmail.com',
    //   address: 'Ajah, Lagos',
    //   phone: '+23470345678',
    //   date: '22-01-2022',
    //   amount: '200,000',
    //   totalOrders: '800',
    //   prodName: 'Ear piece',
    //   description: 'Loan repayment',
    //   category: 'Food',
    //   branches: '23',
    //   status: 'Pending',
    //   imageUrl: '',
    //   dateCreated: '22-01-2022',
    //   orderId: '#547382',
    // },
    // {
    //   name: 'Ear piece',
    //   email: 'anayo@gmail.com',
    //   address: 'Surulere, Lagos',
    //   phone: '+23470345678',
    //   date: '22-01-2022',
    //   amount: '20,000',
    //   totalOrders: '1,500',
    //   prodName: 'Ear piece',
    //   description: 'Loan repayment',
    //   category: 'Food',
    //   branches: '20',
    //   status: 'Pending',
    //   imageUrl: '',
    //   dateCreated: '22-01-2022',
    //   orderId: '#545362',
    // },
    // {
    //   name: 'Ear piece',
    //   email: 'anayo@gmail.com',
    //   address: 'Ikotun, Lagos',
    //   phone: '+23470345678',
    //   date: '22-01-2022',
    //   amount: '20,000',
    //   totalOrders: '1,500',
    //   prodName: 'Ear piece',
    //   description: 'Cloth purchase',
    //   category: 'Food',
    //   branches: '20',
    //   status: 'Completed',
    //   imageUrl: '',
    //   dateCreated: '22-01-2022',
    //   orderId: '#546382',
    // },
    // {
    //   name: 'Mouse',
    //   email: 'anayo@gmail.com',
    //   address: 'Ojota, Lagos',
    //   phone: '+23470345678',
    //   date: '22-01-2022',
    //   amount: '20,000',
    //   totalOrders: '1,500',
    //   prodName: 'Mouse',
    //   description: 'Loan repayment',
    //   category: 'Food',
    //   branches: '40',
    //   status: 'Pending',
    //   imageUrl: '',
    //   dateCreated: '22-01-2022',
    //   orderId: '#546482',
    // },
  ],
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
    case ActionTypes.REFRESH_TOPSELLING_PRODUCTS:
      return { ...state, topSelling: action.payload };
    default:
      return state;
  }
};
