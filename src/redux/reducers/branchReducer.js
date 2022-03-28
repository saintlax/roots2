import { ActionTypes } from '../constants/action-types';
const initialState = [
  {
    id: 6,
    name: 'Head Office',
    email: 'anayo@gmail.com',
    address: 'Ajah, Lagos',
    phone: '+23470345678',
    date: '22-01-2022',
    amount: '20,000',
    totalOrders: '500',
    description: 'Bought chicken from mega chicken',
    branches: '20',
    status: 'Completed',
    imageUrl: '',
    dateCreated: '22-01-2022',
    orderId: '#546382',
    users: [
      {
        lastName: 'Chika Anthony',
        email: 'chika@yahoo.com',
        position: 'Agent',
      },
      { lastName: 'Emeka Okoli', email: 'emeka@yahoo.com', position: 'Admin' },
    ],
  },
  {
    id: 7,
    name: 'Oregun Branch',
    email: 'anayo@gmail.com',
    address: 'Ajah, Lagos',
    phone: '+23470345678',
    date: '22-01-2022',
    amount: '20,000',
    totalOrders: '500',
    description: 'Bought chicken from mega chicken',
    branches: '20',
    status: 'Completed',
    imageUrl: '',
    dateCreated: '22-01-2022',
    orderId: '#546382',
    users: [
      {
        lastName: 'Uchenna Enemuo',
        email: 'uche@yahoo.com',
        position: 'Agent',
      },
      { lastName: 'Eberechukwu', email: 'ebere@yahoo.com', position: 'Admin' },
    ],
  },
  {
    id: 6,
    name: 'Ikeja Office',
    email: 'anayo@gmail.com',
    address: 'Ajah, Lagos',
    phone: '+23470345678',
    date: '22-01-2022',
    amount: '20,000',
    totalOrders: '500',
    description: 'Bought chicken from mega chicken',
    branches: '20',
    status: 'Completed',
    imageUrl: '',
    dateCreated: '22-01-2022',
    orderId: '#546382',
    users: [
      {
        lastName: 'Chidera Alakwe',
        email: 'dera@yahoo.com',
        position: 'Agent',
      },
      { lastName: 'Ibukun Oluwa', email: 'ibk@yahoo.com', position: 'Admin' },
    ],
  },
  {
    id: 7,
    name: 'Victoria Island',
    email: 'anayo@gmail.com',
    address: 'Ajah, Lagos',
    phone: '+23470345678',
    date: '22-01-2022',
    amount: '20,000',
    totalOrders: '500',
    description: 'Bought chicken from mega chicken',
    branches: '20',
    status: 'Completed',
    imageUrl: '',
    dateCreated: '22-01-2022',
    orderId: '#546382',
    users: [
      { lastName: 'Jane Doe', email: 'doe@yahoo.com', position: 'Agent' },
      {
        lastName: 'Ifeoma Oragwuncha',
        email: 'ifeoma@yahoo.com',
        position: 'Admin',
      },
    ],
  },
];
export const branchReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_BRANCH:
      return [...state, action.payload];
    case ActionTypes.EDIT_BRANCH:
      const update = state.map((branch) =>
        branch.id === action.payload.id ? action.payload : branch
      );
      state = update;
      return state;
    case ActionTypes.DELETE_BRANCH:
      const filtered = state.filter(
        (branch) => branch.id !== action.payload.id && branch
      );
      state = filtered;
      return state;
    default:
      return state;
  }
};
