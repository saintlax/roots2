import { AiOutlineShoppingCart } from 'react-icons/ai';
import { MdOutlineDashboard } from 'react-icons/md';
import { GiHandBag } from 'react-icons/gi';
import { PROTECTED_PATHS } from '../../../app/merchantConstants';

const { DASHBOARD, ORDERS, BRANCHES, PRODUCTS } = PROTECTED_PATHS;

export const MERCHANT_NAV_ITEMS = [
  {
    title: 'Dashboard',
    to: DASHBOARD,
    icon: <MdOutlineDashboard />,
  },
  {
    title: 'Orders',
    to: ORDERS,
  },

  {
    title: 'Products',
    to: PRODUCTS,
    icon: <AiOutlineShoppingCart />,
  },

  {
    title: 'Branches',
    to: BRANCHES,
    icon: <GiHandBag />,
  },
];

export const STAFF_NAV_ITEMS = [
  {
    title: 'Dashboard',
    to: DASHBOARD,
    icon: <MdOutlineDashboard />,
  },
  {
    title: 'Orders',
    to: ORDERS,
  },

  {
    title: 'Products',
    to: PRODUCTS,
    icon: <AiOutlineShoppingCart />,
  },
];
